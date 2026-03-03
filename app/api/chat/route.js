import OpenAI from "openai";
import connectDB from "@/lib/connectDB";
import ChatAI from "@/model/chatAI";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");


    if (lastUserMessage) {
      await connectDB();

      const userQuery = lastUserMessage.content.toLowerCase().trim();

      const exactMatch = await ChatAI.findOne({ query: userQuery });

      if (exactMatch) {
        const cacheAge =
          Date.now() - new Date(exactMatch.createdAt).getTime();

        if (cacheAge < CACHE_DURATION) {
          return Response.json({
            message: exactMatch.response,
            cached: true,
            method: "exact-match",
          });
        }
      }

      const textResults = await ChatAI.find(
        { $text: { $search: userQuery } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(1);

      if (textResults.length > 0) {
        const bestTextMatch = textResults[0];

        const cacheAge =
          Date.now() - new Date(bestTextMatch.createdAt).getTime();

        if (cacheAge < CACHE_DURATION) {
          return Response.json({
            message: bestTextMatch.response,
            cached: true,
            method: "text-search",
          });
        }
      }

      const allData = await ChatAI.find({});
      const userWords = userQuery.split(/\s+/);

      let bestMatch = null;
      let highestScore = 0;

      for (const item of allData) {
        const dbWords = item.query.toLowerCase().split(/\s+/);

        const matchCount = userWords.filter((word) =>
          dbWords.includes(word)
        ).length;

        const score = matchCount / userWords.length;

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch && highestScore >= 0.5) {
        return Response.json({
          message: bestMatch.response,
          cached: true,
          similarity: highestScore,
          method: "word-match",
        });
      }
    }
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Pankaj Kushwaha's portfolio. 
Pankaj Kushwaha is a MERN Stack Developer with 2.5+ years of experience.
He specializes in React, Next.js, Node.js, MongoDB, and full-stack web development.
Provide helpful information about his skills, experience, projects, and background.
Be friendly, professional, and concise in your responses.`
    };


    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [systemMessage, ...messages],
    });

    const aiResponse = response.output_text || response.output[0]?.content?.[0]?.text || "No response";

    // Save the query and response to database for future use
    if (lastUserMessage) {
      try {
        await ChatAI.create({
          query: lastUserMessage.content.toLowerCase().trim(),
          response: aiResponse
        });
      } catch (dbError) {
        // Log error but don't fail the request if saving fails
        console.error("Error saving to database:", dbError);
      }
    }

    return Response.json({
      message: aiResponse,
      cached: false
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { error: error.message || "Failed to get response from AI" },
      { status: 500 }
    );
  }
}

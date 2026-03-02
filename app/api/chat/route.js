import OpenAI from "openai";
import connectDB from "@/lib/connectDB";
import ChatAI from "@/model/chatAI";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache duration in hours (24 hours)
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

    // Get the latest user message for caching
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    
    if (lastUserMessage) {
      // Connect to database
      await connectDB();
      
      // Search for existing response in database (case-insensitive)
      const cachedResponse = await ChatAI.findOne({
        query: lastUserMessage.content.toLowerCase().trim()
      });

      // Check if cached response exists and is not expired
      if (cachedResponse) {
        const cacheAge = Date.now() - cachedResponse.createdAt.getTime();
        
        if (cacheAge < CACHE_DURATION) {
          // Return cached response
          return Response.json({
            message: cachedResponse.response,
            cached: true
          });
        }
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

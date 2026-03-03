import connectDB from "@/lib/connectDB";
import ChatAI from "@/model/chatAI";

export async function GET(request) {
  try {
    await connectDB();
    const chatData = await ChatAI.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, data: chatData });
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return Response.json(
      { success: false, error: "Failed to fetch chat data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { query, response } = body;

    if (!query || !response) {
      return Response.json(
        { success: false, error: "Query and response are required" },
        { status: 400 }
      );
    }

    const newChat = await ChatAI.create({
      query: query.toLowerCase().trim(),
      response,
    });

    return Response.json({ success: true, data: newChat });
  } catch (error) {
    console.error("Error creating chat:", error);
    return Response.json(
      { success: false, error: "Failed to create chat entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, query, response } = body;

    if (!id) {
      return Response.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (query) updateData.query = query.toLowerCase().trim();
    if (response) updateData.response = response;

    const updatedChat = await ChatAI.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedChat) {
      return Response.json(
        { success: false, error: "Chat entry not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedChat });
  } catch (error) {
    console.error("Error updating chat:", error);
    return Response.json(
      { success: false, error: "Failed to update chat entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const deletedChat = await ChatAI.findByIdAndDelete(id);

    if (!deletedChat) {
      return Response.json(
        { success: false, error: "Chat entry not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Chat entry deleted" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return Response.json(
      { success: false, error: "Failed to delete chat entry" },
      { status: 500 }
    );
  }
}

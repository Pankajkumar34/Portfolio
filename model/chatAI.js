import mongoose from "mongoose";

const chatAISchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    index: true, // Index for fast search
    trim: true,
    lowercase: true, // Store in lowercase for case-insensitive matching
  },
  response: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create a text index for better search performance
chatAISchema.index({ query: 'text' });

export default mongoose.models.ChatAI || mongoose.model("ChatAI", chatAISchema);

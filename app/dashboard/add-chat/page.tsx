"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddChat() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Form state
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/chatai');
      if (res.ok) {
        const data = await res.json();
        setChats(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || !response.trim()) {
      setMessage('Please fill in both query and response');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const url = editingId ? '/api/chatai' : '/api/chatai';
      const method = editingId ? 'PUT' : 'POST';
      
      const body = editingId 
        ? { id: editingId, query: query.trim(), response: response.trim() }
        : { query: query.trim(), response: response.trim() };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editingId ? 'Chat updated successfully!' : 'Chat added successfully!');
        setQuery('');
        setResponse('');
        setEditingId(null);
        fetchChats();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.error || 'Failed to save chat');
      }
    } catch (error) {
      setMessage('Error saving chat');
      console.error('Error saving chat:', error);
    }
    
    setSaving(false);
  };

  const handleEdit = (chat: any) => {
    setQuery(chat.query);
    setResponse(chat.response);
    setEditingId(chat._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chat entry?')) {
      return;
    }

    try {
      const res = await fetch(`/api/chatai?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Chat deleted successfully!');
        fetchChats();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete chat');
      }
    } catch (error) {
      setMessage('Error deleting chat');
      console.error('Error deleting chat:', error);
    }
  };

  const handleCancel = () => {
    setQuery('');
    setResponse('');
    setEditingId(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-300 hover:text-white transition"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Chat AI Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes('success') || message.includes('successfully')
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Chat Entry' : 'Add New Chat Entry'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Query (User Question)</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the user query (e.g., what is your experience?)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Response (AI Answer)</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the AI response"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add Chat'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Chats */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            Existing Chat Entries ({chats.length})
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No chat entries found. Add your first chat above!
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {chats.map((chat) => (
                  <motion.div
                    key={chat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Query:</p>
                        <p className="font-medium text-indigo-300">{chat.query}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(chat)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(chat._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Response:</p>
                      <p className="text-gray-200">{chat.response}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(chat.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

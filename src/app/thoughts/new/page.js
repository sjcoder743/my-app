// src/app/thoughts/new/page.js
"use client";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Import useAuth to ensure user is authenticated

const NewThoughtPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth(); // Get auth state from Clerk

  const handleSaveThought = async (e) => {
    e.preventDefault();

    if (!isLoaded || !isSignedIn) {
      alert("You must be signed in to save a thought.");
      router.push("/sign-in");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and content for your thought.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Successfully saved
        setTitle("");
        setContent("");
        router.push("/thoughts"); // Navigate back to the thoughts list
      } else {
        alert(`Failed to save thought: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">Please sign in to write a thought.</p>
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Write Your Thought
        </h1>

        <form
          onSubmit={handleSaveThought}
          className="bg-white p-8 rounded-lg shadow-xl"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-lg"
              placeholder="A captivating title for your thought..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="content"
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-lg resize-y"
              placeholder="What's on your mind? Capture every detail here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-400 transition duration-300 ease-in-out"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
              disabled={saving} // Disable button while saving
            >
              {saving ? "Saving..." : "Save Thought"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThoughtPage;

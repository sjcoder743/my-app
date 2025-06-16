// src/app/thoughts/edit/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast"; // For better notifications
import Link from "next/link"; // For the back button

const EditThoughtPage = () => {
  // Use 'displayedTitle' for the input, but the actual 'content' state holds all text
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const res = await fetch(`/api/thoughts/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch thought data.");
        }
        const data = await res.json();

        // Assuming 'content' holds the full text, with the first line as title
        const lines = data.content.split("\n");
        setDisplayedTitle(lines[0] || ""); // Set first line as the displayed title
        setContent(data.content); // Set full content for the textarea
      } catch (error) {
        console.error("Error fetching thought data:", error);
        toast.error("Failed to load thought data.");
        router.push("/thoughts"); // Redirect back if data fails to load
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Ensure id is available before fetching
      fetchThought();
    }
  }, [id, router]); // Add router to dependency array as per Next.js best practices

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Combine displayedTitle and content back into the full thought content
    const fullContentToSend = displayedTitle.trim()
      ? `${displayedTitle}\n${content.split("\n").slice(1).join("\n")}`
      : content;
    // Or, more simply, if the first line is the title, prepend it to the rest of the content
    const combinedContent = `${displayedTitle}\n${
      content.split("\n").slice(1).join("\n") || ""
    }`.trim();

    try {
      const res = await fetch(`/api/thoughts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // We are sending the combined content, not separate title and content fields
        body: JSON.stringify({ content: combinedContent }),
      });

      if (res.ok) {
        toast.success("✨ Thought updated successfully!");
        router.push(`/thoughts/${id}`); // Redirect to the detail page
      } else {
        const errorData = await res.json();
        toast.error(
          `Failed to update thought: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating thought:", error);
      toast.error("An unexpected error occurred during update.");
    } finally {
      setSaving(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-purple-100 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-lg text-gray-700">Loading your thought...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 lg:p-12 border border-gray-100">
        <Link
          href={`/thoughts/${id}`} // Go back to the specific thought detail page
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium mb-6 sm:mb-8 text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 001.414 1.414L5.414 9H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Thought
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
          Edit Your Thought
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="displayedTitle"
              className="block text-gray-800 font-semibold mb-2 text-lg"
            >
              Title
            </label>
            <input
              type="text"
              id="displayedTitle"
              value={displayedTitle}
              onChange={(e) => setDisplayedTitle(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg"
              placeholder="Give your thought a catchy title"
              required
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label
              htmlFor="content"
              className="block text-gray-800 font-semibold mb-2 text-lg"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="12" // Increased rows for more space
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg resize-y"
              placeholder="Expand on your thoughts here..."
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()} // Go back to previous page
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-sm transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
              disabled={saving}
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Thought"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditThoughtPage;

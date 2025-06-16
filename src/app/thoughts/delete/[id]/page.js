// src/app/thoughts/delete/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const DeleteThoughtPage = () => {
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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
        setThought(data);
      } catch (error) {
        console.error("Error fetching thought for deletion:", error);
        toast.error("Could not load thought for deletion. It might not exist.");
        router.push("/thoughts"); // Redirect to list if thought cannot be loaded
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchThought();
    }
  }, [id, router]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/thoughts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("🗑️ Thought successfully deleted!");
        router.push("/thoughts"); // Redirect to the main thoughts list after deletion
      } else {
        const errorData = await res.json();
        toast.error(
          `Failed to delete thought: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("An unexpected error occurred during deletion.");
    } finally {
      setDeleting(false);
    }
  };

  // Determine title and content for display
  const displayTitle = thought
    ? thought.content.split("\n")[0] || "Untitled Thought"
    : "Loading...";
  const displayContent = thought
    ? thought.content.split("\n").slice(1).join("\n") ||
      "No additional content preview available."
    : "Loading content...";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-red-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        <p className="mt-4 text-lg text-gray-700">
          Loading thought details for deletion...
        </p>
      </div>
    );
  }

  // If thought is null after loading (e.g., API returned 404 and we redirected),
  // this check prevents rendering the form. Though the router.push handles most of it.
  if (!thought) {
    return null; // Or a specific "Thought Not Found" message if you prefer
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 lg:p-12 border border-gray-100">
        <Link
          href={`/thoughts/${id}`} // Link back to the thought detail page
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

        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-6 leading-tight">
          Confirm Deletion
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 mb-4">
          Are you sure you want to delete this thought?
        </p>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          This action cannot be undone.
        </p>

        {/* Display Thought Details for Confirmation */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {displayTitle}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line max-h-48 overflow-auto">
            {displayContent}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()} // Go back to previous page (likely the detail page)
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-sm transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteConfirm}
            className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            disabled={deleting}
          >
            {deleting ? (
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
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteThoughtPage;

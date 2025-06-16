// src/app/thoughts/[id]/ClientActionButtons.js
"use client"; // Marks this file as a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation"; // For client-side navigation
import toast from "react-hot-toast"; // For displaying notifications

export default function ClientActionButtons({ thoughtId }) {
  const router = useRouter(); // Initialize useRouter hook

  // Handle thought deletion
  const handleDelete = async () => {
    // Show a confirmation dialog before proceeding with deletion
    if (!window.confirm("Are you sure you want to delete this thought? This action cannot be undone.")) {
      return; // If user cancels, stop the function
    }

    try {
      // Send a DELETE request to your API route
      const res = await fetch(`/api/thoughts/${thoughtId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // If deletion is successful, show a success toast and redirect
        toast.success("🗑️ Thought deleted successfully!");
        router.push("/thoughts"); // Redirect to the thoughts list page
      } else {
        // If API returns an error, parse the message and show an error toast
        const data = await res.json();
        toast.error("❌ Failed to delete thought: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      // Catch any network or unexpected errors
      console.error("Error deleting thought:", error);
      toast.error("An unexpected error occurred during deletion.");
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Action buttons container with responsive stacking and spacing */}

      {/* Edit Button */}
      <Link
        href={`/thoughts/edit/${thoughtId}`}
        className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
      >
        {/* Enhanced button styling with better padding, shadow, and hover effects */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.414 2.828L11.172 6.5l-2.828 2.828-1.414 1.414L10.586 16H16v-5.414l-4.293-4.293z" />
        </svg>
        Edit
      </Link>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75"
      >
        {/* Similar enhanced styling for the delete button */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 10a1 1 0 100-2H7a1 1 0 100 2h6z" clipRule="evenodd" />
        </svg>
        Delete
      </button>
    </div>
  );
}
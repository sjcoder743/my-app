"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");

  const fetchThoughts = async () => {
    try {
      const res = await fetch("/api/thoughts");
      const data = await res.json();
      if (data.success) setThoughts(data.data);
    } catch (err) {
      console.error("Error fetching thoughts:", err);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newThought.trim()) {
      toast.info("Please enter something to search for.");
      return;
    }
    toast.info("Search functionality not implemented in this example.");
    // In a real application, you'd trigger a search API call here
    // e.g., fetchThoughts(`?search=${newThought}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this thought?")) return;

    try {
      const res = await fetch(`/api/thoughts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("🗑️ Thought deleted");
        fetchThoughts();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {" "}
      {/* Adjusted horizontal padding for small screens */}
      {/* Search Bar */}
      <div className="mb-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          {" "}
          {/* Changed to flex-col on mobile, flex-row on sm+ */}
          <input
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            placeholder="Search for thoughts..."
            className="flex-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Added w-full
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition w-full sm:w-auto mt-2 sm:mt-0" // Added w-full on mobile, sm:w-auto on sm+, and margin top
          >
            Search
          </button>
        </form>
      </div>
      {/* Thoughts Grid */}
      {thoughts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {thoughts.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              {/* Title Section */}
              <h3 className="text-gray-900 font-bold text-xl mb-3 line-clamp-2">
                {t.content.split("\n")[0] || "Untitled Thought"}
              </h3>

              {/* Content Preview Section */}
              <p className="text-gray-700 text-base mb-4 line-clamp-4 leading-relaxed">
                {t.content.split("\n").slice(1).join("\n") ||
                  "No additional content preview available."}
              </p>

              {/* Actions Section */}
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
                <Link
                  href={`/thoughts/${t._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View
                </Link>
                <div className="flex gap-3">
                  <Link
                    href={`/thoughts/edit/${t._id}`}
                    className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-16">
          No thoughts found. Start by adding a new one!
        </div>
      )}
      {/* New Button - At the bottom-right of the content area */}
      <div className="flex justify-end mt-8">
        <Link
          href="/thoughts/new"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          + New Thought
        </Link>
      </div>
    </div>
  );
}

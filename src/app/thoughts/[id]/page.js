// src/app/thoughts/[id]/page.js

import dbConnect from "@/utils/database";
import Thought from "@/models/Thought";
import { notFound } from "next/navigation";
import ClientActionButtons from "./ClientActionButtons"; // Import the client component
import Link from "next/link"; // Link for the back button

// This function will run at build time (SSG) to generate static paths
export async function generateStaticParams() {
  await dbConnect();
  // Fetch only the _id for performance when generating static paths
  const thoughts = await Thought.find({}, "_id").lean();
  return thoughts.map((t) => ({ id: t._id.toString() }));
}

// Metadata generation for SEO and browser tab title
export async function generateMetadata({ params: { id } }) {
  return { title: `Thought ${id}` };
}

// This is an Async Server Component responsible for data fetching and static UI
export default async function ThoughtDetailPage({ params: { id } }) {
  await dbConnect();
  const thought = await Thought.findById(id).lean(); // Fetch the thought data

  if (!thought) {
    // If thought is not found, render Next.js's 404 page
    return notFound();
  }

  // Extract the first line as a title and the rest as content, for consistent display
  const lines = thought.content.split("\n");
  const title = lines[0] || "Untitled Thought"; // Use first line as title, or a default
  const mainContent = lines.slice(1).join("\n") || thought.content; // Rest of content or full content if only one line

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main container with gradient background and responsive padding */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 lg:p-12 border border-gray-100">
        {/* Thought card with enhanced shadow and rounded corners */}

        <Link
          href="/thoughts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium mb-6 sm:mb-8 text-base"
        >
          {/* Back button with improved styling and icon-like arrow */}
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
          Back to Thoughts
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {/* Enhanced title styling with larger text on larger screens */}
          {title}
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed whitespace-pre-line mb-8">
          {/* Content area with improved line height and font size for readability */}
          {mainContent}
        </p>

        {/* Render the ClientActionButtons component, passing the thought ID */}
        <ClientActionButtons thoughtId={thought._id.toString()} />
      </div>
    </div>
  );
}
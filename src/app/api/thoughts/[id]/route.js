// src/app/api/thoughts/[id]/route.js

import dbConnect from "@/utils/database";
import Thought from "@/models/Thought";
import { NextResponse } from "next/server";

// --- GET Handler (for fetching a single thought) ---
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;

  console.log(`API: GET request received for ID: ${id}`); // Debugging log

  try {
    // Validate if the ID is a valid MongoDB ObjectId format
    // This prevents Mongoose's CastError if a malformed ID is passed
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`API: Invalid ID format for GET: ${id}`);
      return NextResponse.json(
        { success: false, message: "Invalid thought ID format" },
        { status: 400 }
      );
    }

    const thought = await Thought.findById(id).lean(); // Use .lean() for performance

    if (!thought) {
      console.log(`API: Thought with ID ${id} not found.`); // Debugging log
      return NextResponse.json(
        { success: false, message: "Thought not found" },
        { status: 404 }
      );
    }

    console.log(`API: Successfully found thought with ID: ${id}`); // Debugging log
    return NextResponse.json(thought); // Return the thought data directly
  } catch (error) {
    console.error(`API: Error fetching thought with ID ${id}:`, error); // Log actual server error
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// --- PUT Handler (for updating a thought) ---
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await request.json(); // Assuming content is sent in the body

  console.log(`API: PUT request received for ID: ${id}, Body:`, body);

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`API: Invalid ID format for PUT: ${id}`);
      return NextResponse.json(
        { success: false, message: "Invalid thought ID format" },
        { status: 400 }
      );
    }

    // Ensure you're updating the correct field, e.g., 'content'
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { content: body.content }, // Assuming your model has a 'content' field
      { new: true, runValidators: true } // Return the new document, run schema validators
    ).lean();

    if (!updatedThought) {
      console.log(`API: Thought with ID ${id} not found for update.`);
      return NextResponse.json(
        { success: false, message: "Thought not found" },
        { status: 404 }
      );
    }

    console.log(`API: Successfully updated thought with ID: ${id}`);
    return NextResponse.json({ success: true, data: updatedThought });
  } catch (error) {
    console.error(`API: Error updating thought with ID ${id}:`, error);
    // Mongoose validation errors often have a 'name' property like 'ValidationError'
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// --- DELETE Handler (from previous discussion) ---
export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  console.log(`API: DELETE request received for ID: ${id}`);

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`API: Invalid ID format for DELETE: ${id}`);
      return NextResponse.json(
        { success: false, message: "Invalid thought ID format" },
        { status: 400 }
      );
    }

    const deletedThought = await Thought.findByIdAndDelete(id);

    if (!deletedThought) {
      console.log(`API: Thought with ID ${id} not found for deletion.`);
      return NextResponse.json(
        { success: false, message: "Thought not found" },
        { status: 404 }
      );
    }

    console.log(`API: Thought with ID ${id} successfully deleted.`);
    return NextResponse.json({ success: true, data: deletedThought });
  } catch (error) {
    console.error(`API: Error deleting thought with ID ${id}:`, error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

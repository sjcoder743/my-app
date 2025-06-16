import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/utils/database";
import Thought from "@/models/Thought";

export async function POST(request) {
  await dbConnect();

  const { userId } = getAuth(request); // ✅ Get userId from request object
  console.log("POST /api/thoughts - userId:", userId);

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await request.json();
    const newThought = await Thought.create({ ...body, userId });
    return new Response(JSON.stringify({ success: true, data: newThought }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving thought:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request) {
  await dbConnect();

  const { userId } = getAuth(request);
  console.log("GET /api/thoughts - userId:", userId);

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const thoughts = await Thought.find({ userId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: thoughts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

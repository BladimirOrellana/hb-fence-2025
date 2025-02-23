import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const uid = formData.get("uid");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const profileImage = formData.get("profileImage");

    console.log("Received Data:", { uid, firstName, lastName, profileImage });

    if (!uid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Ensure we get the correct database instance
    const db = await connectToDatabase();
    const usersCollection = db.collection("users"); // ✅ This should work now

    // ✅ Debug: Check if user exists
    const userExists = await usersCollection.findOne({ uid });
    if (!userExists) {
      console.log("User does not exist, creating new one.");
    }

    // ✅ Update user data
    await usersCollection.updateOne(
      { uid },
      {
        $set: {
          firstName,
          lastName,
          ...(profileImage && { profileImage }), // ✅ Only update image if exists
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

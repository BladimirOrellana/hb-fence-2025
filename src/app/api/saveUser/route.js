import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { uid, email, firstName, lastName } = await req.json();

    if (!uid || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Connect to MongoDB
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // ✅ Check if user already exists
    const existingUser = await usersCollection.findOne({ uid });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    // ✅ Insert new user into the database
    await usersCollection.insertOne({
      uid,
      email,
      firstName,
      lastName,
      role: "user", // Default role
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

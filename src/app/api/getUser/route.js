import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get("uid");

    if (!uid) {
      console.warn("❌ Missing UID in request");
      return NextResponse.json({ error: "Missing UID" }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      console.error("❌ Database connection failed.");
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ uid });

    if (!user) {
      console.warn("⚠️ User not found in MongoDB for UID:", uid);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User found:", user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

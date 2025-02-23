import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: { type: String, default: "/default-avatar.png" },
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" }, // Role system
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

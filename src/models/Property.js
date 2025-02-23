import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Slug for SEO URLs
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "properties" }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);

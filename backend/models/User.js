import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    userType: {
      type: String,
      enum: ["patient", "service provider", "admin"],
      required: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,   // ✅ NEW
    },
  },
  { timestamps: true } // ✅ createdAt & updatedAt
);

export default mongoose.model("User", userSchema);
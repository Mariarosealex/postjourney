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
  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },
  otpLastSentAt: {
    type: Date,
  },

  profileCompleted: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true } // ✅ createdAt & updatedAt
);

export default mongoose.model("User", userSchema);
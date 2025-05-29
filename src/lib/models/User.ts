import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Email tidak valid"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
}, { timestamps: true });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const bcrypt = await import("bcryptjs");
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = models.User || model("User", UserSchema);
export default User;

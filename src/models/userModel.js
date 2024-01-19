import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   FirstName: {
      type: String,
      required: [true, "Please provide a first name"],
      unique: false,
  },
  LastName: {
      type: String,
      required: [true, "Please provide a last name"],
      unique: false,
  }, 
   Username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: false,
    },
    Email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    Password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    PhoneNumber: {
      type: String,
      required: [false, "Please provide a phone number"],
  },
  ProfilePicrute:{
    type: String,
    default: "/assets/profile/default.png"
  },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
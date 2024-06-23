import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  FORGOT_PASSWORD_EXPIRES_IN,
  generateJwtToken,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../config/JWTConfig.js";

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      validate: {
        validator: function (email) {
          const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailPattern.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          const minLength = 8;
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;
          const digitRegex = /\d/;
          const specialCharRegex = /[!@#$%^&*]/;

          if (password.length < minLength) {
            return false;
          }
          if (!uppercaseRegex.test(password)) {
            return false;
          }
          if (!lowercaseRegex.test(password)) {
            return false;
          }
          if (!digitRegex.test(password)) {
            return false;
          }
          if (!specialCharRegex.test(password)) {
            return false;
          }
          return true;
        },
        message: () =>
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
      },
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure unique index on email
userSchema.index({ email: 1 }, { unique: true });

// hashing password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

// create a function to return a JWT token
userSchema.methods.generateAccessToken = async function () {
  return await generateJwtToken(
    {
      _id: this._id,
      role: this.role,
      isActive: this.isActive,
      email: this.email,
      name: this.firstName + " " + this.lastName,
    },
    ACCESS_TOKEN_EXPIRES_IN
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return await generateJwtToken({ _id: this._id }, REFRESH_TOKEN_EXPIRES_IN);
};

userSchema.methods.generateForgotPasswordToken = async function () {
  const id = this._id.toString();
  return await bcrypt.hashSync(id, 10);
};

const User = mongoose.model("User", userSchema);

export default User;

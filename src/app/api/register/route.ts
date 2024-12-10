import { User } from "@/models/User";
import connect from "@/utils/mongoDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { firstName, lastName, email, password } = await request.json();

  await connect();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 5);

  // Create the new user based on the updated schema
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    createdAt: new Date(), // Automatically set by schema but you can specify if needed
  });

  try {
    // Save the new user to the database
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

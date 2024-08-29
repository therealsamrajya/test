import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const USERS_FILE = path.join(process.cwd(), "users.json");

// Load users from file
function loadUsers() {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return new Map(JSON.parse(data));
  }
  return new Map();
}

// Save users to file
function saveUsers(users) {
  const data = JSON.stringify(Array.from(users.entries()));
  fs.writeFileSync(USERS_FILE, data, "utf8");
}

export const users = loadUsers();

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    console.log("Registration attempt:", { username, password });

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (users.has(username)) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    users.set(username, { password });
    saveUsers(users);

    console.log("Updated users:", Array.from(users.entries()));

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return NextResponse.json(
      { message: "Registration successful" },
      {
        status: 200,
        headers: { "Set-Cookie": serialized },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

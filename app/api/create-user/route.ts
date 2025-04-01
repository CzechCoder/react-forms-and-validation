import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("userName");
    const email = searchParams.get("email");

    if (!username || !email) {
      return NextResponse.json(
        { message: "Name and Email are required." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT username, email FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    let userNameValid = true;
    let emailValid = true;

    result.rows.forEach((row) => {
      if (row.username === username) userNameValid = false;
      if (row.email === email) emailValid = false;
    });

    return NextResponse.json({ userNameValid, emailValid }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Server error, please try again." },
      { status: 500 }
    );
  }
}

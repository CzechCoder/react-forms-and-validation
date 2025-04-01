"use server";

import { Pool } from "pg";

import { Inputs } from "@/app/rhfbackend/page";

interface ErrorMsg {
  [key: string]: string;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const registerUser = async (data: Inputs) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    age,
    email,
    citizenship,
    validPassport,
    acceptTerms,
  } = data;

  let errorMsgs: ErrorMsg = {};

  try {
    if (!userName || !email) {
      return (errorMsgs = {
        ...errorMsgs,
        message: "Name and Email are required.",
      });
    }

    const result = await pool.query(
      "SELECT username, email FROM users WHERE username = $1 OR email = $2",
      [userName, email]
    );

    result.rows.forEach((row) => {
      if (row.username === userName) {
        errorMsgs = {
          ...errorMsgs,
          userName: "This user name is already taken.",
        };
      }
      if (row.email === email) {
        errorMsgs = {
          ...errorMsgs,
          email: "This email is already registered.",
        };
      }
    });

    return Object.keys(errorMsgs).length > 0 ? errorMsgs : true;
  } catch (error) {
    console.error("Database Error:", error);
    return (errorMsgs = {
      ...errorMsgs,
      general: "Server error, please try again.",
    });
  }
};

"use client";

import { Inputs } from "@/app/rhfbackend/page";

interface ErrorMsg {
  [key: string]: string;
}

// userName: "",
// password: "",
// firstName: "",
// lastName: "",
// age: 20,
// email: "",
// citizenship: "",
// validPassport: "",
// acceptTerms: false,

// try to use server actions instead and query DB right here?

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
    const response = await fetch(
      `/api/create-user?userName=${userName}&email=${email}&password=${password}`
    );
    const data = await response.json();

    console.log(data);

    if (!response.ok) throw new Error(data.message || "Validation failed");

    if (!data.userNameValid)
      errorMsgs = {
        ...errorMsgs,
        userName: "This user name is already taken.",
      };
    if (!data.emailValid)
      errorMsgs = { ...errorMsgs, email: "This email is already registered." };

    return errorMsgs ? errorMsgs : true;
  } catch (error) {
    return { general: "Server error, please try again." };
  }
};

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { Headline } from "@/app/components/headline";
import { useState } from "react";

type Inputs = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  citizenship: string;
  validPassport: string;
};

export default function Rhf() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValidCitizen, setIsValidCitizen] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 20,
      citizenship: "",
      validPassport: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (data.citizenship === "nonEuUsa") {
      setIsValidCitizen(false);
    }
    setIsSubmitted(true);
    reset();
  };

  console.log(errors);

  return (
    <>
      <Headline title="React Hook Form - Pure" />
      <div className="center-container">
        {isSubmitted && !isValidCitizen && (
          <div className="text-center">
            <CloseIcon color="error" sx={{ fontSize: "8rem" }} />
            <Typography variant="h4">
              Thank you for submitting! Unfortunately, registration is only
              possible for citizens of EU or USA.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setIsValidCitizen(true);
                setIsSubmitted(false);
              }}
              sx={{ mt: 5 }}
            >
              Start over
            </Button>
          </div>
        )}
        {isSubmitted && isValidCitizen && (
          <div className="text-center">
            <CheckIcon color="success" sx={{ fontSize: "8rem" }} />
            <Typography variant="h4">Thank you for submitting!</Typography>
            <Button
              variant="contained"
              onClick={() => setIsSubmitted(false)}
              sx={{ mt: 5 }}
            >
              Start over
            </Button>
          </div>
        )}
        {!isSubmitted && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col px-0 md:px-4 py-6 gap-3 max-w-[450px] mx-auto text-left">
              <label htmlFor="userName">User name</label>
              <input
                id="userName"
                type="text"
                className="input-textfield"
                placeholder="User name"
                {...register("userName", {
                  required: "User name is required",
                  maxLength: {
                    value: 20,
                    message: "User name cannot be longer than 20 characters.",
                  },
                })}
                aria-invalid={errors.userName ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.userName?.message}
              </p>

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="text"
                className="input-textfield"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password needs to have at least one capital letter",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.password?.message}
              </p>

              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                className="input-textfield"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters long.",
                  },
                  maxLength: {
                    value: 60,
                    message: "First name cannot be longer than 60 characters.",
                  },
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.firstName?.message}
              </p>

              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                className="input-textfield"
                placeholder="Last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters long.",
                  },
                  maxLength: {
                    value: 60,
                    message: "Last name cannot be longer than 60 characters.",
                  },
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.lastName?.message}
              </p>

              <label htmlFor="age">Age</label>
              <input
                type="number"
                min={0}
                className="input-textfield"
                placeholder="Age"
                {...register("age", {
                  required: "Please enter your age.",
                  min: {
                    value: 18,
                    message: "You need to be at least 18 years old.",
                  },
                  max: {
                    value: 99,
                    message: "Maximum age allowed is 99 years old.",
                  },
                })}
                aria-invalid={errors.age ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.age?.message}
              </p>

              <input
                type="text"
                className="input-textfield"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              <p role="alert" className="error-message">
                {errors.email?.message}
              </p>

              <label htmlFor="citizenship">Citizenship</label>
              <select
                id="citizenship"
                {...register("citizenship", {
                  required: "Please select another option",
                })}
                className="input-select"
                aria-invalid={errors.age ? "true" : "false"}
              >
                <option value="">Please select your citizenship</option>
                <option value="EU">I am a EU citizen</option>
                <option value="USA">I am a USA citizen</option>
                <option value="nonEuUsa">
                  I am not a citizen of USA or EU
                </option>
              </select>
              <p role="alert" className="error-message">
                {errors.citizenship?.message}
              </p>

              <fieldset>
                <legend>Do you have a valid passport?</legend>
                <label htmlFor="passportYes">
                  <input
                    {...register("validPassport", {
                      required: "Please select one option",
                    })}
                    type="radio"
                    value="yes"
                    id="passportYes"
                  />
                  Yes
                </label>
                <label htmlFor="passportNo">
                  <input
                    {...register("validPassport", {
                      required: "Please select one option",
                    })}
                    type="radio"
                    value="no"
                    id="passportNo"
                  />
                  No
                </label>
              </fieldset>
              <p role="alert" className="error-message">
                {errors.validPassport?.message}
              </p>

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

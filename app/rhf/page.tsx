"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { Headline } from "@/app/components/headline";

type Inputs = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  citizenship: string;
  validPassport: boolean;
};

export default function Rhf() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 20,
      citizenship: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <Headline title="React Hook Form - Pure" />
      <div className="center-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-0 md:px-4 py-6 gap-3 max-w-[450px] mx-auto text-left">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              className="input-textfield"
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
                maxLength: {
                  value: 8,
                  message: "First name cannot be longer than 80 characters.",
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
                  value: 3,
                  message: "Last name must be at least 3 characters long.",
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
              className="input-textfield"
              placeholder="Age"
              {...register("age", {
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
              <option value="nonEuUsa">I am not a citizen of USA or EU</option>
            </select>
            <p role="alert" className="error-message">
              {errors.citizenship?.message}
            </p>

            <input {...register("validPassport")} type="radio" value="Yes" />
            <input {...register("validPassport")} type="radio" value="No" />

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

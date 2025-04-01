"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { SubmitResponse } from "@/app/components/submit-response";
import { Headline } from "@/app/components/headline";
import { registerUser } from "@/app/lib/data";

export type Inputs = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  citizenship: string;
  validPassport: string;
  acceptTerms: boolean;
};

export default function RhfBackend() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValidCitizen, setIsValidCitizen] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      age: 20,
      email: "",
      citizenship: "",
      validPassport: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data);

    if (data.citizenship === "nonEuUsa") {
      setIsValidCitizen(false);
      setIsSubmitted(true);
      reset();
      return;
    }
    setIsSubmitting(true);

    const validationResult = await registerUser(data);

    if (validationResult !== true) {
      if (validationResult.userName)
        setError("userName", {
          type: "manual",
          message: validationResult.userName,
        });
      if (validationResult.email)
        setError("email", { type: "manual", message: validationResult.email });
      if (validationResult.general) alert(validationResult.general);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  const onErrorClick = () => {
    setIsValidCitizen(true);
    setIsSubmitted(false);
  };

  const onSuccessClick = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <Headline title="React Hook Form - Pure w/ Backend Validation" />
      <div className="w-full">
        Validates if user name "Tom" or email "tom@gmail.com" already exists in
        the database.
      </div>
      <div className="center-container">
        {isSubmitted && !isValidCitizen && (
          <SubmitResponse
            type="error"
            text="Registration unsuccessful! Unfortunately, registration is only
              possible for citizens of EU or USA."
            onClick={onErrorClick}
          />
        )}
        {isSubmitted && isValidCitizen && (
          <SubmitResponse
            type="success"
            text="Registration successful. Thank you for submitting!"
            onClick={onSuccessClick}
          />
        )}
        {!isSubmitted && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col px-0 md:px-4 py-6 gap-3 max-w-[450px] mx-auto text-left">
              <div className="w-full">
                <Controller
                  name="userName"
                  control={control}
                  rules={{
                    required: "User name is required",
                    maxLength: {
                      value: 20,
                      message: "User name cannot be longer than 20 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User name"
                      error={!!errors.userName}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your user name"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.userName && (
                  <FormHelperText error={!!errors.userName}>
                    {errors.userName.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password needs to have at least one capital letter and a number",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      error={!!errors.password}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your password"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText error={!!errors.password}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 60,
                      message: "First name cannot be longer than 60 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First name"
                      error={!!errors.firstName}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your first name"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText error={!!errors.firstName}>
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 60,
                      message: "Last name cannot be longer than 60 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last name"
                      error={!!errors.lastName}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your last name"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText error={!!errors.lastName}>
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="age"
                  control={control}
                  rules={{
                    required: "Enter your age",
                    min: {
                      value: 18,
                      message: "You need to be at least 18 years old",
                    },
                    max: {
                      value: 99,
                      message: "Maximum age allowed is 99 years old",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Age"
                      error={!!errors.age}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your age"
                      value={field.value || ""}
                      slotProps={{ htmlInput: { min: 0 } }}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
                {errors.age && (
                  <FormHelperText error={!!errors.age}>
                    {errors.age.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      error={!!errors.email}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your email"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText error={!!errors.email}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="citizenship"
                  control={control}
                  rules={{
                    required: "Select your citizenship",
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.citizenship}>
                      <InputLabel id="citizenship-select">
                        Citizenship
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="citizenship-select"
                        label="Citizenship"
                        fullWidth
                      >
                        <MenuItem value="EU">I am a EU citizen</MenuItem>
                        <MenuItem value="USA">I am a USA citizen</MenuItem>
                        <MenuItem value="nonEuUsa">
                          I am not a citizen of USA or EU
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {errors.citizenship && (
                  <FormHelperText error={!!errors.citizenship}>
                    {errors.citizenship.message}
                  </FormHelperText>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="validPassport"
                  control={control}
                  rules={{
                    required: "Select one option",
                  }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.validPassport}
                      {...field}
                    >
                      <FormLabel id="validPassport">
                        Do you have a valid passport?
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="validPassport"
                        name="validPassport-radio-buttons-group"
                        sx={{
                          color: !!errors.validPassport ? "#d32f2f" : "",
                        }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={
                            <Radio
                              sx={{
                                color: !!errors.validPassport ? "#d32f2f" : "",
                              }}
                            />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={
                            <Radio
                              sx={{
                                color: !!errors.validPassport ? "#d32f2f" : "",
                              }}
                            />
                          }
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                <FormHelperText error={!!errors.validPassport}>
                  {errors.validPassport?.message}
                </FormHelperText>
              </div>

              <div className="w-full">
                <Controller
                  name="acceptTerms"
                  control={control}
                  rules={{
                    required:
                      "Registration cannot continue without your consent",
                  }}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{ color: !!errors.acceptTerms ? "#d32f2f" : "" }}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          sx={{ color: !!errors.acceptTerms ? "#d32f2f" : "" }}
                        />
                      }
                      label="I consent to the company to store my information provided in this form."
                    />
                  )}
                />
                <FormHelperText error={!!errors.acceptTerms}>
                  {errors.acceptTerms?.message}
                </FormHelperText>
              </div>

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

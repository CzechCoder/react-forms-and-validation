"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";

import { SubmitResponse } from "@/app/components/submit-response";
import { Headline } from "@/app/components/headline";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "User name is required" })
    .max(30, { message: "User name cannot be longer than 30 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: "Password must include a number and a capital letter",
    }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(60, { message: "First name cannot be longer than 60 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is is required" })
    .max(60, { message: "Last name cannot be longer than 60 characters" }),
  age: z
    .number()
    .min(1, { message: "Fill in your age" })
    .refine((val) => val > 17, {
      message: "You need to be at least 18 years old",
    })
    .refine((val) => val < 100, {
      message: "Maximum age allowed is 99",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email format"),
  citizenship: z.string().min(1, { message: "Select your citizenship" }),
  validPassport: z.string().min(1, { message: "Select one option" }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Registration cannot continue without your consent",
  }),
});

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValidCitizen, setIsValidCitizen] = useState<boolean>(true);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    if (data.citizenship === "nonEuUsa") {
      setIsValidCitizen(false);
    }
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
      <Headline title="Zod validation" />
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

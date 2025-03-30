"use client";

import { FC } from "react";
import { Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface SubmitResponseProps {
  type: "success" | "error";
  text: string;
  onClick(): void;
}

export const SubmitResponse: FC<SubmitResponseProps> = ({
  type,
  text,
  onClick,
}) => {
  return (
    <div className="text-center">
      {type === "success" ? (
        <CheckIcon color="success" sx={{ fontSize: "8rem" }} />
      ) : (
        <CloseIcon color="error" sx={{ fontSize: "8rem" }} />
      )}
      <Typography variant="h4">{text}</Typography>
      <Button variant="contained" onClick={onClick} sx={{ mt: 5 }}>
        Start over
      </Button>
    </div>
  );
};

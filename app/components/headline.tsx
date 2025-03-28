import { Typography } from "@mui/material";
import { FC } from "react";

interface HeadlineProps {
  title: string;
}

export const Headline: FC<HeadlineProps> = ({ title }) => {
  return (
    <div className="text-left border-b my-4">
      <Typography
        sx={{ typography: { xs: "headlineSmall", md: "headlineBig" } }}
      >
        {title}
      </Typography>
    </div>
  );
};

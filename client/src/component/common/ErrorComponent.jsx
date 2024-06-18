import { Alert } from "@mui/material";
import React from "react";

function ErrorComponent({ message = "Something went wrong" }) {
  return (
    <div>
      <Alert severity="error">{message}</Alert>
    </div>
  );
}

export default ErrorComponent;

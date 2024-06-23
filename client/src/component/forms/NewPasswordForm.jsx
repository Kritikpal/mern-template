import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/user.api";
import { PasswordInputField } from "./formComponents/InputFields";

function NewPasswordForm() {
  const [searchParams] = useSearchParams(); // Extract the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setHasError(true);
      setResponse("Passwords do not match");
      return;
    }
    setLoading(true);
    resetPassword(password, searchParams.get("token"))
      .then((data) => {
        setResponse(data.message);
        if (data.statusCode === 200) {
          setHasError(false);
        } else {
          setHasError(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setHasError(true);
        setResponse(e.response.data.message);
        setLoading(false);
      });
  };

  return (
    <Card variant="elevation" sx={{ maxWidth: "500px" }}>
      <CardContent>
        <Typography align="center" variant="h4" gutterBottom>
          Set New Password
        </Typography>
        <form onSubmit={handleClick}>
          <PasswordInputField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Enter New Password"}
            value={password}
            key={"new-password"}
          />
          <PasswordInputField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder={"Confirm New Password"}
            value={confirmPassword}
            key={"confirm-password"}
          />
          <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">
            {loading
              ? "Submitting..."
              : response && !hasError
              ? response
              : "Set New Password"}
          </Button>
        </form>
        {hasError && (
          <Typography
            color="error"
            align="center"
            variant="body2"
            sx={{ mt: 2 }}
          >
            {response}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default NewPasswordForm;

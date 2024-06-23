import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { forgotPassword } from "../../api/user.api";
import { TextInputField } from "./formComponents/InputFields";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    forgotPassword(email)
      .then((data) => {
        setResponse(data.message);
        if (data.statusCode === 200) {
          setHasError(false);
          setLoading(false);
          setResponse(data.message);
        } else {
          setHasError(true);
          setResponse(data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setHasError(true);
        setResponse(null);
        setLoading(false);
        setResponse(e.response.data.message);
      });
  };

  return (
    <Card variant="elevation" sx={{ maxWidth: "500px" }}>
      <CardContent>
        <Typography align="center" variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleClick}>
          <TextInputField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"Enter Your Email"}
            value={email}
            key={"email"}
            label={"Email"}
            startAdornment={<MailIcon />}
            type={"email"}
            required
          />
          <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
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
        </form>

        <Box>
          <Divider sx={{ m: 2 }}>OR</Divider>
        </Box>
        <Button href="/login" variant="outlined" fullWidth>
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );
}

export default ForgotPasswordForm;

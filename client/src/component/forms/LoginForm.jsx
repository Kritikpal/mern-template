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
import { userLogin } from "../../api/user.api";
import {
  PasswordInputField,
  TextInputField,
} from "./formComponents/InputFields";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    userLogin(email, password)
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
          Login
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
          />
          <PasswordInputField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Enter Your Password"}
            value={password}
            key={"password"}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button href="/forgotPassword" variant="text" sx={{ mt: 2 }}>
              Forgot Password?
            </Button>
          </Box>
          <Button fullWidth type="submit" variant="contained">
            {loading
              ? "Logging in..."
              : response && !hasError
              ? "Successfully Loggedin"
              : "Login"}
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
        <Button href="/signup" variant="outlined" fullWidth>
          Create Account
        </Button>
      </CardContent>
    </Card>
  );
}

export default LoginForm;

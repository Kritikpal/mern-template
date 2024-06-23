import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { createUser } from "../../api/user.api"; // Import the sign up API function
import {
  PasswordInputField,
  TextInputField,
} from "./formComponents/InputFields";

const titles = ["Mr", "Mrs", "Miss"];

function SignUpForm() {
  const [title, SetTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    // get cookies
    setLoading(true);
    createUser(title, email, password, firstName, lastName)
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
          Sign Up
        </Typography>
        <form onSubmit={handleClick}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={title}
              label="Age"
              onChange={(e) => {
                SetTitle(e.target.value);
              }}
            >
              {titles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextInputField
            label="FirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter Your First Name"
            startAdornment={<PersonIcon />}
            type={"text"}
          />

          <TextInputField
            label="LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Your Last Name"
            startAdornment={<PersonIcon />}
            type={"text"}
          />

          <TextInputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            startAdornment={<MailIcon />}
            type={"email"}
          />

          <PasswordInputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            {loading ? "Loading..." : "Sign Up"}
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
          Login
        </Button>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;

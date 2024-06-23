import { FormControl, FormLabel, IconButton, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
export const TextInputField = ({
  label,
  value,
  onChange,
  startAdornment,
  type,
  placeholder,
  required = false,
  name = "input",
}) => {
  return (
    <FormControl sx={{ mt: 2 }} fullWidth>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        onChange={onChange}
        InputProps={{ startAdornment }}
        variant="outlined"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </FormControl>
  );
};

export const PasswordInputField = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <FormLabel>Password</FormLabel>
      <TextField
        value={value}
        onChange={onChange}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: <LockIcon />,
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

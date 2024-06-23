import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user.api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Data from "../component/Data";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../features/auth/userSlice";
function Home() {
  const userData = useSelector((state) => state.userReducer);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    setLoading(true);
    setHasError(false);
    getUserData()
      .then((data) => {
        setLoading(false);
        setHasError(false);
        const userInfo = data.data;
        userInfo["isLoggedIn"] = true;
        dispatch(setUser(userInfo));
      })
      .catch((e) => {
        setHasError(true);
        setLoading(false);
        dispatch(clearUser());
        setErrorMessage(e.response.data.message);
      });
  }, [dispatch]);
  return (
    <div>
      <Data
        hasError={hasError}
        isLoading={loading}
        fallbackMessage={errorMessage}
      >
        {userData && (
          <Card sx={{ maxWidth: 345 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Avatar
                alt={userData.email}
                src={userData.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {userData.email}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button size="small">Contact</Button>
              <Button size="small">Follow</Button>
            </CardActions>
          </Card>
        )}
      </Data>
    </div>
  );
}

export default Home;

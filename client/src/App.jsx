import { useEffect, useState } from "react";
import "./App.css";
import { getTestApiData } from "./api/testApi";
import Data from "./component/Data";
import AppNavbar from "./component/common/AppNavbar";
import { Button, Card } from "@mui/material";

function App() {
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestApiData()
      .then((data) => {
        setResponse(data.message);
        setLoading(false);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
        setResponse(null);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <AppNavbar />
      <Card elevation={10} sx={{ padding: "1rem" }}>
        <Data isLoading={loading} hasError={hasError}>
          {response}
        </Data>
      </Card>
    </>
  );
}

export default App;

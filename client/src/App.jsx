import { useEffect, useState } from "react";
import "./App.css";
import { getTestApiData } from "./api/testApi";
import Data from "./component/Data";
import AppNavbar from "./component/common/AppNavbar";
import { Button } from "@mui/material";

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
      <Data
        isLoading={loading}
        loading={<>Loading...</>}
        hasError={hasError}
        fallback={<div>Error occurred!</div>}
      >
        <Button variant="contained" color="primary" >Click</Button>
      </Data>
    </>
  );
}

export default App;

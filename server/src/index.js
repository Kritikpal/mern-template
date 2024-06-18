import server from "./Server.js";
import "./config/dontenvload.js";
import { PORT } from "./config/expressconfig.js";

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  switch (error.code) {
    case "EACCES":
      console.error("Requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

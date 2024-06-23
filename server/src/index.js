import "./config/dontenvload.js"
import server from "./Server.js";
import { PORT } from "./config/expressconfig.js";
import { connectToMongoDb } from "./db/dbConnect.js";

connectToMongoDb()
  .then(() => {
    console.log("====================================");
    console.log("Connected to MongoDB");
    console.log("====================================");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("====================================");
    console.log("Error connecting to MongoDB", error);
    console.log("====================================");
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

import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

async function main() {
  try {
    await connectDB();
    app.listen(process.env.PORT);
    console.log(`Listen on port http:localhost:`, process.env.PORT);
  } catch (error) {
    console.log(error);
  }
}

main();

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { connectDB } from "./db_config/mongoose.js";
import ejslayout from "express-ejs-layouts"; // Change this import
import filesRouter from "./routes/fileuploadsroutes.js";
import homeController from "./controller/homecontroller.js";

const Homecontroller = new homeController();

// Setting up express for routes
const app = express();

// Setup view engine settings
app.set("view engine", "ejs");
app.set("views", ("./views")); // Corrected views directory

// Setting layout
app.use(ejslayout);

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));


app.use("/file",filesRouter)
app.get("/", Homecontroller.displayHomePage);


app.listen(process.env.PORT, () => {
  console.log("Server is up and running on port:", process.env.PORT);
  connectDB()
});

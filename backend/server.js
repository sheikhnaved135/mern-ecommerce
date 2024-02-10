import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
// import path from "path";
// import { fileURLToPath } from "url";
const app = express();

//configure env
dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "./client/dist")));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//config database
connectDb();

//rest api
const PORT = process.env.PORT || 8080;
// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });
app.get("/", (req, res) => {
  res.send({ message: "hello ecommerce" });
});

app.listen(PORT, () => {
  console.log(`running on port no. ${PORT}`.bgCyan.black);
});

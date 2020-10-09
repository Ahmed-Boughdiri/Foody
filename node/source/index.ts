import express,{ json } from "express";
import Auth from "./routes/Auth";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;
app.listen(PORT, () =>console.log(`Server Running On Port ${PORT}...`))

mongoose.connect(
    "mongodb+srv://ahmed:ahmed123@cluster0.w1ypc.mongodb.net/foody?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () =>console.log("DB Connected Successfully...")
);

app.use(json())
app.use("/api/auth",Auth);
import express from "express";
import { upload } from "../middleware/fileupload.middleware.js";
import { uploadFile,deleteFile, viewFile } from "../controller/filecontroller.js";

const filesRouter = express.Router();

filesRouter.post("/uploadfile", upload.single("file"), uploadFile);
filesRouter.get("/view/:id", viewFile);
filesRouter.get("/delete/:id", deleteFile);


export default filesRouter

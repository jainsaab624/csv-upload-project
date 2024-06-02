import filesModel from "../models/csv.js";
import fs from "fs";
import csv from "csv-parser";
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("no files were uploaded");
    }

    if (req.file.mimetype !== "text/csv") {
      return res.status(400).send("only csv files are allowed");
    }
    console.log(req.file);
    const originalname = req.file.originalname;
    const filePath = req.file.path;

    console.log();

    const newfile = new filesModel({
      filename: req.file.filename,
      filepath: filePath,
      file: originalname,
    });

    await newfile.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const viewFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await filesModel.findById({
      _id: fileId,
    });

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Current page, default to 1 if not provided
    const pageSize = 100; // Number of items per page

    const result = [];
    const header = [];

    fs.createReadStream(file.filepath)
      .pipe(csv())
      .on("headers", (headers) => {
        headers.map((head) => {
          header.push(head);
        });
      })
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        // Calculate total number of pages
        const totalPages = Math.ceil(result.length / pageSize);

        // Calculate start and end indices for pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Slice the data array to get the current page's data
        const paginatedData = result.slice(startIndex, endIndex);

        return res.render("file_viewer", {
          filename: file.file,
          data: paginatedData,
          headers: header,
          length: result.length,
          currentPage: page, // Pass the current page number to the template
          totalPages: totalPages, // Pass the total number of pages to the template
        });
      });

    //   console.log(results)
  } catch (error) {
    console.log(error);
    // Handle errors appropriately
  }
};

export const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log(fileId);
    await filesModel.findByIdAndDelete({
      _id: fileId,
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

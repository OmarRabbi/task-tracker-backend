import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 5000;
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use("/uploads", express.static("uploads"));
// API endpoint for file uploads
app.post("/upload", upload.array("files", 30), (req, res) => {
  if (req.files) {
    const filesData = req.files.map((file) => ({
      url: `http://localhost:${port}/uploads/${file.filename}`,
      name: file.originalname,
    }));

    res.json({
      message: "Files uploaded successfully!",
      files: filesData,
    });
  } else {
    res.status(400).json({ message: "No files uploaded" });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Existing imports
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Reusable route to serve JSON data
function serveJson(filename) {
  return (req, res) => {
    const filePath = path.join(__dirname, `../data/${filename}`);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return res.status(500).send(`Error loading ${filename}`);
      res.json(JSON.parse(data));
    });
  };
}

router.get("/faq", serveJson("faqData.json"));
router.get("/jobs", serveJson("jobData.json"));
router.get("/resources", serveJson("resourceData.json"));
router.get("/forum", serveJson("forumData.json"));
router.get("/contact", serveJson("contactInfo.json"));
router.get("/form", serveJson("formData.json"));

export default router;

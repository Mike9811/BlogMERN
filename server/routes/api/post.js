import express from "express";

// Model
import Post from "../../models/post.js";

const router = express.Router();

// api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find(); // await 기다려
  console.log(postFindResult, "All Post Get");
  res.json(postFindResult);
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;

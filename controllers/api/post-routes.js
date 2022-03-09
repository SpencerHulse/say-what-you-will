const router = require("express").Router();
const { Post, Comment, User } = require("../../models/index");

// All Posts - api/posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", "created_at", "updated_at"],
    include: {
      model: Comment,
      attributes: ["id", "comment_text", "created_at", "updated_at"],
      include: { model: User, attributes: ["username"] },
    },
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Single Post - api/posts/:id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "post_text", "created_at", "updated_at"],
    include: {
      model: Comment,
      attributes: ["id", "comment_text", "created_at", "updated_at"],
      include: { model: User, attributes: ["username"] },
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      res.status(200).json(data);
    })
    .catch.catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create Post - api/posts
router.post("/", (req, res) => {
  Post.create({
    user_id: req.body.user_id,
    title: req.body.title,
    post_text: req.body.post_text,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update Post - api/posts/:id
router.put("/:id", (req, res) => {
  Post.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Post - api/posts/:id
router.delete("/:id", (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const { Comment } = require("../../models/index");

// Get All Comments - api/comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Single Comment - api/comments/:id
router.get("/:id", (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create Comment - api/comments
router.post("/", (req, res) => {
  Comment.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    comment_text: req.body.comment_text,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update Comment - api/comments/:id
router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No comment found with this id" });
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Comment - api/comments/:id
router.delete("/:id", (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No comment found with this id" });
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

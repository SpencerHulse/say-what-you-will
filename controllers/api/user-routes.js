const router = require("express").Router();
const { User, Post, Comment } = require("../../models/index");

// All Users - api/users
router.get("/", (req, res) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Single User - api/users/:id
router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
    include: {
      model: Post,
      attributes: ["id", "title", "post_text", "created_at", "updated_at"],
      include: {
        model: Comment,
        attributes: ["id", "comment_text", "created_at", "updated_at"],
      },
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create User - api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update Existing User - api/users/:id
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a User - api/users/:id
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
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

const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the user
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes: ["id", "title", "created_at"],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add post - Comes before /:id path or will be treated as one
router.get("/new-post", withAuth, (req, res) => {
  res.render("new-post", { loggedIn: req.session.loggedIn });
});

// Get single post to edit or delete
router.get("/:id", withAuth, (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "post_text"],
  })
    .then((data) => {
      const post = data.get({ plain: true });

      res.render("update-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

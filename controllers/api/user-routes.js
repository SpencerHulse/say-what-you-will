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

// Login to account api/users/login
router.post("/login", (req, res) => {
  // Query operations
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this email" });
        return;
      }

      // User verification
      const validPassword = data.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(404).json({ message: "Incorrect password!" });
        return;
      }

      req.session.save(() => {
        // Session variables
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        res.json({ user: data, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Logout of account api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update Existing User - api/users/:id
router.put("/:id", (req, res) => {
  User.update(req.body, { individualHooks: true, where: { id: req.params.id } })
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

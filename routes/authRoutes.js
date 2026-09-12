const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;
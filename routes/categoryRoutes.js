const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { index, create, update, deleteCategory } = require('../controllers/categoryController');
router.get('/', verifyToken, index);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, deleteCategory);
module.exports = router;
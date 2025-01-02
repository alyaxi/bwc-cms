const express = require('express');
const subPostController = require('../../controllers/subPost.controller');
const router = express.Router();

router.post('/', subPostController.createSubPost);
router.post('/get-post', subPostController.getAllSubPosts);
router.get('/:id', subPostController.getSubPostById);
router.put('/:id', subPostController.updateSubPost);
router.delete('/:id', subPostController.deleteSubPost);

module.exports = router;

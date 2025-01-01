const subPostService = require('../services/subPost.service');

// Create a new sub-post
const createSubPost = async (req, res) => {
	console.log(req.body, "req.body")
  try {
    const newSubPost = await subPostService.createSubPost(req.body);
    res.status(201).json(newSubPost);
  } catch (error) {
	console.log(error, "erorrrr")
    res.status(500).json({ error: error.message });
  }
};

// Get all sub-posts
const getAllSubPosts = async (req, res) => {
  try {
    const subPosts = await subPostService.getAllSubPosts();
    res.status(200).json(subPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single sub-post by ID
const getSubPostById = async (req, res) => {
  try {
    const subPost = await subPostService.getSubPostById(req.params.id);
    if (!subPost) return res.status(404).json({ error: 'Sub-post not found' });
    res.status(200).json(subPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a sub-post
const updateSubPost = async (req, res) => {
  try {
    const updatedSubPost = await subPostService.updateSubPost(req.params.id, req.body);
    res.status(200).json(updatedSubPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sub-post
const deleteSubPost = async (req, res) => {
  try {
    await subPostService.deleteSubPost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubPost,
  getAllSubPosts,
  getSubPostById,
  updateSubPost,
  deleteSubPost,
};

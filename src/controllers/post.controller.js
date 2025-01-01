const postService = require('../services/post.service');

// Create a new post
const createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts(req.query.includeSubPosts === 'true');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id, req.query.includeSubPosts === 'true');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

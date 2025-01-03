const { post, subPost } = require('../db/models');

// Create a new main post
const createPost = async (postData) => {
	return await post.create(postData);
};

// Fetch all posts (with optional inclusion of sub-posts)
const getAllPosts = async (includeSubPosts = false) => {
	return await post.findAll({
		include: includeSubPosts ? [{ model: subPost, as: 'postDetail' }] : [],
	});
};

// Fetch a single post by ID
const getPostById = async (id, includeSubPosts = false) => {
	return await post.findByPk(id, {
		include: includeSubPosts ? [{ model: subPost, as: 'postDetail' }] : [],
	});
};

// Update a post by ID
const updatePost = async (id, updatedData) => {
	// Check if post exists before updating
	const existingPost = await post.findByPk(id);
	if (!existingPost) return null;
	// Update post
	return existingPost.update(updatedData);
};

// Delete a post by ID
const deletePost = async (id) => {
	return await post.destroy({ where: { id } });
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
};

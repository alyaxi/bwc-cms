const { where } = require('sequelize');
const { subPost } = require('../db/models');

// Create a new sub-post
const createSubPost = async (subPostData) => {
	console.log(subPostData, 'subPost created');
	return await subPost.create(subPostData);
};

// Fetch all sub-posts
const getAllSubPosts = async (id) => {
	return await subPost.findAll({
		where: {
			postId: id,
		},
	});
};

// Fetch a single sub-post by ID
const getSubPostById = async (id) => {
	return await subPost.findByPk(id);
};

// Update a sub-post by ID
const updateSubPost = async (id, updatedData) => {
	return await subPost.update(updatedData, { where: { id } });
};

// Delete a sub-post by ID
const deleteSubPost = async (id) => {
	return await subPost.destroy({ where: { id } });
};

module.exports = {
	createSubPost,
	getAllSubPosts,
	getSubPostById,
	updateSubPost,
	deleteSubPost,
};

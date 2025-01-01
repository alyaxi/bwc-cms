module.exports = (sequelize, DataTypes) => {
	const subPost = sequelize.define(
		'subPost',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			subHeading: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			image: {
				type: DataTypes.STRING, // Store the image URL
				allowNull: true,
			},
			content: {
				type: DataTypes.TEXT, // Detailed content for the sub-post
				allowNull: false,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			tableName: 'subPost',
		}
	);

	subPost.associate = (models) => {
		subPost.belongsTo(models.post, {
			foreignKey: {
				name: 'postId',
				allowNull: false,
			}, // Match this with 'postId' in post.hasOne
			onDelete: 'CASCADE',
		});
	};

	return subPost;
};

module.exports = (sequelize, DataTypes) => {
	const post = sequelize.define(
		'post',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			postName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			postDescription: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isMainPost: {
				type: DataTypes.BOOLEAN,
				defaultValue: true, // true for main posts, false for sub-posts
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
			tableName: 'post',
		}
	);

	post.associate = (models) => {

		post.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
		  });

		  post.hasMany(models.subPost, {
			foreignKey: 'postId', // Matches 'postId' in subPost
			onDelete: 'CASCADE',
		  });
	};

	return post;
};

module.exports = (sequelize, DataTypes) =>{
  const Post = sequelize.define('Post', {
      content:{
          type: DataTypes.TEXT, // 매우 긴 글
          allowNull: false,
      },
     
  }, {
      charset: 'utf8mb4', // 한글 + 이모티콘
      collate: 'utf8mb4_general_ci', // 한글이 저장됨
  });
  Post.associate = (db) => {
      db.Post.belongsTo(db.User);  // 테이블에 UserId 컬럼이 생김
      db.Post.hasMany(db.Comment);  
      db.Post.hasMany(db.Image);
      db.Post.belongsTo(db.Post, {as: 'Retweet' });
      db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
      db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'});
      
  };
  return Post;
}
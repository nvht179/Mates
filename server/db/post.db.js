
const Post = require("../entities/post.model");
const { ErrorHandler } = require("../helpers/error");
class PostDB {
  
  addNewPost = async ({
    classId,
    title,
    content,
  }) => {
    try{
        const newPost = await Post.create(
            {
                classId,
                title,
                content,
            },
        );
        return newPost;
    }
    
    catch (error){
        throw new ErrorHandler("assignmentDB error:", error);

    };
    }
}

module.exports = new PostDB();


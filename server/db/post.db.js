
const Post = require("../entities/post.model");
const { ErrorHandler } = require("../helpers/error");
class PostDB {
  
  addNewPost = async ({
    classId,
    title,
    content,
    attachmentId,
  }) => {
    try{
        const newPost = await Post.create(
            {
                classId,
                title,
                content,
                attachmentId,
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


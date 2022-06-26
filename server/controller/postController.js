const createError = require("http-errors");

const Post = require("../schema/postSchema");
const newPost = async (req, res, next) => {
  try {
    const { title, description,category } = req.body;
    const file = req.file;
    let postImage;
    if (file) {
      postImage = file.filename;
    }
    if (!title || !description || !postImage ||!category ) {
      res.status(201).json({
        message: "please fill all the fields",
      });
    }else if(title.length <= 10){
      res.status(201).json({message:'tilte must be bigger than 10 charectar'})
    } else if(description.length <= 50){
      res.status(201).json({message:"description must be bigger than 50 charectar"})
    }
     else {
      const post = new Post({
        title,
        description,
        image: postImage,
        category,
        user: req._id,
      });
      await post.save();
      res.status(200).json({
        message: "post created successfully",
      });
    }
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = {
  newPost,
};

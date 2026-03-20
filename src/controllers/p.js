const blogModel = require("../models/blogModel");
const allBlog = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.body;
    const query = {};
    if (search) {
      ((query.title = { $rejex: search, $options: "i" }),
        (query.text = { $rejex: search, $options: "i" }));
    }
    //skip logic
    const skip = (page - 1) * limit;
    const getAllBlog = await blogModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      //for metadata for pagination
      const allBlogs=await blogModel.countDocuments(query)
      return res.status(200).json({
        message:'data fetched successfully',
        success:true,
        allBlogs,
        currentPage:parseInt(page),
        totalPages:Math.ceil(allBlogs/limit),
        getAllBlog
      })
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
    });
  }
};

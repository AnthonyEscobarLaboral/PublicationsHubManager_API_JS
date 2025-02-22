import Publication from "./publication.model.js";
import Category from "../category/category.model.js";


export const createPublication = async (req, res) => {
    try {
        const publicationReceived = req.body;

        const publicationCreated = await Publication.create(publicationReceived)

        return res.status(201).json({
            message: "Publication created and posted succesfully",
            publication: {
                title: publicationCreated.title,
                creator: publicationCreated.creator,
                category: publicationCreated.category,
                content: publicationCreated.content,
                createdAt: publicationCreated.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "New post creation failed,check the information please",
            error: err.message
        });
    }
};

export const categoryTrue = async () => {
    const newCategory = await Category.findOne({categoryName:"General"})
    return newCategory.cid
};

export const editPublication = async (req, res) => {
    try {
        const { pib } = req.params;
        const publicationReceived = req.body;
        const user = req.userJwt._id; 

        const postFound = await Publication.findById(pib);
        if(!postFound){
            return res.status(400).json({
                success: false,
                message: "Post not found,check the id provided"
            });
        };

        if(user == postFound.creator){
            return res.status(400).json({
                success: false,
                message: "Only the creators post can edit this post"
            });
        };

        const changedPost = await Publication.findByIdAndUpdate(pib,publicationReceived, { new: true });

        return res.status(201).json({
            message: "Post changes updated succesfully",
            changedPost
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update post changes",
            error: err.message
        });
    }
};


export const deletePublication = async (req, res) => {
    try {
        const { pib } = req.params;
        const user = req.userJwt._id; 

        const postFound = await Publication.findById(pib);
        if(!postFound){
            return res.status(400).json({
                success: false,
                message: "Post not found,check the id provided"
            });
        };

        if(user == postFound.creator){
            return res.status(400).json({
                success: false,
                message: "Only the creators post can edit this post"
            });
        };

        await Publication.findByIdAndUpdate(pib, {status: false}, {new: true})

        return res.status(201).json({
            message: "Post deleted succesfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete post",
            error: err.message
        });
    }
};
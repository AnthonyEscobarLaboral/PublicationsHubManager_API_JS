import Publication from "../publication/publication.model.js";
import Comment from "./comment.model.js";


export const addComment = async (req, res) => {
    try {
        const { pib } = req.params;
        const commentDataReceived = req.body;

        const commentCreated = await Comment.create(commentDataReceived);

        const post = await Publication.findByIdAndUpdate(pib, { $push: { comments: commentCreated._id } }, { new: true })

        return res.status(201).json({
            message: "Comment created and posted succesfully",
            commentCreated,
            post
        });
    } catch (err) {
        return res.status(500).json({
            message: "New comment creation failed,check it again please",
            error: err.message
        });
    }
};


export const editComment = async (req, res) => {
    try {
        const { cmid } = req.params;
        const {opinion} = req.body;
        const user = req.userJwt._id;

        const commentFound = await Comment.findById(cmid);
        if (!commentFound) {
            return res.status(400).json({
                success: false,
                message: "Comment not found,check the id provided"
            });
        };

        if (user == commentFound.creator) {
            return res.status(400).json({
                success: false,
                message: "Only the creator post can edit this comment"
            });
        };

        const changedComment = await Comment.findByIdAndUpdate(cmid, {opinion:opinion}, { new: true });

        return res.status(201).json({
            message: "Comment changes updated succesfully",
            changedComment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update post changes",
            error: err.message
        });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { cmid } = req.params;
        const { pib } = req.body;
        const user = req.userJwt._id;

        const commentFound = await Comment.findById(cmid);
        if (!commentFound) {
            return res.status(400).json({
                success: false,
                message: "Comment not found,check the id provided"
            });
        };


        if (user == commentFound.creator) {
            return res.status(400).json({
                success: false,
                message: "Only the creator post can edit this comment"
            });
        };


        await Publication.findByIdAndUpdate(pib, { $pull: { comments:cmid } }, { new: true })

        await Comment.findByIdAndUpdate(cmid, { status: false }, { new: true })

        return res.status(201).json({
            message: "Comment deleted succesfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete comment",
            error: err.message
        });
    }
};
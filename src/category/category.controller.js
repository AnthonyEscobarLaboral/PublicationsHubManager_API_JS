import Category from "./category.model.js";
import { validateAdminAccount } from "../middlewares/validate-types.js";


export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const admin = req.userJwt;

        validateAdminAccount(admin, res);

        const category = new Category({
            categoryName: categoryName
        });

        await Category.create(category);

        return res.status(201).json({
            message: "New category created succesfully",
            category: {
                categoryName: category.categoryName,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "New category creation failed,check the information please",
            error: err.message
        });
    }
};

export const editCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const { newCategoryName } = req.body;
        const admin = req.userJwt;

        validateAdminAccount(admin, res);

        const changedCategory = await Category.findByIdAndUpdate(cid, {categoryName: newCategoryName}, { new: true });

        return res.status(201).json({
            message: "Categorys changes updated succesfully",
            category: {
                categoryName: changedCategory.categoryName,
                updatedAt: changedCategory.updatedAt,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update category changes",
            error: err.message
        });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const admin = req.userJwt;

        validateAdminAccount(admin, res);

        await Category.findByIdAndUpdate(cid, {status: false}, {new: true})

        return res.status(201).json({
            message: "Category deleted succesfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete the category",
            error: err.message
        });
    }
};
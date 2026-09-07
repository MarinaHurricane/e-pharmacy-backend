import { CATEGORIES } from "../../constants/categories.js"

export const getCategories = async(req, res) => {
    res.status(200).json(CATEGORIES);
}
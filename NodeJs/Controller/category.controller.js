import categoryModel from "../Model/category.model.js";

export function createCategory(req, res) {

    const { items, belongsTo } = req.body;

    const newCategory = categoryModel({
        items,
        belongsTo
    })

    newCategory.save().then(data => {

        if (!data) {
            return res.status(400).json({message: 'something went wrong'})
        }

        res.send(data);
    });

}
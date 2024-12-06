import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    items: {
        type: Array,
        required: true
    },
    belongsTo: {
        type: Array,
        required: true
    }
    
})

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
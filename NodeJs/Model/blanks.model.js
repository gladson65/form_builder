import mongoose from "mongoose";

const blanksSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true
    },
    blankSentence: {
        type: String,
        required: true
    }
})

const blanksModel = mongoose.model('fillSentence', blanksSchema);
export default blanksModel;
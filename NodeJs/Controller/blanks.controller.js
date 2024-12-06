import blanksModel from "../Model/blanks.model.js";

export function createBlanks(req, res) {

    const { sentence, blankSentence } = req.body;

    const newBlanks = blanksModel({
        sentence,
        blankSentence
    })

    newBlanks.save().then((data)=> {

        if (!data) {
            return res.status(400).json({message: 'something went wrong'});
        }

        res.send(data);
    })
}
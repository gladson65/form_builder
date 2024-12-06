import { useState, useEffect, useRef } from "react";


function Cloze(props) {

    const [ sentence, setSentence ] = useState("");
    const [ editorFlag, setEditorFlag ] = useState(false);
    const [ selectedWord, setSelectedWord ] = useState([]);
    var selectedText = useRef("");
    var previewText = useRef("");


    function selection() {
        if (window.getSelection) {
            if (window.getSelection().toString().length > 0) {
                selectedText.current = window.getSelection().toString();
                if (!selectedWord.includes(selectedText.current)) {
                    setSelectedWord([selectedText.current]);       
                }
            }
        }

    }

    function underlineText() {
        let inputText = document.getElementById("sent").value.trim();
        let newText = inputText.split(`${selectedText.current}`);
    }
    

    useEffect(()=> {

        let previewContainer = document.getElementById("preview");
        let inputText = document.getElementById("sent").value;
        let text;
        for (let i = 0; i < selectedWord.length; i++) {
            if (inputText.includes(selectedWord[i])) {
                text = inputText.replace(`${selectedWord[i]}`, `${"_".repeat(selectedWord[i].length)}`);                
            }
        }

        previewText.current = text;
        setTimeout(()=> {
            if (previewText.current != null) {
                previewContainer.innerHTML = previewText.current;
                props.setSentenceState(document.getElementById("sent").value);
                props.setBlanksState(previewText.current);
            }
        }, 1000)
        

        if (sentence.length > 0) {
            setEditorFlag(true);
        }
        else {
            setEditorFlag(false);
        }
        
    }, [sentence, selectedWord])

    return(
        <>
            <div className="mt-14">
                <div className="flex justify-between items-center px-1">
                    <h1>Question 2</h1>
                    <button></button>
                </div>
                <div className="flex justify-between mt-7 mb-7">
                    <div className="flex flex-col gap-2 w-3/5 px-2 py-2">
                        <span>Preview</span>
                        <p id="preview" className="w-full h-10 border px-1 py-1"></p>
                    </div>
                    <p className="flex items-center w-32 px-1 py-1 justify-start gap-4">
                        Cloze
                        <span>?</span>
                    </p>
                </div>

                <div className="flex flex-col gap-2 w-3/5 px-2 py-2">
                    <span>Sentence</span>
                    <div className={`flex justify-start items-center gap-7 w-3/5 px-1 py-1 ${editorFlag ? 'flex': 'hidden'}`}>
                        <span>B</span>
                        <span>I</span>
                        <span onClick={underlineText} className="cursor-pointer">U</span>
                    </div>
                    <input id="sent" onMouseLeave={selection} onChange={(e)=> setSentence(e.target.value)} type="text" className="w-full border px-2 py-2"
                        placeholder="underline the words here to conver them into blanks"/>
                </div>
                
                {
                    selectedWord.length > 0 &&   
                    <>
                        <p><span>☑️</span> {selectedWord}</p>
                    </>
                    
                }
            </div>
        </>
    )
}

export default Cloze;
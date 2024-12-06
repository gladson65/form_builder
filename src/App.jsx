import { useState, useEffect } from 'react';
import Categorize from './components/Categorize';
import Cloze from './components/Cloze.jsx';
import { Provider } from 'react-redux';
import quizeStore from './utils/questionStore.js';
import { useSelector } from 'react-redux';
import './App.css';

function App() {

  const [ itemState, setItemState ] = useState([]);
  const [ belongState, setBelongState ] = useState([]);
  const [ sentenceState, setSentenceState ] = useState("");
  const [ blanksSate, setBlanksState ] = useState("")
  
  
  function saveDoc() {
    
    const response = fetch('http://localhost:7000/api/category', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({items: itemState, belongsTo: belongState}),
    });

    const result = response.then((data) => {
      return data.json();
    })

    result.then((data) => {
      console.log(data);
    })

    const responseTwo = fetch('http://localhost:7000/api/question2', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({sentence: sentenceState, blankSentence: blanksSate}),
    })

    const resulttwo = responseTwo.then((data) => {
      return data.json();
    })

    resulttwo.then((data) => {
      console.log(data);
    })
  }




  return (
    <>
      <Provider store={quizeStore}>
      <div className='main_content h-auto w-screen pt-20 pb-14 px-14'>
        <div className='header w-full py-2 mb-5 border-b-4 flex justify-between items-center'>
          <span>Untitled Quiz</span>
          <div className='flex justify-evenly items-center gap-2 w-auto px-2'>
            <span></span><span></span><span></span>
            <button onClick={saveDoc} className='bg-blue-700 text-white w-20 py-1 rounded-md'>
              Save
            </button>
            <button className='border-2 border-blue-700 px-2 py-1 rounded-md'>
              Save & Proceed
            </button>
          </div>
        </div>

        <Categorize setItemState={setItemState} setBelongState={setBelongState}/>
        <Cloze setSentenceState={setSentenceState} setBlanksState={setBlanksState}/>
      </div>
      </Provider>
    </>
  )
}

export default App

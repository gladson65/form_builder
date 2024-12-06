import { useState, useEffect, useRef } from "react";
import NewCats from "./NewCats";
import ItemCard from "./ItemCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addBelongs } from "../utils/categorySlice.js";
import "../App.css";


function Categorize(props) {

    const [ newCat, setNewCat ] = useState("");
    const [ cat1, setCat1 ] = useState("");
    const [ cat2, setCat2 ] = useState("");
    const [ item1, setItem1 ] = useState("");
    const [ item2, setItem2 ] = useState("");
    const [ categories, setCategories ] = useState([]);
    const [ totalCategories, setTotalCategories ] = useState([]);
    const [ newCategories, setnewCategories ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ newItem, setNewItem ] = useState(""); 
    const [ newItems, setNewItems ] = useState([]);
    
    // useRef state for storing belongsTo array 
    const ref = useRef([]);
    const itemRef = useRef([]);

    // dispatch an action
    const dispatch = useDispatch();

    // subscribe to the store
    const belongsArr = useSelector((store)=> store.category.belongsTo)
    
    function addCategory() {
        document.querySelector(".addInput").value = "";

        if (newCat.length > 0) {
            setnewCategories([...newCategories, newCat]);
        }        
    }

    function deleteCategory(id) {
        const value = newCategories[id];
        const newArr = newCategories.filter((item) => item !== value )
        setnewCategories(newArr);
    }

    function addItem() {
        document.querySelector(".addItem").value = "";

        if (newItem.length > 0) {
            setNewItems([...newItems, newItem]);
        }
    }

    function deleteItem(id) {
        const value = newItems[id];
        const newArr = newItems.filter((item) => item !== value )
        setNewItems(newArr);
    }

    function addBelong(id,value) {
        dispatch(addBelongs([id, value]));
        ref.current[id] = value;
        
    }


    useEffect(()=> {

        const defaultItem = [item1, item2];
        const totalItems = defaultItem.concat(newItems)
        
        setTimeout(()=> {
            const total = [cat1, cat2];
            const newTotal = total.concat(newCategories)
            setTotalCategories(newTotal);

            props.setItemState(totalItems);
            props.setBelongState(ref.current);
        }, 2000)
       
    }, [newCategories, newItems, item1, item2]);

    return(
        <>
            <div className="">
                <div className="flex justify-between items-center px-1">
                    <h1>Question 1</h1>
                    <button>X</button>
                </div>
                <div className="flex justify-between mt-7 mb-7">
                    <input type="text" placeholder="Description(optional)" className="w-3/5 border-2 px-2 py-2"/>
                    <p className="flex justify-center items-center w-32 px-1 py-1 justify-between">
                        Categorize
                        <span>?</span>
                    </p>
                </div>

                <div id="categories" className="flex flex-col gap-2 mb-2">
                    <div>
                        <input onChange={(e)=> setCat1(e.target.value)} type="text" placeholder="Cat1" className="cat"/>
                        <span className="cursor-pointer">X</span>
                    </div>
                    <div>
                        <input onChange={(e)=> setCat2(e.target.value)} type="text" placeholder="Cat2" className="cat"/>
                        <span className="cursor-pointer">X</span>
                    </div>
                    {
                        newCategories.length > 0 &&
                        newCategories.map((cat, i) => {
                            return <NewCats key={i} id={i} cat={cat} deleteCategory={deleteCategory}/>
                        })
                    }
                </div>
                <div>
                    <input onChange={(e)=> setNewCat(e.target.value)} type="text" placeholder={`Category ${3 + newCategories.length} (Optional)`} className="addInput cat"/>
                    <span className="cursor-pointer text-xl" onClick={addCategory}>+</span>
                </div>
            </div>
            
            <div className="mt-4 flex gap-7">
                {/* items section */}
                
                <div>
                    <div className="flex flex-col gap-2">
                        <h1>Items</h1>
                        <div className="flex flex-col gap-2">
                            <div>
                                <input onChange={(e)=> setItem1(e.target.value)} type="text" placeholder="Item1" className="cat"/>
                                <span className="cursor-pointer">X</span>
                            </div>
                            <div>
                                <input onChange={(e)=> setItem2(e.target.value)} type="text" placeholder="Item2" className="cat"/>
                                <span className="cursor-pointer">X</span>
                            </div>
                            {
                                newItems.length > 0 &&
                                newItems.map((item, i) => {
                                    return <ItemCard key={i} id={i} item={item} deleteItem={deleteItem}/>
                                })
                            }
                        </div>

                        <div>
                            <input onChange={(e)=> setNewItem(e.target.value)} type="text" placeholder={`item ${3 + newItems.length} (optional)`} className="addItem cat"/>
                            <span className="cursor-pointer text-xl" onClick={addItem}>+</span>
                        </div>

                    </div>
                </div>

                {/* belongs to section */}
                <div>
                    <div className="flex flex-col gap-2">
                        <h1>Belongs To</h1>
                        <div className="flex flex-col gap-2">
                            {
                                newCategories.length > 0 ?
                                totalCategories.map((cat, index) => {
                                    return(
                                        <>
                                            <div key={index}>
                                                <select key={index} id={index} className="cat w-52" onChange={(e)=> addBelong(e.target.id, e.target.value)}>
                                                    {
                                                        totalCategories.length > 0 &&
                                                        totalCategories.map((cat, i) => {
                                                            return <option key={i} defaultValue={cat} index={index} id={i}>{cat}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                <>
                                    <div key="0">
                                        <select id="0" className="cat w-52">
                                            <option defaultValue="belong 1">belong 1</option>
                                        </select>
                                    </div>
                                    <div key="1">
                                        <select id="1" className="cat w-52">
                                            <option defaultValue="belong 2">belong 2</option>
                                        </select>
                                    </div>
                                </>
                            }
                            {/* <div>
                                <select id={`${totalCategories.length-1}`} className="cat w-52" onClick={(e)=> addBelong(e)}>
                                    {
                                        totalCategories.length > 0 &&
                                        totalCategories.map((cat, i) => {
                                            return <option onClick={addBelong} defaultValue={cat} key={i} id={i}>{cat}</option>
                                        })
                                    }
                                </select>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorize;
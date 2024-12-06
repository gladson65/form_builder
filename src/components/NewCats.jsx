

function NewCats(props) {

    return(
        <>
            <div>
                <input type="text" defaultValue={props.cat} className="cat"/>
                <span className="cursor-pointer" onClick={(e) => props.deleteCategory(props.id)}>X</span>
            </div>
        </>
    )
}

export default NewCats;
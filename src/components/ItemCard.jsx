

function ItemCard(props) {
    
    return(
        <>
            <div>
                <input type="text" defaultValue={props.item} className="cat"/>
                <span className="cursor-pointer" onClick={(e) => props.deleteItem(props.id)}>X</span>
            </div>
        </>
    )
}

export default ItemCard;
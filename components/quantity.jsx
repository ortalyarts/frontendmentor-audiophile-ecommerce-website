export default function Quantity({quantity, reduceQuantity, increaseQuantity}){
    return(
        <div className="quantity-holder">
            <button className="btn-quantity" type="button" aria-label="reduce quantity" onClick={reduceQuantity}>-</button>
            <p>{quantity}</p>
            <button className="btn-quantity" type="button" aria-label="increase quantity" onClick={increaseQuantity}>+</button>
        </div>
    )
}
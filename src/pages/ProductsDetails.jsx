import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/Products";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();
    
    useEffect(() => {
        const foundProduct = getProductById(id);
        console.log(foundProduct);
        if (!foundProduct) {
            navigate("/");
            return;
        }
        setProduct(foundProduct);
        
    }, [id]);

    if (!product) {
        return <h1>Loading...</h1>
    }
    const productInCart = cartItems.find((item) => item.id === product.id);
    const productQuantityLabel = productInCart ? `${productInCart.quantity}`: "";
   
    return (
        <div className='page'>
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1>{product.name}</h1>
                        <p>$ {product.price}</p>
                        <p>{product.description}</p>
                        <button class='btn btn-primary' onClick={() => addToCart(product.id)}>Add to Cart {productQuantityLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
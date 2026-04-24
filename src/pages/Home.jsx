import { getProducts } from "../data/Products";
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'

function Home() {
    const products = getProducts();
    return (
        <div className="page">
            <div className="home-hero">
                <h1 className='home-title'>Welcome To ShopHub</h1>
                <p className='home-subtitle'>Discover amazing products at amazing prices.</p>
            </div>
            <div className="container">
                <h2 className='page-title'>Our Products</h2>
                <div className="product-grid">
                    { products.map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;
import { useEffect, useState } from 'react';
import './AlsoLike.css';
import ProductCard from '../ProductCard/ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: number;
}

function AlsoLIke() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const BASE_URL = 'https://692dbd1de5f67cd80a4cc554.mockapi.io/api';

        Promise.all([
            fetch(`${BASE_URL}/products`).then(res => res.json()),
            fetch(`${BASE_URL}/products`).then(res => res.json()),
        ])
            .then(([productsData]) => {
                setProducts(productsData.slice(0, 4));

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);


    return (
        <div>
            <div className="hh2">
                <h2 className="also-like-title">You May Also Like</h2>
            </div>

            {loading && <p>Loading products...</p>}
            <div className="sing1">
                <div className="newcar">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                        />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default AlsoLIke
// src/pages/ProductDetail.tsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import RatingStars from '../components/RatingStars/RatingStars';
import './ProductDetail.css';
import '../components/AlsoLike/AlsoLike'
import AlsoLike from '../components/AlsoLike/AlsoLike';

interface ProductData {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  images?: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`https://692dbd1de5f67cd80a4cc554.mockapi.io/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchSingleProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
    <div className="product-detail-page">
      {/* --- Նկարների հատված (Ձախ մաս) --- */}
      <div className="gallery-section">
        <div className="thumbnails">
             {/* Օրինակի համար մեկ փոքր նկար */}
             <img src={product.image} alt="thumb" />
        </div>
        
      </div>

      {/* --- Ինֆորմացիայի հատված (Աջ մաս) --- */}
      <div className="info-section">
        <h1>{product.title}</h1>
        
        {/* Աստղեր - Այստեղ կիրառում ենք նոր կոմպոնենտը */}
        <div className="stars-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <RatingStars rating={product.rating} />
            <span style={{ fontSize: '14px', color: '#666' }}>
               {product.rating}/5
            </span>
        </div>
        
        <div className="price-row">
           <span className="current-price">${product.price}</span>
        </div>

        <p className="description">
          {product.description || "This is a high-quality product suitable for your casual style."}
        </p>

        {/* Գույն և Չափս (Ստատիկ օրինակներ) */}
        <div className="options">
           <div style={{ margin: '20px 0' }}>
             <strong>Choose Size:</strong> 
             <button style={{ margin: '0 5px' }}>S</button> 
             <button style={{ margin: '0 5px' }}>M</button> 
             <button style={{ margin: '0 5px' }}>L</button>
           </div>
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={() => {
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              rating: product.rating,
            });
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }}
        >
          Add to Cart
        </button>

        {/* Notification Toast */}
        {showNotification && (
          <div className="notification-toast">
            ✓ Product added to cart!
          </div>
        )}
      </div>
    </div>
   <div className="also"><AlsoLike /></div>
   </>
  );
};

export default ProductDetail;

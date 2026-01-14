// src/components/ProductCard/ProductCard.tsx

import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars/RatingStars'; // Համոզվեք, որ ուղին ճիշտ է դեպի RatingStars.tsx
import './ProductCard.css'; // Եթե ունեք առանձին CSS ֆայլ այս կոմպոնենտի համար

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard = ({ id, title, price, image, rating }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${id}`} 
      className="product-card-link" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="single-item">
        
        {/* Նկարի հատված */}
        <div className="img-holder">
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* Վերնագիր */}
        <h3>{title}</h3>

        {/* Ռեյտինգի հատված՝ օգտագործելով առանձին կոմպոնենտը */}
        <div className="rating-box">
          <div className="stars-row">
            <RatingStars rating={rating} />
          </div>
          <span className="rating-num">{rating}/5</span>
        </div>

        {/* Գին */}
        <div className="price-label">
          ${price}
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Ավելացրել ենք Link-ը այստեղ
import './Category.css'; 
import '../components/ProductCard/ProductCard'; // Ուշադրություն. components./ փոխել եմ components/ (վրիպակ էր)

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const Category = () => { 

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const API_ENDPOINT = 'https://692dbd1de5f67cd80a4cc554.mockapi.io/api';

    // 2. Օգտագործում ենք async/await (տարբերվում է ձեր հին .then() կոդից)
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/products`);
        const data = await response.json();
        
        // Ուղղակի վերցնում ենք առաջին 9-ը՝ առանց անունները փոխելու
        setProducts(data.slice(0, 9));
      } catch (err) {
        console.error('Data loading error:', err);
      }
    };

    fetchProducts();
  }, []);

  // 3. Աստղերի լոգիկան առանձին կոմպոնենտով (տարբերվում է ձեր հին ֆունկցիայից)
  const StarShape = ({ active }: { active: boolean }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      fill={active ? "#FFC107" : "#DEE2E6"} // Դեղին կամ բաց մոխրագույն
      viewBox="0 0 16 16"
      style={{ display: 'inline-block', marginRight: '2px' }}
    >
      <path d={active 
        ? "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
        : "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
      }/>
    </svg>
  );

  return (
    <div className="casual-page-wrapper">
      <div className="sidebar-section"></div>
      
      <div className="main-content">
        {/* 4. ClassName-ները ուրիշ են (items-container vs newcarr) */}
        <div className="items-container">
          
          {products.map((item) => (
            // 2. Փաթաթում ենք Link-ի մեջ
            <Link 
              key={item.id} 
              to={`/product/${item.id}`} // Հղում ենք տալիս դեպի պրոդուկտի էջ
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} // CSS որպեսզի հղումը չփչացնի դիզայնը
            >
              <div className="single-item">
                
                <div className="img-holder">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <h3>{item.title}</h3>

                <div className="rating-box">
                  <div className="stars-row">
                    {/* Array.from-ով ավելի կարճ է գրվում */}
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarShape key={i} active={i < Math.round(item.rating)} />
                    ))}
                  </div>
                  <span className="rating-num">
                    {item.rating}/5
                  </span>
                </div>

                <div className="price-label">
                  ${item.price}
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Category;

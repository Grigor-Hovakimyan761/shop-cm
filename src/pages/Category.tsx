import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Category.css';
import ProductCard from '../components/ProductCard/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  colors: string[];
  brand: string;
  gender: string;
}

const Category = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number | '', max: number | '' }>({ min: '', max: '' });

  // Accordion State: Track which sections are expanded
  // Changed to false so they are closed by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: false,
    categories: false,
    brands: false,
    gender: false,
    colors: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const API_ENDPOINT = 'https://692dbd1de5f67cd80a4cc554.mockapi.io/api';

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/products`);
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error('Data loading error:', err);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique values for filters
  const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();
  const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand))).sort();
  const uniqueGenders = Array.from(new Set(allProducts.map(p => p.gender))).sort();
  const uniqueColors = Array.from(new Set(allProducts.flatMap(p => p.colors))).sort();

  // Helper to toggle filter selection
  const toggleFilter = (_list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setList(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  // Filter Logic
  const products = allProducts.filter(product => {
    // 1. Search Term
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    // 2. Price Filter
    if (priceRange.min !== '' && product.price < priceRange.min) return false;
    if (priceRange.max !== '' && product.price > priceRange.max) return false;

    // 3. Category Filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;

    // 4. Brand Filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

    // 5. Gender Filter
    if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) return false;

    // 6. Color Filter
    if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;

    return true;
  });

  return (
    <div className="casual-page-wrapper">
      <div className="sidebar-section">
        <h2>Filters</h2>

        {/* Price Filter */}
        <div className="filter-group">
          <h3 onClick={() => toggleSection('price')}>
            Price ($)
            <span className={`arrow ${expandedSections.price ? 'up' : 'down'}`}>&#9662;</span>
          </h3>
          {expandedSections.price && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                min={0}
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value ? Number(e.target.value) : '' }))}
                style={{ width: '45%', padding: '5px' }}
              />
              <input
                min={0}
                type='number'
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : '' }))}
                style={{ width: '45%', padding: '5px' }}
              />
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="filter-group">
          <h3 onClick={() => toggleSection('categories')}>
            Categories
            <span className={`arrow ${expandedSections.categories ? 'up' : 'down'}`}>&#9662;</span>
          </h3>
          {expandedSections.categories && (
            <div className="filter-content">
              {uniqueCategories.map(cat => (
                <div key={cat} style={{ marginBottom: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                      style={{ marginRight: '8px' }}
                    />
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="filter-group">
          <h3 onClick={() => toggleSection('brands')}>
            Brands
            <span className={`arrow ${expandedSections.brands ? 'up' : 'down'}`}>&#9662;</span>
          </h3>
          {expandedSections.brands && (
            <div className="filter-content filter-scroll-area">
              {uniqueBrands.map(brand => (
                <div key={brand} style={{ marginBottom: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                      style={{ marginRight: '8px' }}
                    />
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="filter-group">
          <h3 onClick={() => toggleSection('gender')}>
            Gender
            <span className={`arrow ${expandedSections.gender ? 'up' : 'down'}`}>&#9662;</span>
          </h3>
          {expandedSections.gender && (
            <div className="filter-content">
              {uniqueGenders.map(gender => (
                <div key={gender} style={{ marginBottom: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(gender)}
                      onChange={() => toggleFilter(selectedGenders, setSelectedGenders, gender)}
                      style={{ marginRight: '8px' }}
                    />
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="filter-group">
          <h3 onClick={() => toggleSection('colors')}>
            Colors
            <span className={`arrow ${expandedSections.colors ? 'up' : 'down'}`}>&#9662;</span>
          </h3>
          {expandedSections.colors && (
            <div className="filter-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {uniqueColors.map(color => (
                <div key={color} style={{ marginBottom: '5px', width: '45%' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                      style={{ marginRight: '5px' }}
                    />
                    {color}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="main-content">
        <div className="items-container">

          {products.length === 0 && allProducts.length > 0 && (
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', gridColumn: '1 / -1' }}>
              No products found matching your criteria.
            </div>
          )}

          {products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Category;
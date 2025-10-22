  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  function ProductList() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
      axios.get('http://localhost:5000/api/products' + (filter ? `?category=${filter}` : ''))
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products:', error));
    }, [filter]);

    return (
      <div>
        <h2>Products</h2>
        <input placeholder="Filter by category" onChange={(e) => setFilter(e.target.value)} />
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => {/* Add to cart logic */}}>Add to Cart</button>
          </div>
        ))}
      </div>
    );
  }

  export default ProductList;
  
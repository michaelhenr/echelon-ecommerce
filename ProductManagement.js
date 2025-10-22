  import React, { useState } from 'react';
  import axios from 'axios';

  function ProductManagement() {
    const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' });

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/products', product);
        console.log('Product uploaded:', response.data);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };

    return (
      <div>
        <h2>Manage Products</h2>
        <input placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <input placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        <input placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <input placeholder="Image URL" onChange={(e) => setProduct({ ...product, image: e.target.value })} />
        <button onClick={handleSubmit}>Upload Product</button>
      </div>
    );
  }

  export default ProductManagement;
  
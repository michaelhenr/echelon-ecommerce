  import React, { useState } from 'react';
  import axios from 'axios';

  function Checkout() {
    const [order, setOrder] = useState({ items: [], total: 0 });

    const handleCheckout = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/orders', order);
        console.log('Order placed:', response.data);
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    };

    return (
      <div>
        <h2>Checkout</h2>
        {/* Simulate cart items */}
        <button onClick={handleCheckout}>Complete Purchase</button>
      </div>
    );
  }

  export default Checkout;
  
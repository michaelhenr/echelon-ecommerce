import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProductManagement = () => {
  return (
    <>
      <Helmet>
        <title>Product Management - Echelon Ecommerce</title>
        <meta name="description" content="Manage your products" />
      </Helmet>

      <div className="brand-page brand-background">
        <div className="container">
          <div className="brand-header">
            <h1>Product Management</h1>
            <p>Manage your product inventory</p>
          </div>
          
          <div className="brand-card">
            <div className="brand-card-header">
              <h2>Product Management</h2>
            </div>
            <div className="brand-card-body">
              <p>Product management functionality will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManagement;

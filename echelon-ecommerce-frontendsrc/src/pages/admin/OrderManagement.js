import React from 'react';
import { Helmet } from 'react-helmet-async';

const OrderManagement = () => {
  return (
    <>
      <Helmet>
        <title>Order Management - Echelon Ecommerce</title>
        <meta name="description" content="Manage orders and transactions" />
      </Helmet>

      <div className="admin-page admin-background">
        <div className="container">
          <div className="admin-header">
            <h1>Order Management</h1>
            <p>Manage orders and transactions</p>
          </div>
          
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Order Management</h2>
            </div>
            <div className="admin-card-body">
              <p>Order management functionality will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManagement;

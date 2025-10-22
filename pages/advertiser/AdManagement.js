import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdManagement = () => {
  return (
    <>
      <Helmet>
        <title>Ad Management - Echelon Ecommerce</title>
        <meta name="description" content="Manage your advertising campaigns" />
      </Helmet>

      <div className="advertiser-page advertiser-background">
        <div className="container">
          <div className="advertiser-header">
            <h1>Ad Management</h1>
            <p>Manage your advertising campaigns</p>
          </div>
          
          <div className="advertiser-card">
            <div className="advertiser-card-header">
              <h2>Ad Management</h2>
            </div>
            <div className="advertiser-card-body">
              <p>Ad management functionality will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdManagement;

import React from 'react';
import { Helmet } from 'react-helmet-async';

const UserManagement = () => {
  return (
    <>
      <Helmet>
        <title>User Management - Echelon Ecommerce</title>
        <meta name="description" content="Manage users and permissions" />
      </Helmet>

      <div className="admin-page admin-background">
        <div className="container">
          <div className="admin-header">
            <h1>User Management</h1>
            <p>Manage user accounts and permissions</p>
          </div>
          
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>User Management</h2>
            </div>
            <div className="admin-card-body">
              <p>User management functionality will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaBox, FaPlus, FaChartLine, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const BrandDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Products',
      value: '24',
      change: '+3 this month',
      icon: FaBox,
      color: 'green'
    },
    {
      title: 'Active Products',
      value: '18',
      change: '75% active',
      icon: FaEye,
      color: 'blue'
    },
    {
      title: 'Total Sales',
      value: '$12,456',
      change: '+15%',
      icon: FaChartLine,
      color: 'purple'
    },
    {
      title: 'Orders This Month',
      value: '89',
      change: '+12%',
      icon: FaBox,
      color: 'yellow'
    }
  ];

  const recentProducts = [
    { id: 1, name: 'Wireless Headphones', price: '$99.99', status: 'Active', sales: 45 },
    { id: 2, name: 'Smart Watch', price: '$199.99', status: 'Active', sales: 23 },
    { id: 3, name: 'Bluetooth Speaker', price: '$79.99', status: 'Draft', sales: 0 },
    { id: 4, name: 'Phone Case', price: '$29.99', status: 'Active', sales: 67 },
    { id: 5, name: 'Charging Cable', price: '$19.99', status: 'Active', sales: 89 }
  ];

  return (
    <>
      <Helmet>
        <title>Brand Dashboard - Echelon Ecommerce</title>
        <meta name="description" content="Brand owner dashboard for managing products" />
      </Helmet>

      <div className="brand-page brand-background">
        <div className="container">
          <div className="brand-header">
            <h1>Brand Dashboard</h1>
            <p>Manage your products and track performance</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span className="stat-change positive">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="brand-content-grid">
            {/* Recent Products */}
            <div className="brand-card">
              <div className="brand-card-header">
                <h2>Recent Products</h2>
                <button className="btn btn-primary btn-sm">
                  <FaPlus />
                  Add Product
                </button>
              </div>
              <div className="brand-card-body">
                <div className="products-table">
                  <div className="table-header">
                    <div className="table-cell">Product</div>
                    <div className="table-cell">Price</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Sales</div>
                    <div className="table-cell">Actions</div>
                  </div>
                  {recentProducts.map(product => (
                    <div key={product.id} className="table-row">
                      <div className="table-cell">
                        <div className="product-info">
                          <h4>{product.name}</h4>
                        </div>
                      </div>
                      <div className="table-cell">{product.price}</div>
                      <div className="table-cell">
                        <span className={`status-badge ${product.status.toLowerCase()}`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="table-cell">{product.sales}</div>
                      <div className="table-cell">
                        <div className="action-buttons">
                          <button className="action-btn action-btn-edit">
                            <FaEdit />
                          </button>
                          <button className="action-btn action-btn-delete">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="brand-card">
              <div className="brand-card-header">
                <h2>Quick Actions</h2>
                <FaBox className="card-icon" />
              </div>
              <div className="brand-card-body">
                <div className="quick-actions">
                  <button className="action-btn action-btn-primary">
                    <FaPlus />
                    Add New Product
                  </button>
                  <button className="action-btn action-btn-secondary">
                    <FaEdit />
                    Manage Inventory
                  </button>
                  <button className="action-btn action-btn-success">
                    <FaChartLine />
                    View Analytics
                  </button>
                  <button className="action-btn action-btn-warning">
                    <FaEye />
                    Preview Store
                  </button>
                </div>
              </div>
            </div>

            {/* Sales Performance */}
            <div className="brand-card">
              <div className="brand-card-header">
                <h2>Sales Performance</h2>
                <FaChartLine className="card-icon" />
              </div>
              <div className="brand-card-body">
                <div className="performance-metrics">
                  <div className="metric-item">
                    <span className="metric-label">This Month</span>
                    <span className="metric-value">$8,456</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Last Month</span>
                    <span className="metric-value">$7,234</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Growth</span>
                    <span className="metric-value positive">+16.9%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Top Product</span>
                    <span className="metric-value">Wireless Headphones</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="brand-card">
              <div className="brand-card-header">
                <h2>Inventory Alerts</h2>
                <div className="alert-indicator">3</div>
              </div>
              <div className="brand-card-body">
                <div className="alert-list">
                  <div className="alert-item alert-warning">
                    <div className="alert-content">
                      <h4>Low Stock</h4>
                      <p>Phone Case - Only 5 units left</p>
                    </div>
                  </div>
                  <div className="alert-item alert-danger">
                    <div className="alert-content">
                      <h4>Out of Stock</h4>
                      <p>Charging Cable - Restock needed</p>
                    </div>
                  </div>
                  <div className="alert-item alert-info">
                    <div className="alert-content">
                      <h4>High Demand</h4>
                      <p>Wireless Headphones - Consider increasing stock</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDashboard;

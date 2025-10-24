import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCrown, FaUsers, FaBox, FaAd, FaShoppingCart, FaFileExcel, FaDownload, FaChartLine } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalAds: 0,
    pendingOrders: 0,
    activeAds: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 1247,
        totalProducts: 89,
        totalOrders: 456,
        totalAds: 23,
        pendingOrders: 12,
        activeAds: 8
      });

      setRecentOrders([
        {
          id: 'ORD-001',
          customer: 'Ahmed Hassan',
          amount: 700,
          status: 'pending',
          date: '2024-01-15'
        },
        {
          id: 'ORD-002',
          customer: 'Fatma Ali',
          amount: 800,
          status: 'confirmed',
          date: '2024-01-14'
        },
        {
          id: 'ORD-003',
          customer: 'Mohamed Ibrahim',
          amount: 1200,
          status: 'shipped',
          date: '2024-01-13'
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleExportExcel = () => {
    // Simulate Excel export
    const data = {
      orders: recentOrders,
      stats: stats,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `echelon-orders-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <LuxuryStudyBackground>
        <div className="admin-panel">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </LuxuryStudyBackground>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - Echelon Society</title>
        <meta name="description" content="Echelon Society Admin Dashboard" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="admin-panel">
          <div className="admin-container">
            {/* Header */}
            <div className="admin-header">
              <div className="admin-title">
                <FaCrown className="admin-icon" />
                <h1>Echelon Society Admin Panel</h1>
              </div>
              <div className="admin-actions">
                <button className="btn btn-primary" onClick={handleExportExcel}>
                  <FaFileExcel />
                  Export Excel
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaBox />
                </div>
                <div className="stat-content">
                  <h3>Total Products</h3>
                  <p className="stat-number">{stats.totalProducts.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaShoppingCart />
                </div>
                <div className="stat-content">
                  <h3>Total Orders</h3>
                  <p className="stat-number">{stats.totalOrders.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaAd />
                </div>
                <div className="stat-content">
                  <h3>Total Ads</h3>
                  <p className="stat-number">{stats.totalAds.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-warning">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-content">
                    <h3>Pending Orders</h3>
                    <p className="stat-number">{stats.pendingOrders.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-success">
                  <div className="stat-icon">
                    <FaAd />
                  </div>
                  <div className="stat-content">
                    <h3>Active Ads</h3>
                    <p className="stat-number">{stats.activeAds.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="orders-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="btn btn-outline">
                  <FaDownload />
                  Export Orders
                </button>
              </div>

              <div className="orders-table">
                <div className="table-header">
                  <div className="table-cell">Order ID</div>
                  <div className="table-cell">Customer</div>
                  <div className="table-cell">Amount</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Date</div>
                  <div className="table-cell">Actions</div>
                </div>

                {recentOrders.map((order) => (
                  <div key={order.id} className="table-row">
                    <div className="table-cell">
                      <span className="order-id">{order.id}</span>
                    </div>
                    <div className="table-cell">
                      <span className="customer-name">{order.customer}</span>
                    </div>
                    <div className="table-cell">
                      <span className="amount">{order.amount} EGP</span>
                    </div>
                    <div className="table-cell">
                      <span className={`status status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="table-cell">
                      <span className="date">{order.date}</span>
                    </div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button className="btn btn-sm btn-primary">View</button>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-card">
                  <FaUsers />
                  <span>Manage Users</span>
                </button>
                <button className="action-card">
                  <FaBox />
                  <span>Manage Products</span>
                </button>
                <button className="action-card">
                  <FaAd />
                  <span>Manage Ads</span>
                </button>
                <button className="action-card">
                  <FaShoppingCart />
                  <span>Manage Orders</span>
                </button>
                <button className="action-card">
                  <FaFileExcel />
                  <span>Export Data</span>
                </button>
                <button className="action-card">
                  <FaChartLine />
                  <span>Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default AdminPanel;

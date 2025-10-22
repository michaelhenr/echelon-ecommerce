import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaUsers, FaShoppingCart, FaAd, FaChartLine, FaDollarSign, FaEye } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: FaUsers,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '5,678',
      change: '+8%',
      icon: FaShoppingCart,
      color: 'green'
    },
    {
      title: 'Active Ads',
      value: '89',
      change: '+15%',
      icon: FaAd,
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+23%',
      icon: FaDollarSign,
      color: 'yellow'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago' },
    { id: 2, action: 'Order completed', user: 'Order #1234', time: '5 minutes ago' },
    { id: 3, action: 'Ad approved', user: 'Summer Sale Campaign', time: '10 minutes ago' },
    { id: 4, action: 'Product added', user: 'Wireless Headphones', time: '15 minutes ago' },
    { id: 5, action: 'User banned', user: 'spam.user@example.com', time: '20 minutes ago' }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Echelon Ecommerce</title>
        <meta name="description" content="Admin dashboard for managing the Echelon Ecommerce platform" />
      </Helmet>

      <div className="admin-page admin-background">
        <div className="container">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.username}</p>
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
          <div className="admin-content-grid">
            {/* Recent Activities */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Recent Activities</h2>
                <FaEye className="card-icon" />
              </div>
              <div className="admin-card-body">
                <div className="activity-list">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-content">
                        <h4>{activity.action}</h4>
                        <p>{activity.user}</p>
                      </div>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Quick Actions</h2>
                <FaChartLine className="card-icon" />
              </div>
              <div className="admin-card-body">
                <div className="quick-actions">
                  <button className="action-btn action-btn-primary">
                    <FaUsers />
                    Manage Users
                  </button>
                  <button className="action-btn action-btn-secondary">
                    <FaShoppingCart />
                    View Orders
                  </button>
                  <button className="action-btn action-btn-success">
                    <FaAd />
                    Approve Ads
                  </button>
                  <button className="action-btn action-btn-warning">
                    <FaChartLine />
                    View Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>System Status</h2>
                <div className="status-indicator online"></div>
              </div>
              <div className="admin-card-body">
                <div className="status-list">
                  <div className="status-item">
                    <span className="status-label">Database</span>
                    <span className="status-value online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">API Server</span>
                    <span className="status-value online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Payment Gateway</span>
                    <span className="status-value online">Online</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Email Service</span>
                    <span className="status-value online">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>Performance Metrics</h2>
                <FaChartLine className="card-icon" />
              </div>
              <div className="admin-card-body">
                <div className="metrics-list">
                  <div className="metric-item">
                    <span className="metric-label">Response Time</span>
                    <span className="metric-value">1.2s</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Uptime</span>
                    <span className="metric-value">99.9%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Active Sessions</span>
                    <span className="metric-value">234</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Memory Usage</span>
                    <span className="metric-value">67%</span>
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

export default AdminDashboard;

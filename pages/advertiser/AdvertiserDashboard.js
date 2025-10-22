import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaAd, FaPlus, FaChartLine, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const AdvertiserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Ads',
      value: '12',
      change: '+2 this week',
      icon: FaAd,
      color: 'blue'
    },
    {
      title: 'Total Views',
      value: '45,678',
      change: '+18%',
      icon: FaEye,
      color: 'green'
    },
    {
      title: 'Click Rate',
      value: '3.2%',
      change: '+0.5%',
      icon: FaChartLine,
      color: 'purple'
    },
    {
      title: 'Total Spent',
      value: '$2,456',
      change: '+12%',
      icon: FaAd,
      color: 'yellow'
    }
  ];

  const recentAds = [
    { id: 1, title: 'Summer Sale Campaign', type: 'Banner', status: 'Active', budget: '$500', views: 12345 },
    { id: 2, title: 'New Product Launch', type: 'Video', status: 'Pending', budget: '$800', views: 0 },
    { id: 3, title: 'Holiday Special', type: 'Popup', status: 'Active', budget: '$300', views: 8765 },
    { id: 4, title: 'Brand Awareness', type: 'Sidebar', status: 'Rejected', budget: '$600', views: 0 },
    { id: 5, title: 'Flash Sale', type: 'Banner', status: 'Active', budget: '$200', views: 15432 }
  ];

  return (
    <>
      <Helmet>
        <title>Advertiser Dashboard - Echelon Ecommerce</title>
        <meta name="description" content="Advertiser dashboard for managing campaigns" />
      </Helmet>

      <div className="advertiser-page advertiser-background">
        <div className="container">
          <div className="advertiser-header">
            <h1>Advertiser Dashboard</h1>
            <p>Manage your advertising campaigns and track performance</p>
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
          <div className="advertiser-content-grid">
            {/* Recent Ads */}
            <div className="advertiser-card">
              <div className="advertiser-card-header">
                <h2>Recent Campaigns</h2>
                <button className="btn btn-primary btn-sm">
                  <FaPlus />
                  Create Ad
                </button>
              </div>
              <div className="advertiser-card-body">
                <div className="ads-table">
                  <div className="table-header">
                    <div className="table-cell">Campaign</div>
                    <div className="table-cell">Type</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Budget</div>
                    <div className="table-cell">Views</div>
                    <div className="table-cell">Actions</div>
                  </div>
                  {recentAds.map(ad => (
                    <div key={ad.id} className="table-row">
                      <div className="table-cell">
                        <div className="ad-info">
                          <h4>{ad.title}</h4>
                        </div>
                      </div>
                      <div className="table-cell">{ad.type}</div>
                      <div className="table-cell">
                        <span className={`status-badge ${ad.status.toLowerCase()}`}>
                          {ad.status}
                        </span>
                      </div>
                      <div className="table-cell">{ad.budget}</div>
                      <div className="table-cell">{ad.views.toLocaleString()}</div>
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
            <div className="advertiser-card">
              <div className="advertiser-card-header">
                <h2>Quick Actions</h2>
                <FaAd className="card-icon" />
              </div>
              <div className="advertiser-card-body">
                <div className="quick-actions">
                  <button className="action-btn action-btn-primary">
                    <FaPlus />
                    Create New Ad
                  </button>
                  <button className="action-btn action-btn-secondary">
                    <FaEdit />
                    Manage Campaigns
                  </button>
                  <button className="action-btn action-btn-success">
                    <FaChartLine />
                    View Analytics
                  </button>
                  <button className="action-btn action-btn-warning">
                    <FaEye />
                    Preview Ads
                  </button>
                </div>
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="advertiser-card">
              <div className="advertiser-card-header">
                <h2>Campaign Performance</h2>
                <FaChartLine className="card-icon" />
              </div>
              <div className="advertiser-card-body">
                <div className="performance-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Impressions</span>
                    <span className="metric-value">45,678</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Clicks</span>
                    <span className="metric-value">1,462</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">CTR</span>
                    <span className="metric-value">3.2%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">CPC</span>
                    <span className="metric-value">$1.68</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="advertiser-card">
              <div className="advertiser-card-header">
                <h2>Pending Approvals</h2>
                <div className="alert-indicator">2</div>
              </div>
              <div className="advertiser-card-body">
                <div className="approval-list">
                  <div className="approval-item">
                    <div className="approval-content">
                      <h4>New Product Launch</h4>
                      <p>Video Ad - $800 budget</p>
                      <span className="approval-status pending">Pending Review</span>
                    </div>
                    <div className="approval-actions">
                      <button className="action-btn action-btn-success">
                        <FaCheck />
                      </button>
                      <button className="action-btn action-btn-danger">
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  <div className="approval-item">
                    <div className="approval-content">
                      <h4>Brand Awareness</h4>
                      <p>Sidebar Ad - $600 budget</p>
                      <span className="approval-status rejected">Rejected - Needs revision</span>
                    </div>
                    <div className="approval-actions">
                      <button className="action-btn action-btn-primary">
                        <FaEdit />
                      </button>
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

export default AdvertiserDashboard;

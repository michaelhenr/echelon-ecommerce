import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaClock, FaTruck, FaBox } from 'react-icons/fa';

const OrderHistory = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      status: 'delivered',
      total: 172.77,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Phone Case', quantity: 2, price: 29.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      status: 'shipped',
      total: 89.99,
      items: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2025-01-05',
      status: 'pending',
      total: 45.99,
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return <FaBox className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'pending':
        return 'Processing';
      default:
        return status;
    }
  };

  return (
    <>
      <Helmet>
        <title>Order History - Echelon Ecommerce</title>
        <meta name="description" content="View your order history" />
      </Helmet>

      <div className="orders-page products-background">
        <div className="container">
          <div className="orders-header">
            <h1>Order History</h1>
            <p>Track your orders and view order details</p>
          </div>

          <div className="orders-content">
            {orders.length === 0 ? (
              <div className="empty-orders">
                <FaBox className="empty-orders-icon" />
                <h2>No orders yet</h2>
                <p>Start shopping to see your orders here!</p>
                <a href="/products" className="btn btn-primary">
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
                        <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="order-status">
                        {getStatusIcon(order.status)}
                        <span className={`status-text ${order.status}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                          <span className="item-price">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total: ${order.total.toFixed(2)}</span>
                      </div>
                      <div className="order-actions">
                        <button className="btn btn-outline btn-sm">
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="btn btn-primary btn-sm">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;

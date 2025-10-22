  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/users').then(response => setUsers(response.data));
      axios.get('http://localhost:5000/api/transactions').then(response => setTransactions(response.data));
    }, []);

    const approveTransaction = async (id) => {
      try {
        await axios.put(`http://localhost:5000/api/transactions/${id}`, { status: 'approved' });
      } catch (error) {
        console.error('Approval failed:', error);
      }
    };

    return (
      <div>
        <h2>Admin Dashboard</h2>
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username} - <button>Manage</button></li>
          ))}
        </ul>
        <h3>Transactions</h3>
        <ul>
          {transactions.map(tx => (
            <li key={tx.id}>{tx.details} - <button onClick={() => approveTransaction(tx.id)}>Approve</button></li>
          ))}
        </ul>
      </div>
    );
  }

  export default AdminDashboard;
  
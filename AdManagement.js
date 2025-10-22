  import React, { useState } from 'react';
  import axios from 'axios';

  function AdManagement() {
    const [ad, setAd] = useState({ title: '', content: '', schedule: '' });

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/ads', ad);
        console.log('Ad uploaded:', response.data);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };

    return (
      <div>
        <h2>Manage Ads</h2>
        <input placeholder="Ad Title" onChange={(e) => setAd({ ...ad, title: e.target.value })} />
        <input placeholder="Content" onChange={(e) => setAd({ ...ad, content: e.target.value })} />
        <input placeholder="Schedule (e.g., date)" onChange={(e) => setAd({ ...ad, schedule: e.target.value })} />
        <button onClick={handleSubmit}>Upload Ad</button>
      </div>
    );
  }

  export default AdManagement;
  
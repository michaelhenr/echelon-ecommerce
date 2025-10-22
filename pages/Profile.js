import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { MinimalistBackground } from '../components/Backgrounds';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    phone: user?.profile?.phone || '',
    address: {
      street: user?.profile?.address?.street || '',
      city: user?.profile?.address?.city || '',
      state: user?.profile?.address?.state || '',
      zipCode: user?.profile?.address?.zipCode || '',
      country: user?.profile?.address?.country || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile - Echelon Ecommerce</title>
        <meta name="description" content="Manage your profile information" />
      </Helmet>

      <div className="profile-page profile-background">
        <div className="container">
          <div className="profile-header">
            <h1>My Profile</h1>
            <p>Manage your account information and preferences</p>
          </div>

          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-card-header">
                <h2>Personal Information</h2>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaEdit />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="profile-card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address.street">Street Address</label>
                      <input
                        type="text"
                        id="address.street"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="address.city">City</label>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address.state">State</label>
                        <input
                          type="text"
                          id="address.state"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="address.zipCode">ZIP Code</label>
                        <input
                          type="text"
                          id="address.zipCode"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address.country">Country</label>
                        <input
                          type="text"
                          id="address.country"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info">
                    <div className="info-item">
                      <FaUser className="info-icon" />
                      <div className="info-content">
                        <label>Name</label>
                        <span>{formData.firstName} {formData.lastName}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FaEnvelope className="info-icon" />
                      <div className="info-content">
                        <label>Email</label>
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FaUser className="info-icon" />
                      <div className="info-content">
                        <label>Username</label>
                        <span>{user.username}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FaUser className="info-icon" />
                      <div className="info-content">
                        <label>Role</label>
                        <span className="role-badge">{user.role}</span>
                      </div>
                    </div>

                    {formData.phone && (
                      <div className="info-item">
                        <FaPhone className="info-icon" />
                        <div className="info-content">
                          <label>Phone</label>
                          <span>{formData.phone}</span>
                        </div>
                      </div>
                    )}

                    {(formData.address.street || formData.address.city) && (
                      <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <div className="info-content">
                          <label>Address</label>
                          <span>
                            {formData.address.street && `${formData.address.street}, `}
                            {formData.address.city && `${formData.address.city}, `}
                            {formData.address.state && `${formData.address.state} `}
                            {formData.address.zipCode && formData.address.zipCode}
                            {formData.address.country && `, ${formData.address.country}`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-header">
                <h2>Account Status</h2>
              </div>
              <div className="profile-card-body">
                <div className="status-grid">
                  <div className="status-item">
                    <label>Account Status</label>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="status-item">
                    <label>Approval Status</label>
                    <span className={`status-badge ${user.isApproved ? 'approved' : 'pending'}`}>
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="status-item">
                    <label>Member Since</label>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </MinimalistBackground>
    </>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { updateUser } from '../../services/api';
import { toast } from 'react-toastify';

const indianFirstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", 
  "Reyansh", "Ayaan", "Divya", "Neha", "Ananya", 
  "Diya", "Saanvi", "Rajesh", "Sunil", "Vikram"
];

const indianLastNames = [
  "Sharma", "Patel", "Singh", "Kumar", "Gupta", 
  "Verma", "Joshi", "Rao", "Malhotra", "Reddy", 
  "Kapoor", "Agarwal", "Shah", "Mehta", "Chopra"
];


const UserEditModal = ({
  user,
  show,
  onClose,
  onUpdateSuccess
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await updateUser(user.id, {
        first_name: firstName,
        last_name: lastName,
        email: email
      });

      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName,
        email: email
      };

      onUpdateSuccess(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const selectName = (name, type) => {
    if (type === 'first') {
      setFirstName(name);
    } else {
      setLastName(name);
    }
    setShowSuggestions(false);
  };

  const showNameSuggestions = (type) => {
    setSuggestionType(type);
    setShowSuggestions(true);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 15, 15, 0.9)', // Dark background
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#1e1e2f', // Dark modal background
        color: '#f5f5f5', // Light text
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
      }}>
        <h2 style={{ color: '#87CEEB', marginBottom: '15px' }}>Edit User</h2>
        <p style={{ marginBottom: '15px', fontSize: '14px', color: '#aaa' }}>
          Note: Changes are client-side only and won't persist on the server.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#2e2e3f',
                  color: '#f5f5f5'
                }}
              />
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '2px 8px',
                  fontSize: '12px',
                  backgroundColor: '#87CEEB', // Changed to sky blue
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => showNameSuggestions('first')}
              >
                Suggestions
              </button>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#2e2e3f',
                  color: '#f5f5f5'
                }}
              />
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '2px 8px',
                  fontSize: '12px',
                  backgroundColor: '#87CEEB', // Changed to sky blue
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => showNameSuggestions('last')}
              >
                Suggestions
              </button>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #444',
                backgroundColor: '#2e2e3f',
                color: '#f5f5f5'
              }}
            />
          </div>

          {showSuggestions && (
            <div className="suggestions-container" style={{
              marginBottom: '15px',
              border: '1px solid #444',
              padding: '10px',
              borderRadius: '6px',
              backgroundColor: '#2e2e3f',
              color: '#f5f5f5',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#87CEEB' }}>
                Select a {suggestionType === 'first' ? 'first' : 'last'} name:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {(suggestionType === 'first' ? indianFirstNames : indianLastNames).map((name, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-sm"
                    style={{
                      margin: '3px',
                      padding: '3px 8px',
                      fontSize: '12px',
                      backgroundColor: '#444',
                      color: '#f5f5f5',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => selectName(name, suggestionType === 'first' ? 'first' : 'last')}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn"
              onClick={onClose}
              style={{
                marginRight: '10px',
                marginBottom: '10px',
                backgroundColor: '#444',
                color: '#f5f5f5',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                backgroundColor: '#87CEEB', // Changed to sky blue
                color: '#000',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
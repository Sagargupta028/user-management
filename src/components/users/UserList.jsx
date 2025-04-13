import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUsers, deleteUser } from '../../services/api';
import UserEditModal from './UserEditModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleUpdateSuccess = (updatedUser) => {
    setShowEditModal(false);
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    toast.success('User updated successfully');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container"
      style={{
        backgroundColor: '#121212',
        color: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          color: '#87CEEB', // Changed to sky blue
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '28px',
          fontWeight: 'bold',
        }}
      >
        User Management
      </h1>

      <div
        className="search-bar"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#1e1e2f',
            color: '#f5f5f5',
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>Loading users...</p>
      ) : (
        <div
          className="user-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-card"
              style={{
                backgroundColor: '#1e1e2f',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={user.avatar}
                alt={`${user.first_name}'s avatar`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginBottom: '10px',
                  border: '2px solid #444',
                }}
              />
              <h3 style={{ margin: '10px 0', color: '#87CEEB' }}>
                {user.first_name} {user.last_name}
              </h3>
              <p style={{ margin: '5px 0', color: '#aaa' }}>{user.email}</p>
              <div
                className="action-buttons"
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    backgroundColor: '#87CEEB', // Changed to sky blue
                    color: '#fff',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    backgroundColor: '#6CA6CD', // Slightly darker sky blue
                    color: '#fff',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="pagination"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#444',
            color: '#f5f5f5',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              backgroundColor: currentPage === page ? '#87CEEB' : '#444', // Sky blue for active page
              color: '#fff',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: '#444',
            color: '#f5f5f5',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default UserList;
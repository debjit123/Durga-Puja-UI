import React from 'react';

function Header() {
  const styles = {
    header: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2rem',
      margin: 0,
    },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Durga Puja Expense Tracker</h1>
    </header>
  );
}

export default Header;
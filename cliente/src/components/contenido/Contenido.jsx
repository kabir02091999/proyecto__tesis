import React, { useState } from 'react';
import CarruselConfig from './CarruselConfig';
import MainConfig from './MainConfig';

const tabs = {
  compA: { component: <MainConfig />, label: 'Principal' },
  compB: { component: <CarruselConfig />, label: 'Historias' },
};

const ContenidoConfig = () => {
  const [activeTab, setActiveTab] = useState('compA');
  const CurrentComponent = tabs[activeTab].component;

  return (
    // Outer container takes full available space (100% of parent)
    <div style={styles.container}>
      {/* App wrapper for layout control */}
      <div style={styles.appWrapper}>
        
        {/* Title Section */}
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            Configuración de Contenido
          </h1>
        </header>

        {/* Top Tabs Navigation */}
        <nav style={styles.tabNav}>
          {Object.entries(tabs).map(([key, tab]) => (
            <button 
              key={key}
              style={activeTab === key ? styles.activeTabButton : styles.tabButton}
              onClick={() => setActiveTab(key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        {/* Content Area */}
        <main style={styles.contentArea}>
          {CurrentComponent}
        </main>
      </div>
    </div>
  );
};

// --- Updated Styles Object for Full-Screen, Top-Tab Layout ---

const styles = {
  // 1. Full available width and height (not viewport specific)
  container: {
    alignItems: 'center',
    width: '100%', // Updated to 100%
    backgroundColor: '#f0f4f8', 
    padding: '0', 
    fontFamily: 'Inter, sans-serif'
  },
  
  // 2. Main application wrapper, taking maximum space
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    maxWidth: '1200px', // Max width for desktop readability
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
  },

  // Title styles
  pageHeader: {
    padding: '25px 30px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fcfcfc',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0',
  },

  // Top navigation bar (replaces sidebar)
  tabNav: {
    display: 'flex',
    borderBottom: '2px solid #3498db',
    backgroundColor: '#ecf0f1',
    flexShrink: 0, // Prevent nav from shrinking
  },
  tabButton: {
    padding: '15px 25px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#7f8c8d',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    borderRight: '1px solid #e0e0e0',
    flexGrow: 1, // Spread buttons evenly
    maxWidth: '33.33%', // Ensure they don't grow infinitely
  },
  activeTabButton: {
    padding: '15px 25px',
    border: 'none',
    backgroundColor: 'white',
    color: '#3498db',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    borderBottom: '2px solid white', 
    position: 'relative',
    top: '2px', 
    boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
    zIndex: 10,
    flexGrow: 1,
    maxWidth: '33.33%',
    minWidth: '100px',
  },

  // Content area (takes remaining vertical space)
  contentArea: {
    flex: 1, 
    padding: '30px',
  },

  // Individual Tab Content styles
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom:'1rem',

  },
  title: {
    marginBottom: '30px',
    color: '#2c3e50',
    fontSize: '24px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box', // FIX: Ensures padding is included within the 100% width
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box', // FIX: Ensures padding is included within the 100% width
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: 'white',
    appearance: 'none', // Better look for select boxes
    transition: 'border-color 0.3s',
    boxSizing: 'border-box', // FIX: Ensures padding is included within the 100% width
  },
  saveButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    marginTop: '30px',
    alignSelf: 'flex-start',
    boxShadow: '0 4px 10px rgba(52, 152, 219, 0.4)',
    transition: 'background-color 0.3s, box-shadow 0.3s'
  }
};

export default ContenidoConfig;

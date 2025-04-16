import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your pages
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Budget from '../pages/Budget';
import Reports from '../pages/Reports';
import Goals from '../pages/Goals';
import Investments from '../pages/Investments';
import Calendar from '../pages/Calendar';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
      {/* Add a catch-all route for 404 */}
      <Route path="*" element={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <h1>404 - Page Not Found</h1>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes; 
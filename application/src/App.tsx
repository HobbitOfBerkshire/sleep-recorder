import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import RecordsPage from './pages/Records';
import AddRecordPage from './pages/AddRecord';
import Navbar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/records" replace />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/form" element={<AddRecordPage />} />
      </Routes>
    </Router>
  );
};

export default App;

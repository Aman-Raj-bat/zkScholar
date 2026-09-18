import { Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import VerifyPage from './pages/VerifyPage';
import DashboardPage from './pages/DashboardPage';
export default function App() {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<VerifyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </WalletProvider>
  );
}

import { useState } from 'react';
import Login from './pages/Login';
import NakesLayout from './pages/nakes/NakesLayout';
import AdminLayout from './pages/admin/AdminLayout';
import DinkesLayout from './pages/dinkes/DinkesLayout';
import { ROLES } from './data/dummyData';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === ROLES.NAKES) {
    return <NakesLayout user={currentUser} onLogout={handleLogout} />;
  }
  if (currentUser.role === ROLES.ADMIN_FASKES) {
    return <AdminLayout user={currentUser} onLogout={handleLogout} />;
  }
  if (currentUser.role === ROLES.DINKES) {
    return <DinkesLayout user={currentUser} onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
}

export default App;

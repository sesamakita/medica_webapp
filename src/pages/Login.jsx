import { useState } from 'react';
import { Stethoscope, Building2, BarChart3, ArrowRight, Shield, HeartPulse } from 'lucide-react';
import { DEMO_USERS, ROLES } from '../data/dummyData';

const roles = [
  {
    key: ROLES.NAKES,
    label: 'Tenaga Kesehatan',
    sub: 'Dokter, Bidan, Perawat',
    icon: <Stethoscope size={22} color="white" />,
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)',
    user: DEMO_USERS.nakes,
  },
  {
    key: ROLES.ADMIN_FASKES,
    label: 'Admin Faskes',
    sub: 'Puskesmas / RSUD',
    icon: <Building2 size={22} color="white" />,
    color: '#10b981',
    bg: 'linear-gradient(135deg,#10b981,#059669)',
    user: DEMO_USERS.admin_faskes,
  },
  {
    key: ROLES.DINKES,
    label: 'Staf Dinkes',
    sub: 'Dinas Kesehatan Kab.',
    icon: <BarChart3 size={22} color="white" />,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
    user: DEMO_USERS.dinkes,
  },
];

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!selectedRole) { setError('Pilih role terlebih dahulu.'); return; }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedRole.user);
    }, 1200);
  };

  return (
    <div className="login-page" style={{ background: '#f8fafc' }}>
      {/* Subtle BG Glows for Light Theme */}
      <div className="login-bg-glow" style={{ width: 600, height: 600, background: '#0ea5e9', top: -200, left: -150, opacity: 0.05 }} />
      <div className="login-bg-glow" style={{ width: 500, height: 500, background: '#8b5cf6', bottom: -150, right: -100, opacity: 0.05 }} />

      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1, padding: '20px' }}>

        {/* LEFT BRANDING - NOW DARK TEXT */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(14,165,233,0.2)' }}>
              <HeartPulse size={28} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>Medica WebApp</h1>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2, fontWeight: 600 }}>Portal Kesehatan Terpadu</p>
            </div>
          </div>

          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
            Efisiensi Layanan<br />
            <span style={{ color: '#0ea5e9' }}>Kesehatan Digital</span>
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 32, fontSize: '0.95rem' }}>
            Transformasi pelayanan kesehatan daerah dengan sistem informasi yang terintegrasi antara Nakes, Faskes, dan Dinas Kesehatan.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: <Shield size={18} />, text: 'Standar Keamanan Data Medis Nasional' },
              { icon: <HeartPulse size={18} />, text: 'Sinkronisasi Data Real-time Antar Unit' },
              { icon: <BarChart3 size={18} />, text: 'Analitik Pelayanan untuk Kebijakan Tepat' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#1e293b', fontSize: '0.85rem', fontWeight: 600 }}>
                <div style={{ color: '#0ea5e9' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="login-card" style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', borderRadius: '24px', padding: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Masuk Portal</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 28 }}>Pilih akses peran Anda dibawah ini</p>

          {/* ROLE SELECTOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {roles.map(r => (
              <div
                key={r.key}
                className={`role-card ${selectedRole?.key === r.key ? 'selected' : ''}`}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', padding: '14px',
                  background: selectedRole?.key === r.key ? '#f0f9ff' : 'white',
                  borderColor: selectedRole?.key === r.key ? '#0ea5e9' : '#e2e8f0',
                  borderRadius: '16px', border: '2px solid'
                }}
                onClick={() => { setSelectedRole(r); setError(''); }}
              >
                <div className="role-card-icon" style={{ background: r.bg, margin: 0, flexShrink: 0, borderRadius: '12px' }}>
                  {r.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{r.label}</h4>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{r.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 700 }}>USERNAME / ID</label>
            <input
              className="form-input"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
              placeholder={selectedRole ? `ID: ${selectedRole.user.id}` : 'Pilih peran'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={!selectedRole}
            />
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: 12, fontWeight: 600 }}>{error}</p>}

          <button
            className="btn btn-primary w-full"
            style={{ justifyContent: 'center', padding: '14px', fontSize: '0.9rem', borderRadius: '14px', background: '#0ea5e9' }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </button>

          <p style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center', marginTop: 20 }}>
            Sistem Informasi Kesehatan Daerah Terintegrasi
          </p>
        </div>
      </div>
    </div>
  );
}

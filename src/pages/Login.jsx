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
    <div className="login-page">
      {/* BG Glows */}
      <div className="login-bg-glow" style={{ width: 500, height: 500, background: '#0ea5e9', top: -150, left: -100 }} />
      <div className="login-bg-glow" style={{ width: 400, height: 400, background: '#8b5cf6', bottom: -100, right: -80 }} />

      <div style={{ width: '100%', maxWidth: 940, display: 'flex', gap: 40, alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* LEFT HERO */}
        <div style={{ flex: 1, display: 'none' }}>
        </div>

        {/* LEFT BRANDING */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(14,165,233,0.3)' }}>
              <HeartPulse size={30} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>Medica WebApp</h1>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>Portal Kesehatan Daerah Terintegrasi</p>
            </div>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>
            Satu Platform<br />
            <span style={{ background: 'linear-gradient(90deg,#0ea5e9,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Semua Pemangku Kepentingan
            </span>
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 28, fontSize: '0.9rem' }}>
            Platform digital terintegrasi untuk Tenaga Kesehatan, Admin Fasilitas Kesehatan, dan Dinas Kesehatan Kabupaten dalam satu ekosistem yang terhubung.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: <Shield size={16} />, text: 'Data terenkripsi & aman sesuai standar BPJS' },
              { icon: <HeartPulse size={16} />, text: 'Real-time update antrean, kamar & stok obat' },
              { icon: <BarChart3 size={16} />, text: 'Dashboard analytics untuk pengambilan kebijakan' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.82rem' }}>
                <div style={{ color: '#0ea5e9' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="login-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 6 }}>Masuk ke Portal</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 24 }}>Pilih peran Anda untuk melanjutkan</p>

          {/* ROLE SELECTOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {roles.map(r => (
              <div
                key={r.key}
                className={`role-card ${selectedRole?.key === r.key ? 'selected' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', padding: '14px 16px' }}
                onClick={() => { setSelectedRole(r); setError(''); }}
              >
                <div className="role-card-icon" style={{ background: r.bg, margin: 0, flexShrink: 0 }}>
                  {r.icon}
                </div>
                <div>
                  <h4>{r.label}</h4>
                  <span>{r.sub}</span>
                </div>
                {selectedRole?.key === r.key && (
                  <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="form-group">
            <label className="form-label">Username / NIP / SIP</label>
            <input
              className="form-input"
              placeholder={selectedRole ? `Contoh: ${selectedRole.user.id}` : 'Pilih role dulu'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={!selectedRole}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={!selectedRole}
            />
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.78rem', marginBottom: 12 }}>{error}</p>}

          <button
            className="btn btn-primary w-full"
            style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem', marginTop: 4 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span style={{ opacity: 0.8 }}>Memverifikasi...</span>
            ) : (
              <><span>Masuk ke Dashboard</span><ArrowRight size={18} /></>
            )}
          </button>

          <p style={{ fontSize: '0.72rem', color: '#475569', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
            Demo portofolio — gunakan tombol login untuk mengeksplorasi<br />setiap dashboard tanpa perlu password.
          </p>
        </div>
      </div>
    </div>
  );
}

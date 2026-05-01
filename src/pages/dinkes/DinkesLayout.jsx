import { useState } from 'react';
import { LayoutDashboard, TrendingUp, Users, MessageSquare, LogOut, Bell, HeartPulse, ChevronRight, Map, Megaphone, Star } from 'lucide-react';
import DinkesDashboard from './DinkesDashboard';
import AnalitikStunting from './AnalitikStunting';
import VerifikasiSIP from './VerifikasiSIP';
import PantauPengaduan from './PantauPengaduan';
import PetaGIS from './PetaGIS';
import BroadcastInfo from './BroadcastInfo';
import KinerjaFaskes from './KinerjaFaskes';

const navItems = [
  { key: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { key: 'gis', label: 'Peta GIS Kesehatan', icon: Map },
  { key: 'stunting', label: 'Analitik Stunting', icon: TrendingUp },
  { key: 'kinerja', label: 'Kinerja Faskes', icon: Star },
  { key: 'sip', label: 'Verifikasi SIP Nakes', icon: Users, badge: 8 },
  { key: 'pengaduan', label: 'Pantau Pengaduan', icon: MessageSquare, badge: 4 },
  { key: 'broadcast', label: 'Broadcast Info', icon: Megaphone },
];

const pageTitles = {
  dashboard: { title: 'Executive Dashboard', sub: 'Monitoring kesehatan kabupaten' },
  gis: { title: 'Peta GIS Terintegrasi', sub: 'Visualisasi sebaran fasilitas dan status kesehatan' },
  stunting: { title: 'Analitik Stunting', sub: 'Distribusi & tren stunting per kecamatan' },
  kinerja: { title: 'Analisis Kinerja Faskes', sub: 'Ranking dan performa fasilitas kesehatan' },
  sip: { title: 'Verifikasi SIP Nakes', sub: 'Approval izin praktik tenaga kesehatan' },
  pengaduan: { title: 'Pantau Pengaduan', sub: 'Keluhan masyarakat terkait layanan kesehatan' },
  broadcast: { title: 'Broadcast Pengumuman', sub: 'Kirim instruksi ke seluruh faskes kabupaten' },
};

export default function DinkesLayout({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DinkesDashboard user={user} navigateTo={setActivePage} />;
      case 'gis': return <PetaGIS />;
      case 'stunting': return <AnalitikStunting />;
      case 'kinerja': return <KinerjaFaskes />;
      case 'sip': return <VerifikasiSIP />;
      case 'pengaduan': return <PantauPengaduan />;
      case 'broadcast': return <BroadcastInfo />;
      default: return <DinkesDashboard user={user} navigateTo={setActivePage} />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-inner">
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }}>
              <HeartPulse size={22} color="white" />
            </div>
            <div className="logo-text">
              <strong>Medica WebApp</strong>
              <span>Portal Dinas Kesehatan</span>
            </div>
          </div>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-card">
            <div className="user-avatar" style={{ background: user.avatarColor }}>{user.avatar}</div>
            <div className="user-meta">
              <strong>{user.nama.split(',')[0]}</strong>
              <span>{user.profesi}</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu Dinkes</div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.key} className={`nav-item ${activePage === item.key ? 'active' : ''}`} onClick={() => setActivePage(item.key)}>
                <Icon size={17} className="nav-icon" />
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}><LogOut size={16} /> Keluar</button>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h2>{pageTitles[activePage]?.title}</h2>
            <p>{pageTitles[activePage]?.sub}</p>
          </div>
          <div className="header-actions">
            <div className="header-badge-btn"><Bell size={17} /><span className="notif-dot" /></div>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:10, padding:'6px 12px', cursor:'pointer' }} onClick={onLogout}>
              <div style={{ width:28,height:28,borderRadius:8,background:user.avatarColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:800,color:'white' }}>{user.avatar}</div>
              <span style={{ fontSize:'0.78rem', fontWeight:600, color:'var(--text-secondary)' }}>Dinkes Kabupaten</span>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          </div>
        </header>
        <main className="page-body">{renderPage()}</main>
      </div>
    </div>
  );
}

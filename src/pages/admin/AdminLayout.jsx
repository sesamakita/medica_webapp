import { useState } from 'react';
import { LayoutDashboard, Bed, Package, Users, LogOut, Bell, HeartPulse, ChevronRight, Calendar, FileBarChart } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import KamarManagement from './KamarManagement';
import StokObat from './StokObat';
import ManajemenNakes from './ManajemenNakes';
import JadwalJaga from './JadwalJaga';
import LaporanBulanan from './LaporanBulanan';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'kamar', label: 'Ketersediaan Kamar', icon: Bed },
  { key: 'stok', label: 'Stok Obat Apotek', icon: Package, badge: 3 },
  { key: 'nakes', label: 'Data Nakes Unit', icon: Users },
  { key: 'jaga', label: 'Jadwal Jaga Shift', icon: Calendar },
  { key: 'laporan', label: 'Laporan Bulanan', icon: FileBarChart },
];

const pageTitles = {
  dashboard: { title: 'Dashboard Admin Faskes', sub: 'Operasional harian fasilitas kesehatan' },
  kamar: { title: 'Manajemen Kamar', sub: 'Update ketersediaan kamar rawat inap' },
  stok: { title: 'Stok Obat & Farmasi', sub: 'Pantau dan update stok obat apotek' },
  nakes: { title: 'Data Tenaga Kesehatan', sub: 'Nakes aktif di unit Anda' },
  jaga: { title: 'Manajemen Jadwal Jaga', sub: 'Atur shift nakes unit pelayanan' },
  laporan: { title: 'Laporan & Statistik', sub: 'Rekapitulasi data kunjungan dan pelayanan' },
};

export default function AdminLayout({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <AdminDashboard user={user} navigateTo={setActivePage} />;
      case 'kamar': return <KamarManagement />;
      case 'stok': return <StokObat />;
      case 'nakes': return <ManajemenNakes />;
      case 'jaga': return <JadwalJaga />;
      case 'laporan': return <LaporanBulanan />;
      default: return <AdminDashboard user={user} navigateTo={setActivePage} />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-inner">
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <HeartPulse size={22} color="white" />
            </div>
            <div className="logo-text">
              <strong>Medica WebApp</strong>
              <span>Portal Admin Faskes</span>
            </div>
          </div>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-card">
            <div className="user-avatar" style={{ background: user.avatarColor }}>{user.avatar}</div>
            <div className="user-meta">
              <strong>{user.nama.split(',')[0]}</strong>
              <span>{user.profesi} · {user.unit}</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu Admin</div>
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
              <span style={{ fontSize:'0.78rem', fontWeight:600, color:'var(--text-secondary)' }}>{user.unit}</span>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          </div>
        </header>
        <main className="page-body">{renderPage()}</main>
      </div>
    </div>
  );
}

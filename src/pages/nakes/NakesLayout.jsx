import { useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Users, ClipboardList,
  MessageSquare, LogOut, Bell, HeartPulse, ChevronRight,
  FileText, Activity, UserCheck
} from 'lucide-react';
import NakesDashboard from './NakesDashboard';
import InputJadwal from './InputJadwal';
import InputStunting from './InputStunting';
import AntreanManagement from './AntreanManagement';
import RiwayatPasien from './RiwayatPasien';
import ResepDigital from './ResepDigital';
import SoapNote from './SoapNote';
import ANCMonitoring from './ANCMonitoring';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'antrean', label: 'Antrean Hari Ini', icon: Users, badge: 7 },
  { key: 'soap', label: 'SOAP Note', icon: FileText },
  { key: 'resep', label: 'Resep Digital', icon: Activity },
  { key: 'anc', label: 'Monitoring ANC', icon: UserCheck },
  { key: 'jadwal', label: 'Jadwal Praktik', icon: CalendarDays },
  { key: 'stunting', label: 'Input Stunting', icon: ClipboardList },
  { key: 'riwayat', label: 'Riwayat Pasien', icon: MessageSquare },
];

const pageTitles = {
  dashboard: { title: 'Dashboard Nakes', sub: 'Ringkasan aktivitas harian' },
  antrean: { title: 'Manajemen Antrean', sub: 'Panggil & kelola pasien hari ini' },
  soap: { title: 'SOAP Note Digital', sub: 'Rekam medis subjektif, objektif, assesment, plan' },
  resep: { title: 'Resep Digital', sub: 'Buat dan cetak resep pasien' },
  anc: { title: 'Monitoring ANC', sub: 'Pantau kunjungan ibu hamil K1–K6' },
  jadwal: { title: 'Jadwal Praktik', sub: 'Input & update jadwal poli Anda' },
  stunting: { title: 'Input Data Stunting', sub: 'Rekam tumbuh kembang balita' },
  riwayat: { title: 'Riwayat Pasien', sub: 'Data kunjungan & konsultasi' },
};

export default function NakesLayout({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <NakesDashboard user={user} navigateTo={setActivePage} />;
      case 'antrean': return <AntreanManagement />;
      case 'soap': return <SoapNote />;
      case 'resep': return <ResepDigital />;
      case 'anc': return <ANCMonitoring />;
      case 'jadwal': return <InputJadwal />;
      case 'stunting': return <InputStunting />;
      case 'riwayat': return <RiwayatPasien />;
      default: return <NakesDashboard user={user} navigateTo={setActivePage} />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-inner">
            <div className="logo-icon"><HeartPulse size={22} color="white" /></div>
            <div className="logo-text">
              <strong>Medica WebApp</strong>
              <span>Portal Nakes</span>
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
          <div className="nav-section-label">Menu Utama</div>
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
              <div style={{ width:28, height:28, borderRadius:8, background:user.avatarColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:800, color:'white' }}>{user.avatar}</div>
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

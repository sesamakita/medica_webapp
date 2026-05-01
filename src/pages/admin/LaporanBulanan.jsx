import { useState } from 'react';
import { FileBarChart, Download, Printer, TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';

export default function LaporanBulanan() {
  const [bulan, setBulan] = useState('April 2026');

  const stats = [
    { label: 'Total Kunjungan', val: '1,240', change: '+12%', up: true, icon: Users, color: '#0ea5e9' },
    { label: 'Rata-rata Harian', val: '41', change: '-2%', up: false, icon: Activity, color: '#8b5cf6' },
    { label: 'Pasien BPJS', val: '85%', change: '+5%', up: true, icon: FileBarChart, color: '#10b981' },
    { label: 'Kasus Dirujuk', val: '24', change: '+1%', up: true, icon: TrendingUp, color: '#f59e0b' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Laporan & Statistik Bulanan</h1>
          <p>Rekapitulasi performa dan operasional fasilitas kesehatan</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">
            <Download size={16} /> Export Excel
          </button>
          <button className="btn btn-primary">
            <Printer size={16} /> Cetak Laporan
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: `${s.color}20` }}>
                <Icon size={20} color={s.color} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{s.val}</div>
                <div className="stat-label">{s.label}</div>
                <div className={`stat-change ${s.up ? 'up' : 'down'}`}>
                  {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {s.change} dari bulan lalu
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 20 }}>📈 Tren Kunjungan Pasien (30 Hari Terakhir)</h3>
          {/* Placeholder untuk grafik (visual representation) */}
          <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 6, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            {[35, 45, 30, 55, 60, 40, 50, 65, 70, 45, 30, 55, 40, 60, 75, 80, 50, 45, 60, 70, 55, 40, 35, 50, 65, 80, 90, 70, 60, 55].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary)', borderRadius: '2px 2px 0 0', opacity: 0.7 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>01 {bulan.split(' ')[0]}</span>
            <span>15 {bulan.split(' ')[0]}</span>
            <span>30 {bulan.split(' ')[0]}</span>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 16 }}>📋 Penyakit Terbanyak (Top 5)</h3>
          {[
            { nama: 'ISPA (Infeksi Saluran Pernapasan)', count: 342, pct: 28 },
            { nama: 'Hipertensi', count: 210, pct: 17 },
            { nama: 'Gastritis / Maag', count: 156, pct: 13 },
            { nama: 'Diabetes Melitus', count: 98, pct: 8 },
            { nama: 'Dermatitis', count: 75, pct: 6 },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 5 }}>
                <span>{p.nama}</span>
                <strong>{p.count} kasus</strong>
              </div>
              <div style={{ height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${p.pct * 3}%`, height: '100%', background: 'var(--secondary)', borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

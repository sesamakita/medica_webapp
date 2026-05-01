import { Building2, Users, Baby, Syringe, AlertTriangle, FileCheck, MessageSquare, Star, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { dinkesKPI, chartStunting, dummyNakesList, dummyPengaduan } from '../../data/dummyData';

export default function DinkesDashboard({ user, navigateTo }) {
  const kpi = dinkesKPI;

  const kpiCards = [
    { label: 'Total Faskes Aktif', val: kpi.totalFaskes, icon: Building2, color: '#0ea5e9', change: 'Puskesmas, RSUD, Klinik', up: null },
    { label: 'Total Nakes Terverifikasi', val: kpi.totalNakes, icon: Users, color: '#10b981', change: '+4 bulan ini', up: true },
    { label: 'Prevalensi Stunting (%)', val: `${kpi.stuntingRate}%`, icon: Baby, color: '#f59e0b', change: '-1.2% dari bulan lalu', up: false },
    { label: 'Cakupan Imunisasi (%)', val: `${kpi.imunisasiCoverage}%`, icon: Syringe, color: '#8b5cf6', change: '+2.1% dari target', up: true },
    { label: 'Alert KLB Aktif', val: kpi.klbAlert, icon: AlertTriangle, color: kpi.klbAlert > 0 ? '#ef4444' : '#10b981', change: 'Tidak ada KLB', up: null },
    { label: 'SIP Pending Verifikasi', val: kpi.sipPending, icon: FileCheck, color: '#f59e0b', change: 'Perlu ditindak', up: null },
    { label: 'Pengaduan Baru', val: kpi.pengaduanBaru, icon: MessageSquare, color: '#ef4444', change: 'Belum direspons', up: null },
    { label: 'Faskes Akreditasi Paripurna', val: kpi.akreditasiParipurna, icon: Star, color: '#10b981', change: 'Dari 12 faskes', up: null },
  ];

  return (
    <div>
      <div className="glass-card-glow" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>
              Dashboard Eksekutif — <span style={{ color: 'var(--accent)' }}>Dinas Kesehatan Kabupaten</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 4 }}>
              Data per: {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-green" style={{ padding: '6px 14px' }}>✅ Sistem Normal</span>
            <span className="badge badge-purple" style={{ padding: '6px 14px' }}>Kab. Demo</span>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {kpiCards.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: `${k.color}20` }}>
                <Icon size={20} color={k.color} />
              </div>
              <div className="stat-info">
                <div className="stat-value" style={{ fontSize: '1.4rem', color: k.color }}>{k.val}</div>
                <div className="stat-label">{k.label}</div>
                <div className="stat-change" style={{ color: k.up === true ? 'var(--secondary)' : k.up === false ? 'var(--danger)' : 'var(--text-muted)' }}>
                  {k.up === true && <TrendingUp size={11} />}
                  {k.up === false && <TrendingDown size={11} />}
                  {k.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* STUNTING PER KECAMATAN */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>📊 Stunting per Kecamatan</span>
            <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('stunting')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Detail <ArrowRight size={13} /></button>
          </div>
          {chartStunting.map(k => (
            <div key={k.kecamatan} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{k.kecamatan}</span>
                <span style={{ color: k.stunting >= 25 ? 'var(--danger)' : k.stunting >= 20 ? 'var(--warning)' : 'var(--secondary)', fontWeight: 700 }}>
                  {k.stunting}% ({k.total} balita)
                </span>
              </div>
              <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${k.stunting}%`, height: '100%', borderRadius: 4, background: k.stunting >= 25 ? 'var(--danger)' : k.stunting >= 20 ? 'var(--warning)' : 'var(--secondary)', transition: 'width 0.4s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* PENGADUAN & SIP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>📬 Pengaduan Terbaru</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('pengaduan')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Lihat Semua <ArrowRight size={13} /></button>
            </div>
            {dummyPengaduan.slice(0, 3).map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span className={`badge ${p.status === 'Baru' ? 'badge-red' : p.status === 'Diproses' ? 'badge-yellow' : 'badge-green'}`} style={{ marginTop: 2 }}>{p.status}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{p.perihal}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.faskes} · {p.tanggal}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>🪪 SIP Perlu Verifikasi</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('sip')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Proses <ArrowRight size={13} /></button>
            </div>
            {dummyNakesList.filter(n => n.statusSIP !== 'Aktif').slice(0, 2).map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{n.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{n.nama.split(',')[0]}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.profesi} · Exp: {n.expSIP}</div>
                </div>
                <span className="badge badge-yellow">{n.statusSIP}</span>
              </div>
            ))}
            <div style={{ padding: '10px 0 0', fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigateTo('sip')}>
              + {kpi.sipPending - 1} SIP lainnya menunggu verifikasi →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

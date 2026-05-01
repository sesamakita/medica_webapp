import { Bed, Package, Users, AlertCircle, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { dummyKamar, dummyStokObat, dummyNakesList, dummyPengaduan } from '../../data/dummyData';

export default function AdminDashboard({ user, navigateTo }) {
  const totalKamar = dummyKamar.reduce((s, k) => s + k.total, 0);
  const terisiKamar = dummyKamar.reduce((s, k) => s + k.terisi, 0);
  const obatKritis = dummyStokObat.filter(o => o.status === 'Kritis').length;
  const pengaduanBaru = dummyPengaduan.filter(p => p.status === 'Baru').length;
  const nakesAktif = dummyNakesList.length;

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease'
  };

  const softIconStyle = (color) => ({
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    background: `${color}10`, // 10% opacity
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color
  });

  return (
    <div style={{ padding: '4px' }}>
      {/* Welcome Section */}
      <div style={{ ...cardStyle, marginBottom: '24px', border: 'none', background: 'transparent', boxShadow: 'none', padding: '0 0 10px 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
          Selamat Datang, <span style={{ color: '#0ea5e9' }}>{user.nama.split(',')[0]}</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>{user.unit} — Ringkasan operasional hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Kamar Tersedia', value: totalKamar - terisiKamar, sub: `${terisiKamar}/${totalKamar} Terisi`, icon: <Bed size={20} strokeWidth={1.5} />, color: '#0ea5e9', action: 'kamar' },
          { label: 'Stok Obat Kritis', value: obatKritis, sub: 'Perlu restock', icon: <Package size={20} strokeWidth={1.5} />, color: '#ef4444', action: 'stok' },
          { label: 'Nakes Aktif', value: nakesAktif, sub: 'SIP Terverifikasi', icon: <Users size={20} strokeWidth={1.5} />, color: '#8b5cf6', action: 'nakes' },
          { label: 'Pengaduan Baru', value: pengaduanBaru, sub: 'Butuh tindak lanjut', icon: <AlertCircle size={20} strokeWidth={1.5} />, color: '#f59e0b' },
        ].map((item, i) => (
          <div 
            key={i} 
            style={{ ...cardStyle, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
            onClick={() => item.action && navigateTo(item.action)}
          >
            <div style={softIconStyle(item.color)}>{item.icon}</div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>{item.value}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>{item.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={10} strokeWidth={1.5} /> {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* KAMAR STATUS - SIMPLE LIST */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>Status Kapasitas Kamar</h3>
            <button 
              onClick={() => navigateTo('kamar')}
              style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Lihat Detail <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dummyKamar.map(k => {
              const pct = Math.round((k.terisi / k.total) * 100);
              return (
                <div key={k.kelas}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>{k.kelas}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{k.terisi} / {k.total} Bed</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${pct}%`, height: '100%', 
                      background: pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981',
                      borderRadius: '10px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT ALERTS - MINIMALIST */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Notifikasi Kritis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dummyStokObat.filter(o => o.status === 'Kritis').slice(0, 3).map(o => (
              <div key={o.id} style={{ padding: '12px', background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '10px', display: 'flex', gap: '12px' }}>
                <div style={{ color: '#e11d48' }}><AlertCircle size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#9f1239' }}>{o.nama}</div>
                  <div style={{ fontSize: '0.7rem', color: '#be123c' }}>Stok tersisa {o.stok} {o.satuan}. Segera restock!</div>
                </div>
              </div>
            ))}
            {pengaduanBaru > 0 && (
              <div style={{ padding: '12px', background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '10px', display: 'flex', gap: '12px' }}>
                <div style={{ color: '#0284c7' }}><TrendingUp size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#075985' }}>{pengaduanBaru} Pengaduan Baru</div>
                  <div style={{ fontSize: '0.7rem', color: '#0369a1' }}>Masyarakat mengirimkan masukan baru hari ini.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

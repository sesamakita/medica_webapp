import { dummyNakesList } from '../../data/dummyData';

export default function ManajemenNakes() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Data Tenaga Kesehatan</h1>
          <p>Nakes aktif di unit fasilitas Anda</p>
        </div>
        <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>{dummyNakesList.length} nakes aktif</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {dummyNakesList.map(n => {
          const sipOk = n.statusSIP === 'Aktif';
          return (
            <div key={n.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1rem', flexShrink: 0 }}>
                  {n.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{n.nama}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{n.profesi}</div>
                </div>
                <span className={`badge ${sipOk ? 'badge-green' : 'badge-yellow'}`}>{n.statusSIP}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.75rem' }}>
                {[
                  { label: 'Unit', val: n.unit },
                  { label: 'No. SIP', val: n.sip.split('/').slice(-2).join('/') },
                  { label: 'Exp. SIP', val: n.expSIP },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

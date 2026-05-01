import { useState } from 'react';
import { Save } from 'lucide-react';
import { dummyKamar } from '../../data/dummyData';

export default function KamarManagement() {
  const [kamar, setKamar] = useState(dummyKamar);
  const [saved, setSaved] = useState(false);

  const update = (kelas, field, val) => {
    setKamar(prev => prev.map(k => k.kelas === kelas ? { ...k, [field]: parseInt(val) || 0 } : k));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      {saved && <div className="alert-banner info" style={{ marginBottom: 20 }}>✅ Data kamar berhasil diperbarui!</div>}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Ketersediaan Kamar</h1>
          <p>Update status kamar rawat inap secara real-time</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Simpan Semua</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {kamar.map(k => {
          const sisa = k.total - k.terisi;
          const pct = Math.round((k.terisi / k.total) * 100);
          return (
            <div key={k.kelas} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{k.kelas}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{k.harga}</p>
                </div>
                <span className={`badge ${sisa === 0 ? 'badge-red' : sisa <= 2 ? 'badge-yellow' : 'badge-green'}`}>
                  {sisa === 0 ? 'PENUH' : `${sisa} tersedia`}
                </span>
              </div>

              <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--secondary)', transition: 'width 0.3s' }} />
              </div>

              <div className="form-grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Total Kamar</label>
                  <input className="form-input" type="number" min={0} value={k.total} onChange={e => update(k.kelas, 'total', e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Terisi</label>
                  <input className="form-input" type="number" min={0} max={k.total} value={k.terisi} onChange={e => update(k.kelas, 'terisi', e.target.value)} />
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6 }}>Fasilitas:</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {k.fasilitas.map(f => <span key={f} className="badge badge-gray">{f}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

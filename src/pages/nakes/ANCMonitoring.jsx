import { useState } from 'react';
import { UserCheck, Plus, Calendar, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { dummyBumil } from '../../data/dummyData';

export default function ANCMonitoring() {
  const [data, setData] = useState(dummyBumil);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nama: '', umur: '', hpht: '', desa: '', status: 'Resiko Rendah' });

  const calculateHPL = (hpht) => {
    if (!hpht) return '-';
    const date = new Date(hpht);
    date.setDate(date.getDate() + 7);
    date.setMonth(date.getMonth() + 9);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleSave = () => {
    if (!form.nama || !form.hpht) return alert('Lengkapi data ibu hamil');
    const newEntry = {
      id: `B${Date.now()}`,
      ...form,
      hpl: calculateHPL(form.hpht),
      usiaHamil: '4 Minggu (Estimasi)',
      kunjungan: ['K1'],
    };
    setData([newEntry, ...data]);
    setShowForm(false);
    setForm({ nama: '', umur: '', hpht: '', desa: '', status: 'Resiko Rendah' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Monitoring ANC (Antenatal Care)</h1>
          <p>Pemantauan kesehatan ibu hamil dan janin berkala</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Registrasi Bumil Baru
        </button>
      </div>

      {showForm && (
        <div className="glass-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 16 }}>Pendaftaran Ibu Hamil Baru</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Nama Lengkap Ibu</label>
              <input className="form-input" placeholder="Nama ibu" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Umur (Tahun)</label>
              <input className="form-input" type="number" placeholder="Contoh: 28" value={form.umur} onChange={e => setForm({...form, umur: e.target.value})} />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">HPHT (Hari Pertama Haid Terakhir)</label>
              <input className="form-input" type="date" value={form.hpht} onChange={e => setForm({...form, hpht: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Desa Domisili</label>
              <input className="form-input" placeholder="Nama desa" value={form.desa} onChange={e => setForm({...form, desa: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Estimasi HPL: <strong style={{ color: 'var(--primary)' }}>{calculateHPL(form.hpht)}</strong></label>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={handleSave}>Simpan Data</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 20 }}>
        {data.map(b => (
          <div key={b.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{b.nama}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.umur} thn · {b.desa}</p>
              </div>
              <span className={`badge ${b.status === 'Resiko Tinggi' ? 'badge-red' : 'badge-green'}`}>
                {b.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={12} /> Usia Kehamilan
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: 2 }}>{b.usiaHamil}</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Activity size={12} /> Estimasi Persalinan
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: 2, color: 'var(--primary)' }}>{b.hpl}</div>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 8 }}>Progress Kunjungan (ANC):</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['K1', 'K2', 'K3', 'K4', 'K5', 'K6'].map(k => {
                  const isDone = b.kunjungan.includes(k);
                  return (
                    <div 
                      key={k} 
                      style={{ 
                        flex: 1, 
                        height: 32, 
                        borderRadius: 6, 
                        background: isDone ? 'var(--secondary)' : 'var(--bg-input)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.7rem', 
                        fontWeight: 700, 
                        color: isDone ? 'white' : 'var(--text-muted)',
                        border: isDone ? 'none' : '1px dashed var(--border)'
                      }}
                    >
                      {isDone ? <CheckCircle2 size={12} /> : k}
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="btn btn-secondary w-full" style={{ fontSize: '0.8rem', justifyContent: 'center' }}>
              Lihat Detail Rekam Medis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

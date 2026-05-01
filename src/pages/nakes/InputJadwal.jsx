import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { dummyJadwal } from '../../data/dummyData';

const POLI_OPTIONS = ['Poli Umum', 'Poli KIA', 'Poli Gigi', 'Poli MTBS', 'Poli Lansia'];
const HARI_OPTIONS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export default function InputJadwal() {
  const [jadwal, setJadwal] = useState(dummyJadwal);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ hari: 'Senin', mulai: '08:00', selesai: '12:00', poli: 'Poli Umum', kuota: 30, status: 'Aktif' });
  const [saved, setSaved] = useState(false);

  const resetForm = () => { setForm({ hari: 'Senin', mulai: '08:00', selesai: '12:00', poli: 'Poli Umum', kuota: 30, status: 'Aktif' }); setEditId(null); };

  const handleSave = () => {
    if (editId) {
      setJadwal(prev => prev.map(j => j.id === editId ? { ...j, ...form } : j));
    } else {
      setJadwal(prev => [...prev, { id: `J00${prev.length + 1}`, ...form, terisi: 0 }]);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (j) => {
    setForm({ hari: j.hari, mulai: j.mulai, selesai: j.selesai, poli: j.poli, kuota: j.kuota, status: j.status });
    setEditId(j.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setJadwal(prev => prev.filter(j => j.id !== id));

  return (
    <div>
      {saved && (
        <div className="alert-banner info" style={{ marginBottom: 20 }}>
          ✅ Jadwal berhasil disimpan!
        </div>
      )}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Jadwal Praktik</h1>
          <p>Kelola jadwal poli dan kuota pasien harian</p>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> Tambah Jadwal
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="glass-card" style={{ marginBottom: 24, border: '1px solid rgba(14,165,233,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{editId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => { setShowForm(false); resetForm(); }}>
              <X size={14} />
            </button>
          </div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Hari</label>
              <select className="form-select" value={form.hari} onChange={e => setForm(f => ({ ...f, hari: e.target.value }))}>
                {HARI_OPTIONS.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Jam Mulai</label>
              <input className="form-input" type="time" value={form.mulai} onChange={e => setForm(f => ({ ...f, mulai: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Jam Selesai</label>
              <input className="form-input" type="time" value={form.selesai} onChange={e => setForm(f => ({ ...f, selesai: e.target.value }))} />
            </div>
          </div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Poli</label>
              <select className="form-select" value={form.poli} onChange={e => setForm(f => ({ ...f, poli: e.target.value }))}>
                {POLI_OPTIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Kuota Pasien</label>
              <input className="form-input" type="number" min={1} max={100} value={form.kuota} onChange={e => setForm(f => ({ ...f, kuota: parseInt(e.target.value) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option>Aktif</option>
                <option>Libur</option>
                <option>Cuti</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); resetForm(); }}>Batal</button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={15} /> Simpan Jadwal
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">📅 Daftar Jadwal Praktik</span>
          <span className="badge badge-blue">{jadwal.length} sesi</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Hari</th>
              <th>Poli</th>
              <th>Waktu</th>
              <th>Kuota</th>
              <th>Terisi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map(j => (
              <tr key={j.id}>
                <td><strong>{j.hari}</strong></td>
                <td>{j.poli}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{j.mulai} – {j.selesai}</td>
                <td>{j.kuota} pasien</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden', minWidth: 60 }}>
                      <div style={{ width: `${Math.min((j.terisi / j.kuota) * 100, 100)}%`, height: '100%', background: j.terisi >= j.kuota ? 'var(--danger)' : 'var(--secondary)', borderRadius: 3, transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{j.terisi}/{j.kuota}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${j.status === 'Aktif' ? 'badge-green' : 'badge-gray'}`}>{j.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(j)} style={{ padding: '6px 8px' }}>
                      <Edit2 size={13} />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(j.id)} style={{ padding: '6px 8px' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

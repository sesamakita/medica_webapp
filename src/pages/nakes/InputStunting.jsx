import { useState } from 'react';
import { Plus, Activity, CheckCircle, AlertCircle, Baby } from 'lucide-react';
import { dummyStunting } from '../../data/dummyData';

export default function InputStunting() {
  const [data, setData] = useState(dummyStunting);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ nama: '', gender: 'L', umur: '', berat: '', tinggi: '', desa: '', bidan: '' });

  const THRESHOLDS = { 12: 71, 24: 82, 36: 89, 48: 95, 60: 100 };

  const calcStatus = (umur, berat, tinggi) => {
    const u = parseFloat(umur); const t = parseFloat(tinggi); const b = parseFloat(berat);
    const keys = Object.keys(THRESHOLDS).map(Number);
    const nearest = keys.reduce((p, c) => Math.abs(c - u) < Math.abs(p - u) ? c : p);
    const bmi = b / Math.pow(t / 100, 2);
    if (t < THRESHOLDS[nearest]) return { status: 'Stunting', zscore: -2.5 };
    if (bmi < 14) return { status: 'Risiko', zscore: -1.8 };
    return { status: 'Normal', zscore: -0.4 };
  };

  const handleSave = () => {
    if (!form.nama || !form.umur || !form.berat || !form.tinggi || !form.desa) {
      alert('Lengkapi semua data'); return;
    }
    const { status, zscore } = calcStatus(form.umur, form.berat, form.tinggi);
    const entry = {
      id: `S${Date.now()}`,
      ...form,
      umur: parseFloat(form.umur),
      berat: parseFloat(form.berat),
      tinggi: parseFloat(form.tinggi),
      status, zscore,
      tanggal: new Date().toISOString().split('T')[0],
    };
    setData(prev => [entry, ...prev]);
    setForm({ nama: '', gender: 'L', umur: '', berat: '', tinggi: '', desa: '', bidan: '' });
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const filterDesa = [...new Set(data.map(d => d.desa))];
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = data.filter(d => filterStatus === 'Semua' || d.status === filterStatus);

  return (
    <div>
      {saved && <div className="alert-banner info" style={{ marginBottom: 20 }}>✅ Data stunting berhasil disimpan dan dikalkulasi otomatis!</div>}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Input Data Stunting</h1>
          <p>Rekam & pantau status gizi balita per desa</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> Input Baru
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="glass-card" style={{ marginBottom: 24, border: '1px solid rgba(14,165,233,0.25)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20 }}>📋 Form Input Data Anak</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Nama Lengkap Anak *</label>
              <input className="form-input" placeholder="Nama anak" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Jenis Kelamin</label>
              <select className="form-select" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Umur (bulan) *</label>
              <input className="form-input" type="number" placeholder="cth: 24" value={form.umur} onChange={e => setForm(f => ({ ...f, umur: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Berat Badan (kg) *</label>
              <input className="form-input" type="number" step="0.1" placeholder="cth: 9.5" value={form.berat} onChange={e => setForm(f => ({ ...f, berat: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Tinggi Badan (cm) *</label>
              <input className="form-input" type="number" step="0.1" placeholder="cth: 78" value={form.tinggi} onChange={e => setForm(f => ({ ...f, tinggi: e.target.value }))} />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Desa *</label>
              <input className="form-input" placeholder="Nama desa" value={form.desa} onChange={e => setForm(f => ({ ...f, desa: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Petugas / Bidan</label>
              <input className="form-input" placeholder="Nama petugas" value={form.bidan} onChange={e => setForm(f => ({ ...f, bidan: e.target.value }))} />
            </div>
          </div>

          {/* PREVIEW STATUS */}
          {form.umur && form.berat && form.tinggi && (() => {
            const res = calcStatus(form.umur, form.berat, form.tinggi);
            return (
              <div className={`alert-banner ${res.status === 'Stunting' ? 'danger' : res.status === 'Risiko' ? 'warning' : 'info'}`}>
                {res.status === 'Stunting' ? <AlertCircle size={16} /> : res.status === 'Risiko' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                <span>Prediksi Status: <strong>{res.status}</strong> (Z-score estimasi: {res.zscore})</span>
              </div>
            );
          })()}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Activity size={15} /> Simpan & Hitung Status
            </button>
          </div>
        </div>
      )}

      {/* FILTER */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['Semua', 'Normal', 'Risiko', 'Stunting'].map(s => (
          <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterStatus(s)}>
            {s}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          Menampilkan {filtered.length} data
        </span>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <div className="table-header">
          <span className="table-title"><Baby size={16} style={{ display: 'inline', marginRight: 6 }} />Data Tumbuh Kembang Balita</span>
          <span className="badge badge-blue">{data.length} balita</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Anak</th>
              <th>JK</th>
              <th>Umur</th>
              <th>BB/TB</th>
              <th>Z-score</th>
              <th>Status</th>
              <th>Desa</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><strong>{s.nama}</strong></td>
                <td>{s.gender === 'L' ? '♂' : '♀'}</td>
                <td>{s.umur} bln</td>
                <td style={{ whiteSpace: 'nowrap' }}>{s.berat}kg / {s.tinggi}cm</td>
                <td style={{ fontWeight: 700, color: s.zscore <= -2 ? 'var(--danger)' : s.zscore <= -1.5 ? 'var(--warning)' : 'var(--secondary)' }}>{s.zscore}</td>
                <td>
                  <span className={`badge ${s.status === 'Stunting' ? 'badge-red' : s.status === 'Risiko' ? 'badge-yellow' : 'badge-green'}`}>
                    {s.status}
                  </span>
                </td>
                <td>{s.desa}</td>
                <td>{s.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

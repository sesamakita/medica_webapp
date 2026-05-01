import { useState } from 'react';
import { Plus, Minus, AlertCircle, Save } from 'lucide-react';
import { dummyStokObat } from '../../data/dummyData';

export default function StokObat() {
  const [stok, setStok] = useState(dummyStokObat);
  const [saved, setSaved] = useState(false);

  const updateStok = (id, delta) => {
    setStok(prev => prev.map(o => {
      if (o.id !== id) return o;
      const newStok = Math.max(0, o.stok + delta);
      const status = newStok < o.min ? 'Kritis' : 'Aman';
      return { ...o, stok: newStok, status };
    }));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      {saved && <div className="alert-banner info" style={{ marginBottom: 20 }}>✅ Data stok berhasil disimpan!</div>}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Stok Obat Apotek</h1>
          <p>Pantau dan update stok obat secara berkala</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Simpan Perubahan</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">💊 Daftar Obat & Stok</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-red">{stok.filter(o => o.status === 'Kritis').length} kritis</span>
            <span className="badge badge-green">{stok.filter(o => o.status === 'Aman').length} aman</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Obat</th>
              <th>Kategori</th>
              <th>Stok Saat Ini</th>
              <th>Stok Min.</th>
              <th>Update Stok</th>
              <th>Exp. Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stok.map(o => (
              <tr key={o.id}>
                <td><strong>{o.nama}</strong></td>
                <td><span className="badge badge-purple">{o.kategori}</span></td>
                <td>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: o.status === 'Kritis' ? 'var(--danger)' : 'var(--text-primary)' }}>
                    {o.stok}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 4 }}>{o.satuan}</span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{o.min} {o.satuan}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button className="btn btn-danger btn-sm" style={{ padding: '5px 8px' }} onClick={() => updateStok(o.id, -50)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 30, textAlign: 'center' }}>±50</span>
                    <button className="btn btn-success btn-sm" style={{ padding: '5px 8px' }} onClick={() => updateStok(o.id, 50)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </td>
                <td style={{ fontSize: '0.8rem' }}>{o.expiry}</td>
                <td>
                  <span className={`badge ${o.status === 'Kritis' ? 'badge-red' : 'badge-green'}`}>
                    {o.status === 'Kritis' && <AlertCircle size={11} />} {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

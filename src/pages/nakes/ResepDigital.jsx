import { useState } from 'react';
import { Plus, Trash2, Printer, Save, Pill } from 'lucide-react';
import { dummyAntrean } from '../../data/dummyData';

const OBAT_LIST = [
  'Paracetamol 500mg', 'Amoxicillin 500mg', 'Metformin 500mg', 'Amlodipine 5mg',
  'Captopril 12.5mg', 'Ambroxol 30mg', 'Vitamin C 100mg', 'Cetirizine 10mg',
  'Omeprazole 20mg', 'Antasida DOEN', 'Ibuprofen 400mg', 'Tablet Fe 60mg',
  'Vitamin B Kompleks', 'ORS / Oralit', 'Salbutamol 2mg', 'Dexamethasone 0.5mg',
];
const ATURAN = ['1x1', '2x1', '3x1', '4x1', '1/2 tablet 2x1', 'Bila perlu (prn)'];
const WAKTU = ['Sebelum makan', 'Sesudah makan', 'Bersama makan', 'Malam sebelum tidur'];
const DURASI = ['3 hari', '5 hari', '7 hari', '10 hari', '14 hari', '30 hari'];

const riwayatResep = [
  { id: 'R2026-001', pasien: 'Budi Santoso', umur: 52, tanggal: '2026-04-30', dx: 'Hipertensi', obat: [{ nama: 'Amlodipine 5mg', jumlah: 30, aturan: '1x1', waktu: 'Sesudah makan', durasi: '30 hari' }, { nama: 'Vitamin B Kompleks', jumlah: 30, aturan: '1x1', waktu: 'Sesudah makan', durasi: '30 hari' }] },
  { id: 'R2026-002', pasien: 'Siti Rahayu', umur: 34, tanggal: '2026-04-29', dx: 'ISPA', obat: [{ nama: 'Paracetamol 500mg', jumlah: 15, aturan: '3x1', waktu: 'Sesudah makan', durasi: '5 hari' }, { nama: 'Ambroxol 30mg', jumlah: 15, aturan: '3x1', waktu: 'Sesudah makan', durasi: '5 hari' }] },
];

export default function ResepDigital() {
  const [tab, setTab] = useState('baru');
  const [selectedPasien, setSelectedPasien] = useState('');
  const [dx, setDx] = useState('');
  const [catatan, setCatatan] = useState('');
  const [items, setItems] = useState([{ id: 1, nama: '', jumlah: 10, aturan: '3x1', waktu: 'Sesudah makan', durasi: '5 hari' }]);
  const [saved, setSaved] = useState(false);
  const [riwayat, setRiwayat] = useState(riwayatResep);
  const [printed, setPrinted] = useState(null);

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), nama: '', jumlah: 10, aturan: '3x1', waktu: 'Sesudah makan', durasi: '5 hari' }]);
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));

  const handleSave = () => {
    if (!selectedPasien || items.some(i => !i.nama)) { alert('Pilih pasien dan lengkapi semua obat'); return; }
    const pasien = dummyAntrean.find(a => a.id === selectedPasien);
    const resep = { id: `R${Date.now()}`, pasien: pasien.nama, umur: pasien.umur, tanggal: new Date().toISOString().split('T')[0], dx, obat: items, catatan };
    setRiwayat(prev => [resep, ...prev]);
    setSaved(true); setTimeout(() => setSaved(false), 2500);
    setItems([{ id: 1, nama: '', jumlah: 10, aturan: '3x1', waktu: 'Sesudah makan', durasi: '5 hari' }]);
    setSelectedPasien(''); setDx(''); setCatatan('');
    setTab('riwayat');
  };

  const pasienList = dummyAntrean.filter(a => a.status !== 'selesai');

  return (
    <div>
      {saved && <div className="alert-banner info" style={{ marginBottom: 20 }}>✅ Resep berhasil disimpan! Pasien dapat mengambil obat di apotek.</div>}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Resep Digital</h1>
          <p>Buat, simpan, dan cetak resep untuk pasien</p>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab-item ${tab === 'baru' ? 'active' : ''}`} onClick={() => setTab('baru')}>✏️ Buat Resep Baru</div>
        <div className={`tab-item ${tab === 'riwayat' ? 'active' : ''}`} onClick={() => setTab('riwayat')}>📋 Riwayat Resep ({riwayat.length})</div>
      </div>

      {tab === 'baru' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* PASIEN & DX */}
            <div className="glass-card">
              <div style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.88rem' }}>👤 Data Pasien</div>
              <div className="form-grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Pasien</label>
                  <select className="form-select" value={selectedPasien} onChange={e => setSelectedPasien(e.target.value)}>
                    <option value="">-- Pilih Pasien --</option>
                    {pasienList.map(a => <option key={a.id} value={a.id}>#{a.nomor} · {a.nama} ({a.umur} thn)</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Diagnosis</label>
                  <input className="form-input" placeholder="cth: ISPA, Hipertensi..." value={dx} onChange={e => setDx(e.target.value)} />
                </div>
              </div>
            </div>

            {/* DAFTAR OBAT */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>💊 Daftar Obat</div>
                <button className="btn btn-primary btn-sm" onClick={addItem}><Plus size={14} /> Tambah Obat</button>
              </div>

              {items.map((item, idx) => (
                <div key={item.id} style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>Obat #{idx + 1}</span>
                    {items.length > 1 && (
                      <button className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }} onClick={() => removeItem(item.id)}><Trash2 size={12} /></button>
                    )}
                  </div>
                  <div className="form-grid-2" style={{ marginBottom: 8 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Nama Obat</label>
                      <select className="form-select" value={item.nama} onChange={e => updateItem(item.id, 'nama', e.target.value)}>
                        <option value="">-- Pilih Obat --</option>
                        {OBAT_LIST.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Jumlah</label>
                      <input className="form-input" type="number" min={1} value={item.jumlah} onChange={e => updateItem(item.id, 'jumlah', parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="form-grid-3">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Aturan Pakai</label>
                      <select className="form-select" value={item.aturan} onChange={e => updateItem(item.id, 'aturan', e.target.value)}>
                        {ATURAN.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Waktu</label>
                      <select className="form-select" value={item.waktu} onChange={e => updateItem(item.id, 'waktu', e.target.value)}>
                        {WAKTU.map(w => <option key={w}>{w}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Durasi</label>
                      <select className="form-select" value={item.durasi} onChange={e => updateItem(item.id, 'durasi', e.target.value)}>
                        {DURASI.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="form-group" style={{ marginBottom: 0, marginTop: 4 }}>
                <label className="form-label">Catatan Tambahan</label>
                <textarea className="form-textarea" placeholder="cth: Minum air putih minimal 2L/hari, hindari makanan asin..." style={{ minHeight: 60 }} value={catatan} onChange={e => setCatatan(e.target.value)} />
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleSave} style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
              <Save size={16} /> Simpan & Kirim ke Apotek
            </button>
          </div>

          {/* PREVIEW RESEP */}
          <div className="glass-card" style={{ height: 'fit-content', position: 'sticky', top: 80 }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 14, color: 'var(--primary)' }}>🖨️ Preview Resep</div>
            <div style={{ background: 'white', borderRadius: 10, padding: 20, color: '#1e293b' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0ea5e9', paddingBottom: 10, marginBottom: 14 }}>
                <div style={{ fontWeight: 900, fontSize: '1rem', color: '#0284c7' }}>PUSKESMAS MAKMUR</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Jl. Kesehatan No.1 · Telp. (0411) 123-456</div>
              </div>
              <div style={{ fontSize: '0.75rem', marginBottom: 12 }}>
                <div>Pasien: <strong>{selectedPasien ? dummyAntrean.find(a => a.id === selectedPasien)?.nama : '—'}</strong></div>
                <div>Diagnosis: <strong>{dx || '—'}</strong></div>
                <div>Tanggal: <strong>{new Date().toLocaleDateString('id-ID')}</strong></div>
              </div>
              <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: 10 }}>
                {items.filter(i => i.nama).map((item, idx) => (
                  <div key={item.id} style={{ marginBottom: 10, fontSize: '0.75rem' }}>
                    <div style={{ fontWeight: 800 }}>R/ {item.nama} — {item.jumlah} {item.jumlah > 1 ? 'tab' : 'tab'}</div>
                    <div style={{ paddingLeft: 12, color: '#475569' }}>S {item.aturan} · {item.waktu} · {item.durasi}</div>
                  </div>
                ))}
              </div>
              {catatan && <div style={{ marginTop: 10, fontSize: '0.72rem', color: '#475569', borderTop: '1px dashed #cbd5e1', paddingTop: 8 }}>Ket: {catatan}</div>}
              <div style={{ marginTop: 20, textAlign: 'right', fontSize: '0.72rem', color: '#64748b' }}>
                <div>dr. Ahmad Hidayat</div>
                <div>SIP/503/201/Dinkes</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'riwayat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {riwayat.map(r => (
            <div key={r.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{r.pasien} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.78rem' }}>· {r.umur} tahun</span></div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <span className="badge badge-blue">{r.dx || 'Tanpa Diagnosis'}</span>
                    <span className="badge badge-gray">{r.tanggal}</span>
                    <span className="badge badge-purple" style={{ fontFamily: 'monospace' }}>{r.id}</span>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setPrinted(r)} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <Printer size={13} /> Cetak
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {r.obat.map((o, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--bg-input)', borderRadius:8, padding:'8px 12px' }}>
                    <Pill size={14} color="var(--primary)" />
                    <span style={{ fontWeight:700, fontSize:'0.82rem', flex:1 }}>{o.nama}</span>
                    <span className="badge badge-gray">{o.jumlah} tab</span>
                    <span style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>{o.aturan} · {o.waktu}</span>
                    <span className="badge badge-blue">{o.durasi}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRINT MODAL */}
      {printed && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200 }} onClick={() => setPrinted(null)}>
          <div style={{ background:'white', borderRadius:16, padding:32, width:360, color:'#1e293b' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign:'center', borderBottom:'2px solid #0ea5e9', paddingBottom:10, marginBottom:16 }}>
              <div style={{ fontWeight:900, fontSize:'1.1rem', color:'#0284c7' }}>PUSKESMAS MAKMUR</div>
              <div style={{ fontSize:'0.72rem', color:'#64748b' }}>Jl. Kesehatan No.1 · Telp. (0411) 123-456</div>
            </div>
            <div style={{ fontSize:'0.82rem', marginBottom:14 }}>
              <div>Pasien: <strong>{printed.pasien}</strong></div>
              <div>Dx: <strong>{printed.dx || '-'}</strong></div>
              <div>Tanggal: <strong>{printed.tanggal}</strong></div>
            </div>
            <div style={{ borderTop:'1px dashed #cbd5e1', paddingTop:12 }}>
              {printed.obat.map((o, i) => (
                <div key={i} style={{ marginBottom:10, fontSize:'0.82rem' }}>
                  <div style={{ fontWeight:800 }}>R/ {o.nama} — {o.jumlah} tab</div>
                  <div style={{ paddingLeft:12, color:'#475569' }}>S {o.aturan} · {o.waktu} · {o.durasi}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:20, textAlign:'right', fontSize:'0.75rem', color:'#64748b' }}>
              <div>dr. Ahmad Hidayat</div><div>SIP/503/201/Dinkes</div>
            </div>
            <div style={{ display:'flex', gap:8, marginTop:20 }}>
              <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => setPrinted(null)}>Tutup</button>
              <button className="btn btn-primary" style={{ flex:1 }} onClick={() => { window.print(); }}>🖨️ Cetak</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

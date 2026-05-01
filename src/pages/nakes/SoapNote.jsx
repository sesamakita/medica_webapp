import { useState } from 'react';
import { Save, Plus, Search, FileText } from 'lucide-react';
import { dummyAntrean, dummyRiwayatSOAP } from '../../data/dummyData';

const defaultSOAP = { subjektif: '', objektif: '', assesment: '', plan: '' };

export default function SoapNote() {
  const [tab, setTab] = useState('baru');
  const [selectedPasien, setSelectedPasien] = useState('');
  const [soap, setSOAP] = useState(defaultSOAP);
  const [dx, setDx] = useState('');
  const [saved, setSaved] = useState(false);
  const [riwayat, setRiwayat] = useState(dummyRiwayatSOAP);
  const [search, setSearch] = useState('');

  const pasienList = dummyAntrean.filter(a => a.status !== 'selesai');

  const handleSave = () => {
    if (!selectedPasien || !soap.subjektif) { alert('Pilih pasien dan isi SOAP'); return; }
    const pasien = dummyAntrean.find(a => a.id === selectedPasien);
    const newRec = {
      id: `RM${Date.now()}`,
      pasien: pasien.nama,
      umur: pasien.umur,
      tanggal: new Date().toISOString().split('T')[0],
      dx,
      ...soap
    };
    setRiwayat(prev => [newRec, ...prev]);
    setSOAP(defaultSOAP); setDx(''); setSelectedPasien('');
    setSaved(true); setTimeout(() => setSaved(false), 2500);
    setTab('riwayat');
  };

  const filtered = riwayat.filter(r => r.nama.toLowerCase().includes(search.toLowerCase()) || r.dx.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {saved && <div className="alert-banner info" style={{ marginBottom: 20 }}>✅ SOAP Note berhasil disimpan ke rekam medis!</div>}

      <div className="page-header">
        <div className="page-header-left">
          <h1>SOAP Note Digital</h1>
          <p>Rekam medis terstruktur per kunjungan pasien</p>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab-item ${tab === 'baru' ? 'active' : ''}`} onClick={() => setTab('baru')}>✏️ Tulis SOAP Baru</div>
        <div className={`tab-item ${tab === 'riwayat' ? 'active' : ''}`} onClick={() => setTab('riwayat')}>📁 Riwayat Rekam Medis ({riwayat.length})</div>
      </div>

      {tab === 'baru' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card">
              <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 14 }}>👤 Pilih Pasien</div>
              <div className="form-group" style={{ marginBottom: 12 }}>
                <label className="form-label">Pasien dari Antrean Hari Ini</label>
                <select className="form-select" value={selectedPasien} onChange={e => setSelectedPasien(e.target.value)}>
                  <option value="">-- Pilih Pasien --</option>
                  {pasienList.map(a => (
                    <option key={a.id} value={a.id}>#{a.nomor} · {a.nama} ({a.umur} thn)</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Diagnosis / ICD-10</label>
                <input className="form-input" placeholder="cth: Hipertensi Grade II / I10" value={dx} onChange={e => setDx(e.target.value)} />
              </div>
            </div>

            {[
              { key: 'subjektif', label: 'S — Subjektif', placeholder: 'Keluhan utama, riwayat penyakit, anamnesis...', hint: 'Apa yang dirasakan pasien' },
              { key: 'objektif', label: 'O — Objektif', placeholder: 'TTV: TD, N, RR, S. Pemeriksaan fisik, lab...', hint: 'Hasil pemeriksaan dokter' },
            ].map(field => (
              <div key={field.key} className="glass-card">
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4 }}>{field.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 10 }}>{field.hint}</div>
                <textarea
                  className="form-textarea"
                  placeholder={field.placeholder}
                  value={soap[field.key]}
                  onChange={e => setSOAP(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{ minHeight: 80 }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'assesment', label: 'A — Assesment', placeholder: 'Diagnosis kerja, diagnosis banding...', hint: 'Kesimpulan klinis dokter' },
              { key: 'plan', label: 'P — Plan', placeholder: 'Terapi, obat, edukasi, rujukan, kontrol...', hint: 'Rencana penanganan' },
            ].map(field => (
              <div key={field.key} className="glass-card">
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4 }}>{field.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 10 }}>{field.hint}</div>
                <textarea
                  className="form-textarea"
                  placeholder={field.placeholder}
                  value={soap[field.key]}
                  onChange={e => setSOAP(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{ minHeight: 100 }}
                />
              </div>
            ))}

            {/* PREVIEW */}
            {selectedPasien && (soap.subjektif || soap.assesment) && (
              <div className="glass-card" style={{ border: '1px solid rgba(14,165,233,0.2)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 10, color: 'var(--primary)' }}>📋 Preview Rekam Medis</div>
                {[
                  { label: 'Pasien', val: dummyAntrean.find(a => a.id === selectedPasien)?.nama },
                  { label: 'Diagnosis', val: dx || '(belum diisi)' },
                  { label: 'Tanggal', val: new Date().toLocaleDateString('id-ID') },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 8, fontSize: '0.78rem', marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)', minWidth: 70 }}>{item.label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.val}</span>
                  </div>
                ))}
              </div>
            )}

            <button className="btn btn-primary" onClick={handleSave} style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
              <Save size={16} /> Simpan Rekam Medis
            </button>
          </div>
        </div>
      )}

      {tab === 'riwayat' && (
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="form-input" placeholder="Cari nama pasien atau diagnosis..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{filtered.length} rekam medis</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(r => (
              <div key={r.id} className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{r.nama} <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>· {r.umur || '—'} tahun</span></div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <span className="badge badge-blue">{r.dx}</span>
                      <span className="badge badge-gray">{r.tanggal}</span>
                      <span className="badge badge-gray">{r.id}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'S — Subjektif', val: r.s || r.subjektif },
                    { label: 'O — Objektif', val: r.o || r.objektif },
                    { label: 'A — Assesment', val: r.a || r.assesment },
                    { label: 'P — Plan', val: r.p || r.plan },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.val || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

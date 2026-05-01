import { useState } from 'react';
import { PhoneCall, CheckCircle, SkipForward, Clock, User, AlertCircle } from 'lucide-react';
import { dummyAntrean } from '../../data/dummyData';

export default function AntreanManagement() {
  const [antrean, setAntrean] = useState(dummyAntrean);

  const panggil = (id) => {
    setAntrean(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'dipanggil' } :
      a.status === 'dipanggil' ? { ...a, status: 'menunggu' } : a
    ));
  };

  const selesai = (id) => {
    setAntrean(prev => prev.map(a => a.id === id ? { ...a, status: 'selesai' } : a));
  };

  const skip = (id) => {
    setAntrean(prev => prev.map(a => a.id === id ? { ...a, status: 'skip' } : a));
  };

  const dipanggil = antrean.find(a => a.status === 'dipanggil');
  const menunggu = antrean.filter(a => a.status === 'menunggu');
  const done = antrean.filter(a => a.status === 'selesai');

  return (
    <div>
      {/* ACTIVE CALL */}
      {dipanggil && (
        <div style={{ background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(139,92,246,0.1))', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sedang Dipanggil</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
              #{dipanggil.nomor.toString().padStart(3, '0')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>{dipanggil.nama}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {dipanggil.umur} tahun · Keluhan: {dipanggil.keluhan}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span className={`badge ${dipanggil.bpjs === 'Aktif' ? 'badge-green' : 'badge-red'}`}>BPJS {dipanggil.bpjs}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-success" onClick={() => selesai(dipanggil.id)}>
                <CheckCircle size={16} /> Selesai
              </button>
              <button className="btn btn-danger" onClick={() => skip(dipanggil.id)}>
                <SkipForward size={16} /> Skip
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* QUEUE LIST */}
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">📋 Antrean Menunggu ({menunggu.length})</span>
            <span className="badge badge-yellow">{menunggu.length} pasien</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Pasien</th>
                <th>Keluhan</th>
                <th>BPJS</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menunggu.map(a => (
                <tr key={a.id}>
                  <td>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-muted)' }}>
                      {a.nomor}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} color="var(--text-muted)" />
                      </div>
                      <div>
                        <strong>{a.nama}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.umur} thn · Daftar {a.waktu}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.keluhan}
                  </td>
                  <td>
                    <span className={`badge ${a.bpjs === 'Aktif' ? 'badge-green' : 'badge-red'}`}>{a.bpjs}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => panggil(a.id)}
                      disabled={!!dipanggil}
                      style={{ opacity: dipanggil ? 0.4 : 1 }}
                    >
                      <PhoneCall size={13} /> Panggil
                    </button>
                  </td>
                </tr>
              ))}
              {menunggu.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
                  Tidak ada pasien menunggu
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SIDEBAR — STATS + SELESAI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 14 }}>Ringkasan Hari Ini</div>
            {[
              { label: 'Total Antrean', val: antrean.length, color: 'var(--text-primary)' },
              { label: 'Menunggu', val: menunggu.length, color: 'var(--warning)' },
              { label: 'Dipanggil', val: dipanggil ? 1 : 0, color: 'var(--primary)' },
              { label: 'Selesai', val: done.length, color: 'var(--secondary)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontWeight: 800, color: item.color }}>{item.val}</span>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 14 }}>
              ✅ Selesai Hari Ini ({done.length})
            </div>
            {done.map(a => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)', opacity: 0.7 }}>
                <CheckCircle size={14} color="var(--secondary)" />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{a.nama}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No. {a.nomor} · {a.waktu}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { dummyPengaduan } from '../../data/dummyData';

export default function PantauPengaduan() {
  const [pengaduan, setPengaduan] = useState(dummyPengaduan);
  const [filter, setFilter] = useState('Semua');

  const proses = (id) => setPengaduan(prev => prev.map(p => p.id === id ? { ...p, status: 'Diproses' } : p));
  const tutup = (id) => setPengaduan(prev => prev.map(p => p.id === id ? { ...p, status: 'Selesai' } : p));

  const filtered = filter === 'Semua' ? pengaduan : pengaduan.filter(p => p.status === filter);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Pantau Pengaduan</h1>
          <p>Keluhan masyarakat terkait layanan fasilitas kesehatan</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-red">{pengaduan.filter(p => p.status === 'Baru').length} baru</span>
          <span className="badge badge-yellow">{pengaduan.filter(p => p.status === 'Diproses').length} diproses</span>
          <span className="badge badge-green">{pengaduan.filter(p => p.status === 'Selesai').length} selesai</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['Semua', 'Baru', 'Diproses', 'Selesai'].map(s => (
          <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(p => (
          <div key={p.id} className="glass-card" style={{
            borderLeft: `3px solid ${p.status === 'Baru' ? 'var(--danger)' : p.status === 'Diproses' ? 'var(--warning)' : 'var(--secondary)'}`,
            borderRadius: '0 var(--radius) var(--radius) 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: p.status === 'Baru' ? 'rgba(239,68,68,0.15)' : p.status === 'Diproses' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {p.status === 'Baru' ? <AlertCircle size={18} color="var(--danger)" /> : p.status === 'Diproses' ? <Clock size={18} color="var(--warning)" /> : <CheckCircle size={18} color="var(--secondary)" />}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--primary)' }}>{p.id}</span>
                  <span className={`badge ${p.prioritas === 'Tinggi' ? 'badge-red' : p.prioritas === 'Sedang' ? 'badge-yellow' : 'badge-gray'}`}>
                    {p.prioritas}
                  </span>
                  <span className="badge badge-purple">{p.kategori}</span>
                  <span className={`badge ${p.status === 'Baru' ? 'badge-red' : p.status === 'Diproses' ? 'badge-yellow' : 'badge-green'}`}>{p.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: 4 }}>{p.perihal}</p>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  📍 {p.faskes} · 👤 {p.pelapor} · 📅 {p.tanggal}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {p.status === 'Baru' && (
                  <button className="btn btn-sm" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.3)' }} onClick={() => proses(p.id)}>
                    <Clock size={13} /> Proses
                  </button>
                )}
                {p.status === 'Diproses' && (
                  <button className="btn btn-success btn-sm" onClick={() => tutup(p.id)}>
                    <CheckCircle size={13} /> Selesai
                  </button>
                )}
                {p.status === 'Selesai' && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle size={13} /> Ditutup
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
            <MessageSquare size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>Tidak ada pengaduan dengan status ini</p>
          </div>
        )}
      </div>
    </div>
  );
}

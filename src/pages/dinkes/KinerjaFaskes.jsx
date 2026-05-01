import { Star, TrendingUp, Users, MessageSquare, AlertCircle } from 'lucide-react';

const rankingData = [
  { rank: 1, nama: 'Puskesmas Makmur', score: 95.8, kunjungan: 1240, keluhan: 2, akreditasi: 'Paripurna' },
  { rank: 2, nama: 'Puskesmas Mawar', score: 92.4, kunjungan: 980, keluhan: 1, akreditasi: 'Utama' },
  { rank: 3, nama: 'RSUD Kabupaten', score: 89.1, kunjungan: 3500, keluhan: 12, akreditasi: 'Paripurna' },
  { rank: 4, nama: 'Puskesmas Sejahtera', score: 85.6, kunjungan: 850, keluhan: 5, akreditasi: 'Madya' },
  { rank: 5, nama: 'Puskesmas Melati', score: 78.2, kunjungan: 720, keluhan: 8, akreditasi: 'Dasar' },
];

export default function KinerjaFaskes() {
  return (
    <div>
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)' }}><Star size={20} color="var(--secondary)" /></div>
          <div className="stat-info">
            <div className="stat-value">95.8</div>
            <div className="stat-label">Skor Tertinggi</div>
            <div className="stat-change up">Puskesmas Makmur</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(14,165,233,0.1)' }}><Users size={20} color="var(--primary)" /></div>
          <div className="stat-info">
            <div className="stat-value">84.5</div>
            <div className="stat-label">Rata-rata Skor Kab.</div>
            <div className="stat-change up">+2.4 pts bulan ini</div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">🏆 Ranking Performa Faskes (Index Pelayanan)</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nama Fasilitas Kesehatan</th>
              <th>Skor Index</th>
              <th>Kunjungan</th>
              <th>Keluhan</th>
              <th>Akreditasi</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map(f => (
              <tr key={f.rank}>
                <td>
                  <div style={{ 
                    width: 28, height: 28, borderRadius: '50%', 
                    background: f.rank === 1 ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'var(--bg-input)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: f.rank === 1 ? 'white' : 'var(--text-muted)'
                  }}>
                    {f.rank}
                  </div>
                </td>
                <td><strong>{f.nama}</strong></td>
                <td>
                  <span style={{ fontWeight: 800, color: f.score > 90 ? 'var(--secondary)' : f.score > 80 ? 'var(--primary)' : 'var(--warning)' }}>
                    {f.score}
                  </span>
                </td>
                <td>{f.kunjungan}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: f.keluhan > 10 ? 'var(--danger)' : 'inherit' }}>
                    <MessageSquare size={14} /> {f.keluhan}
                  </div>
                </td>
                <td><span className="badge badge-purple">{f.akreditasi}</span></td>
                <td>
                  <div style={{ height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden', minWidth: 100 }}>
                    <div style={{ width: `${f.score}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card" style={{ marginTop: 20 }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={18} color="var(--primary)" /> Metodologi Penilaian
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Skor Index Pelayanan dihitung berdasarkan bobot: <strong>Cakupan Program (40%)</strong>, <strong>Respon Pengaduan (25%)</strong>, <strong>Ketersediaan Stok (20%)</strong>, dan <strong>Kelengkapan SIP Nakes (15%)</strong>. Data diperbarui setiap tanggal 1 bulan berjalan.
        </p>
      </div>
    </div>
  );
}

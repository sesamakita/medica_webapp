import { Users, Clock, CheckCircle, AlertCircle, CalendarDays, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { dummyAntrean, dummyStunting, dummyJadwal } from '../../data/dummyData';

export default function NakesDashboard({ user, navigateTo }) {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const antreanHariIni = dummyAntrean.length;
  const menunggu = dummyAntrean.filter(a => a.status === 'menunggu').length;
  const selesai = dummyAntrean.filter(a => a.status === 'selesai').length;
  const dipanggil = dummyAntrean.filter(a => a.status === 'dipanggil').length;

  const jadwalHariIni = dummyJadwal.filter(j => j.status === 'Aktif').slice(0, 2);
  const stuntingWarning = dummyStunting.filter(s => s.status === 'Stunting').length;

  return (
    <div>
      {/* HERO GREETING */}
      <div className="glass-card-glow" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{today}</p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            Selamat Datang, <span style={{ color: 'var(--primary)' }}>{user.nama.split(',')[0].replace('dr. ', '')} 👋</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>
            {user.profesi} · {user.unit} · SIP: {user.sip}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '8px 16px', borderRadius: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>Sedang Bertugas</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigateTo('antrean')}>
          <div className="stat-icon" style={{ background: 'rgba(14,165,233,0.15)' }}>
            <Users size={22} color="var(--primary)" />
          </div>
          <div className="stat-info">
            <div className="stat-value">{antreanHariIni}</div>
            <div className="stat-label">Total Antrean Hari Ini</div>
            <div className="stat-change up"><TrendingUp size={12} /> +3 dari kemarin</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigateTo('antrean')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
            <Clock size={22} color="var(--warning)" />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ color: 'var(--warning)' }}>{menunggu}</div>
            <div className="stat-label">Pasien Menunggu</div>
            <div className="stat-change" style={{ color: 'var(--warning)' }}>
              <AlertCircle size={12} /> {dipanggil} sedang dipanggil
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <CheckCircle size={22} color="var(--secondary)" />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ color: 'var(--secondary)' }}>{selesai}</div>
            <div className="stat-label">Pasien Selesai</div>
            <div className="stat-change up"><CheckCircle size={12} /> Hari ini</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigateTo('stunting')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>
            <AlertCircle size={22} color="var(--danger)" />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ color: 'var(--danger)' }}>{stuntingWarning}</div>
            <div className="stat-label">Kasus Stunting Aktif</div>
            <div className="stat-change down"><Activity size={12} /> Perlu tindak lanjut</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* ANTREAN TERKINI */}
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">🏥 Antrean Aktif</span>
            <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('antrean')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              Kelola <ArrowRight size={13} />
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Pasien</th>
                <th>Keluhan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyAntrean.slice(0, 5).map(a => (
                <tr key={a.id}>
                  <td><span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>{a.nomor}</span></td>
                  <td>
                    <strong>{a.nama}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.umur} thn · {a.waktu}</div>
                  </td>
                  <td style={{ maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.keluhan}</td>
                  <td>
                    <span className={`badge ${a.status === 'dipanggil' ? 'badge-blue' : a.status === 'selesai' ? 'badge-green' : 'badge-yellow'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* JADWAL & STUNTING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* JADWAL */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>📅 Jadwal Aktif</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('jadwal')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                Kelola <ArrowRight size={13} />
              </button>
            </div>
            {jadwalHariIni.map(j => (
              <div key={j.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{j.hari} — {j.poli}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{j.mulai}–{j.selesai} · {j.terisi}/{j.kuota} pasien</div>
                </div>
                <span className="badge badge-green">{j.status}</span>
              </div>
            ))}
          </div>

          {/* STUNTING ALERT */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>⚠️ Kasus Stunting</span>
              <button className="btn btn-sm btn-secondary" onClick={() => navigateTo('stunting')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                Detail <ArrowRight size={13} />
              </button>
            </div>
            {dummyStunting.filter(s => s.status === 'Stunting').slice(0, 3).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'var(--danger)' }}>
                  {s.umur}bl
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{s.nama}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.desa} · Z-score: {s.zscore}</div>
                </div>
                <span className="badge badge-red">Stunting</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

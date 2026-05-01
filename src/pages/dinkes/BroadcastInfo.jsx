import { useState } from 'react';
import { Megaphone, Send, Users, Building2, Clock, CheckCircle } from 'lucide-react';

export default function BroadcastInfo() {
  const [msg, setMsg] = useState('');
  const [target, setTarget] = useState('Semua');
  const [history, setHistory] = useState([
    { id: 1, text: 'Instruksi: Percepatan input data stunting bulan April untuk semua Puskesmas.', target: 'Puskesmas', date: '2026-04-25 09:00', sent: true },
    { id: 2, text: 'Peringatan: Stok Vaksin Polio menipis di gudang pusat, harap efisiensi penggunaan.', target: 'Semua', date: '2026-04-20 14:30', sent: true },
  ]);

  const handleSend = () => {
    if (!msg) return;
    const newMsg = {
      id: Date.now(),
      text: msg,
      target,
      date: new Date().toLocaleString('id-ID', { hour12: false }),
      sent: true
    };
    setHistory([newMsg, ...history]);
    setMsg('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 20 }}>
      {/* FORM AREA */}
      <div>
        <div className="glass-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Megaphone size={18} color="var(--primary)" /> Buat Broadcast Baru
          </h3>
          
          <div className="form-group">
            <label className="form-label">Target Penerima</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Semua', 'Puskesmas', 'RSUD', 'Klinik'].map(t => (
                <button 
                  key={t} 
                  className={`btn btn-sm ${target === t ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setTarget(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Isi Pesan Instruksi / Pengumuman</label>
            <textarea 
              className="form-textarea" 
              placeholder="Tulis instruksi penting untuk faskes di sini..." 
              style={{ minHeight: 150 }}
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Pesan akan tampil di dashboard penerima secara real-time.
            </div>
            <button className="btn btn-primary" onClick={handleSend}>
              <Send size={16} /> Kirim Sekarang
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: 16 }}>Riwayat Broadcast</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {history.map(h => (
              <div key={h.id} className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="badge badge-blue">{h.target}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{h.date}</span>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{h.text}</p>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--secondary)', fontSize: '0.7rem' }}>
                  <CheckCircle size={12} /> Terkirim ke {h.target === 'Semua' ? '12 Faskes' : '8 Unit'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS SIDEBAR */}
      <div>
        <div className="glass-card">
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: 16 }}>Ringkasan Koneksi</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={16} color="var(--secondary)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Faskes Online</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>12 / 12 Unit</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--secondary)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={16} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nakes Login</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>45 Nakes Aktif</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ marginTop: 20 }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: 16 }}>Tips Broadcast</h4>
          <ul style={{ paddingLeft: 18, fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Gunakan bahasa yang instruktif dan jelas.</li>
            <li>Tentukan target penerima yang spesifik jika pesan hanya untuk unit tertentu.</li>
            <li>Broadcast bersifat mendesak akan muncul sebagai pop-up di layar penerima.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { dummyNakesList } from '../../data/dummyData';

export default function VerifikasiSIP() {
  const [nakes, setNakes] = useState(dummyNakesList);

  const approve = (id) => setNakes(prev => prev.map(n => n.id === id ? { ...n, statusSIP: 'Aktif' } : n));
  const reject = (id) => setNakes(prev => prev.map(n => n.id === id ? { ...n, statusSIP: 'Ditolak' } : n));

  const pending = nakes.filter(n => n.statusSIP === 'Pending');
  const aktif = nakes.filter(n => n.statusSIP === 'Aktif');
  const hampir = nakes.filter(n => n.statusSIP === 'Hampir Exp');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Verifikasi SIP Nakes</h1>
          <p>Approval izin praktik tenaga kesehatan kabupaten</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-yellow">{pending.length} pending</span>
          <span className="badge badge-green">{aktif.length} aktif</span>
          <span className="badge badge-red">{hampir.length} hampir exp</span>
        </div>
      </div>

      {/* PENDING */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div className="section-title">⏳ Menunggu Verifikasi ({pending.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map(n => (
              <div key={n.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 16, border: '1px solid rgba(245,158,11,0.25)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', flexShrink: 0 }}>{n.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800 }}>{n.nama}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{n.profesi} · {n.unit}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>SIP: {n.sip} · Berlaku hingga: {n.expSIP}</div>
                </div>
                <span className="badge badge-yellow"><Clock size={11} /> Pending</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-success btn-sm" onClick={() => approve(n.id)}><CheckCircle size={14} /> Setujui</button>
                  <button className="btn btn-danger btn-sm" onClick={() => reject(n.id)}><XCircle size={14} /> Tolak</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL NAKES TABLE */}
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">🪪 Semua Data SIP Nakes</span>
          <span className="badge badge-blue">{nakes.length} total</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Nakes</th>
              <th>Profesi</th>
              <th>No. SIP</th>
              <th>Unit</th>
              <th>Berlaku Hingga</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {nakes.map(n => (
              <tr key={n.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{n.avatar}</div>
                    <strong>{n.nama}</strong>
                  </div>
                </td>
                <td>{n.profesi}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{n.sip}</td>
                <td>{n.unit}</td>
                <td>{n.expSIP}</td>
                <td>
                  <span className={`badge ${n.statusSIP === 'Aktif' ? 'badge-green' : n.statusSIP === 'Pending' ? 'badge-yellow' : n.statusSIP === 'Hampir Exp' ? 'badge-red' : 'badge-gray'}`}>
                    {n.statusSIP}
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

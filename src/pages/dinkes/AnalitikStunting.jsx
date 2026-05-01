import { chartStunting, chartImunisasi } from '../../data/dummyData';

export default function AnalitikStunting() {
  const maxStunting = Math.max(...chartStunting.map(k => k.stunting));

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Analitik Stunting</h1>
          <p>Distribusi prevalensi stunting per kecamatan kabupaten</p>
        </div>
        <span className="badge badge-yellow" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
          Rata-rata: {(chartStunting.reduce((s, k) => s + k.stunting, 0) / chartStunting.length).toFixed(1)}%
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* STUNTING BAR CHART */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 20 }}>📊 Prevalensi Stunting per Kecamatan</div>
          {chartStunting.map(k => (
            <div key={k.kecamatan} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>{k.kecamatan}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{k.total} balita</span>
                  <span style={{ fontWeight: 800, color: k.stunting >= 25 ? 'var(--danger)' : k.stunting >= 20 ? 'var(--warning)' : 'var(--secondary)' }}>
                    {k.stunting}%
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', height: 10, background: 'var(--bg-input)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ width: `${(k.stunting / maxStunting) * 100}%`, background: k.stunting >= 25 ? 'var(--danger)' : k.stunting >= 20 ? 'var(--warning)' : 'var(--secondary)', borderRadius: 5, transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, display: 'flex', gap: 12, fontSize: '0.72rem' }}>
            <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--secondary)', display: 'inline-block' }} /> &lt;20% (Aman)</span>
            <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--warning)', display: 'inline-block' }} /> 20-24% (Waspada)</span>
            <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--danger)', display: 'inline-block' }} /> ≥25% (Kritis)</span>
          </div>
        </div>

        {/* IMUNISASI COVERAGE */}
        <div className="glass-card">
          <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 20 }}>💉 Cakupan Imunisasi per Bulan (%)</div>
          {chartImunisasi.map(d => (
            <div key={d.bulan} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>{d.bulan} 2026</div>
              {[
                { label: 'BCG', val: d.bcg, color: '#0ea5e9' },
                { label: 'DPT', val: d.dpt, color: '#10b981' },
                { label: 'Polio', val: d.polio, color: '#8b5cf6' },
                { label: 'Campak', val: d.campak, color: '#f59e0b' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', width: 40 }}>{item.label}</span>
                  <div style={{ flex: 1, height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.color, width: 36, textAlign: 'right' }}>{item.val}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY TABLE */}
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">📋 Ringkasan Data per Kecamatan</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Kecamatan</th>
              <th>Total Balita</th>
              <th>Stunting (%)</th>
              <th>Normal (%)</th>
              <th>Estimasi Kasus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {chartStunting.map(k => (
              <tr key={k.kecamatan}>
                <td><strong>{k.kecamatan}</strong></td>
                <td>{k.total}</td>
                <td style={{ fontWeight: 700, color: k.stunting >= 25 ? 'var(--danger)' : k.stunting >= 20 ? 'var(--warning)' : 'var(--secondary)' }}>{k.stunting}%</td>
                <td>{k.normal}%</td>
                <td>{Math.round(k.total * k.stunting / 100)} anak</td>
                <td>
                  <span className={`badge ${k.stunting >= 25 ? 'badge-red' : k.stunting >= 20 ? 'badge-yellow' : 'badge-green'}`}>
                    {k.stunting >= 25 ? 'Kritis' : k.stunting >= 20 ? 'Waspada' : 'Terkendali'}
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

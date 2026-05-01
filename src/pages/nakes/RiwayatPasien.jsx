import { dummyAntrean } from '../../data/dummyData';

export default function RiwayatPasien() {
  const selesai = dummyAntrean.filter(a => a.status === 'selesai');
  const semua = [...dummyAntrean].sort((a, b) => a.nomor - b.nomor);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Riwayat Pasien</h1>
          <p>Data kunjungan dan rekam medis singkat</p>
        </div>
        <span className="badge badge-blue" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
          {semua.length} kunjungan hari ini
        </span>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">📁 Daftar Kunjungan — {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Pasien</th>
              <th>Umur</th>
              <th>Keluhan Utama</th>
              <th>BPJS</th>
              <th>Jam Daftar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {semua.map(a => (
              <tr key={a.id}>
                <td><strong style={{ color: 'var(--primary)' }}>#{a.nomor.toString().padStart(3,'0')}</strong></td>
                <td><strong>{a.nama}</strong></td>
                <td>{a.umur} thn</td>
                <td>{a.keluhan}</td>
                <td>
                  <span className={`badge ${a.bpjs === 'Aktif' ? 'badge-green' : 'badge-red'}`}>{a.bpjs}</span>
                </td>
                <td>{a.waktu}</td>
                <td>
                  <span className={`badge ${a.status === 'selesai' ? 'badge-green' : a.status === 'dipanggil' ? 'badge-blue' : 'badge-yellow'}`}>
                    {a.status}
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

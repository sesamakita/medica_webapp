// =============================================
// MEDICA WEBAPP — RICH CONSOLIDATED DUMMY DATA
// =============================================

export const ROLES = {
  NAKES: 'nakes',
  ADMIN_FASKES: 'admin_faskes',
  DINKES: 'dinkes',
};

export const DEMO_USERS = {
  nakes: {
    id: 'N001',
    nama: 'dr. Ahmad Hidayat',
    role: ROLES.NAKES,
    profesi: 'Dokter Umum',
    sip: 'SIP/503/201/Dinkes',
    unit: 'Puskesmas Makmur',
    avatar: 'AH',
    avatarColor: '#0ea5e9',
  },
  admin_faskes: {
    id: 'A001',
    nama: 'Ns. Ratna Kusuma, S.Kep',
    role: ROLES.ADMIN_FASKES,
    profesi: 'Admin Puskesmas',
    unit: 'Puskesmas Makmur',
    avatar: 'RK',
    avatarColor: '#10b981',
  },
  dinkes: {
    id: 'D001',
    nama: 'Drg. Budi Santoso, M.Kes',
    role: ROLES.DINKES,
    profesi: 'Kabid Yankes Dinkes',
    unit: 'Dinas Kesehatan Kabupaten',
    avatar: 'BS',
    avatarColor: '#8b5cf6',
  },
};

// --- DATA PASIEN & ANTREAN ---
export const dummyAntrean = [
  { id: 'P001', nomor: 1, nama: 'Siti Rahayu', umur: 34, keluhan: 'Demam 3 hari, batuk berdahak', bpjs: 'Aktif', status: 'dipanggil', waktu: '08:15', gender: 'P' },
  { id: 'P002', nomor: 2, nama: 'Budi Santoso', umur: 52, keluhan: 'Kontrol Hipertensi, minta resep rutin', bpjs: 'Aktif', status: 'menunggu', waktu: '08:30', gender: 'L' },
  { id: 'P003', nomor: 3, nama: 'Mariana Dewi', umur: 28, keluhan: 'Gatal-gatal di lengan dan punggung', bpjs: 'Aktif', status: 'menunggu', waktu: '08:45', gender: 'P' },
  { id: 'P004', nomor: 4, nama: 'Ahmad Fauzan', umur: 7, keluhan: 'Diare 5x sehari, lemas', bpjs: 'Aktif', status: 'menunggu', waktu: '09:00', gender: 'L' },
  { id: 'P005', nomor: 5, nama: 'Sri Wahyuni', umur: 45, keluhan: 'Nyeri lutut kanan saat berjalan', bpjs: 'Non-aktif', status: 'menunggu', waktu: '09:15', gender: 'P' },
  { id: 'P006', nomor: 6, nama: 'Dedi Kurniawan', umur: 61, keluhan: 'Kontrol DM Tipe 2, cek gula darah', bpjs: 'Aktif', status: 'selesai', waktu: '07:45', gender: 'L' },
];

// --- DATA REKAM MEDIS (SOAP) ---
export const dummyRiwayatSOAP = [
  { id: 'RM-101', pasienId: 'P006', nama: 'Dedi Kurniawan', tanggal: '2026-04-20', dx: 'Diabetes Melitus Tipe 2', s: 'Pasien merasa lemas di pagi hari.', o: 'GDS: 240 mg/dL, TD: 130/80.', a: 'DM Tipe 2 tidak terkontrol.', p: 'Metformin 500mg 2x1, diet rendah gula.' },
  { id: 'RM-102', pasienId: 'P002', nama: 'Budi Santoso', tanggal: '2026-04-15', dx: 'Hipertensi', s: 'Tengkuk terasa berat.', o: 'TD: 150/90 mmHg.', a: 'Hipertensi Grade 1.', p: 'Amlodipine 5mg 1x1.' },
];

// --- DATA JADWAL PRAKTIK ---
export const dummyJadwal = [
  { id: 'J001', hari: 'Senin', mulai: '08:00', selesai: '12:00', poli: 'Poli Umum', kuota: 30, terisi: 24, status: 'Aktif' },
  { id: 'J002', hari: 'Selasa', mulai: '08:00', selesai: '12:00', poli: 'Poli Umum', kuota: 30, terisi: 18, status: 'Aktif' },
  { id: 'J003', hari: 'Rabu', mulai: '08:00', selesai: '11:00', poli: 'Poli KIA', kuota: 20, terisi: 15, status: 'Aktif' },
  { id: 'J004', hari: 'Kamis', mulai: '09:00', selesai: '13:00', poli: 'Poli Umum', kuota: 25, terisi: 0, status: 'Aktif' },
  { id: 'J005', hari: 'Jumat', mulai: '08:00', selesai: '11:00', poli: 'Poli Gigi', kuota: 15, terisi: 10, status: 'Aktif' },
];

// --- DATA IBU HAMIL (ANC) ---
export const dummyBumil = [
  { id: 'B001', nama: 'Ny. Sari Melati', umur: 28, hpht: '2025-10-15', hpl: '2026-07-22', usiaHamil: '28 Minggu', kunjungan: ['K1', 'K2', 'K3', 'K4'], status: 'Resiko Rendah', desa: 'Desa Makmur' },
  { id: 'B002', nama: 'Ny. Diana Putri', umur: 32, hpht: '2026-01-05', hpl: '2026-10-12', usiaHamil: '16 Minggu', kunjungan: ['K1', 'K2'], status: 'Resiko Tinggi', desa: 'Desa Sejahtera' },
  { id: 'B003', nama: 'Ny. Indah Cahya', umur: 24, hpht: '2025-08-20', hpl: '2026-05-27', usiaHamil: '36 Minggu', kunjungan: ['K1', 'K2', 'K3', 'K4', 'K5'], status: 'Resiko Rendah', desa: 'Desa Makmur' },
];

// --- DATA STUNTING ---
export const dummyStunting = [
  { id: 'S001', nama: 'Arjuna Pratama', gender: 'L', umur: 24, berat: 9.8, tinggi: 78, status: 'Stunting', zscore: -2.8, desa: 'Desa Makmur', tanggal: '2026-04-28', bidan: 'Bidan Siti' },
  { id: 'S002', nama: 'Putri Cahaya', gender: 'P', umur: 18, berat: 8.5, tinggi: 73, status: 'Normal', zscore: -0.5, desa: 'Desa Sejahtera', tanggal: '2026-04-27', bidan: 'Bidan Maria' },
  { id: 'S003', nama: 'Rizki Maulana', gender: 'L', umur: 36, berat: 11.2, tinggi: 84, status: 'Stunting', zscore: -2.5, desa: 'Desa Makmur', tanggal: '2026-04-25', bidan: 'Bidan Siti' },
  { id: 'S004', nama: 'Nabila Zahra', gender: 'P', umur: 12, berat: 7.1, tinggi: 69, status: 'Risiko', zscore: -1.8, desa: 'Desa Anggrek', tanggal: '2026-04-24', bidan: 'Bidan Anisa' },
];

// --- DATA OBAT (APOTEK) ---
export const dummyStokObat = [
  { id: 'O001', nama: 'Paracetamol 500mg', kategori: 'Analgesik', stok: 2400, satuan: 'tablet', min: 500, status: 'Aman', expiry: '2027-06' },
  { id: 'O002', nama: 'Amoxicillin 500mg', kategori: 'Antibiotik', stok: 180, satuan: 'kapsul', min: 200, status: 'Kritis', expiry: '2026-12' },
  { id: 'O003', nama: 'Metformin 500mg', kategori: 'Antidiabetik', stok: 960, satuan: 'tablet', min: 300, status: 'Aman', expiry: '2027-03' },
  { id: 'O004', nama: 'Amlodipine 5mg', kategori: 'Antihipertensi', stok: 720, satuan: 'tablet', min: 200, status: 'Aman', expiry: '2027-08' },
  { id: 'O005', nama: 'Vitamin C 100mg', kategori: 'Vitamin', stok: 45, satuan: 'tablet', min: 500, status: 'Kritis', expiry: '2026-09' },
  { id: 'O006', nama: 'ORS / Oralit', kategori: 'Rehidrasi', stok: 330, satuan: 'sachet', min: 200, status: 'Aman', expiry: '2027-01' },
];

// --- DATA KAMAR ---
export const dummyKamar = [
  { kelas: 'VIP', total: 5, terisi: 3, harga: 'Rp 450.000/malam', fasilitas: ['AC', 'TV', 'Kulkas', 'Sofa', 'KM Dalam'] },
  { kelas: 'Kelas 1', total: 15, terisi: 15, harga: 'Rp 180.000/malam', fasilitas: ['AC', 'TV', 'KM Dalam'] },
  { kelas: 'Kelas 2', total: 20, terisi: 12, harga: 'Rp 80.000/malam', fasilitas: ['AC', 'KM Dalam'] },
  { kelas: 'Kelas 3', total: 30, terisi: 18, harga: 'BPJS Gratis', fasilitas: ['Kipas', 'KM Luar'] },
];

// --- DATA NAKES & SIP ---
export const dummyNakesList = [
  { id: 'N001', nama: 'dr. Ahmad Hidayat', profesi: 'Dokter Umum', sip: 'SIP/503/201/Dinkes', unit: 'Puskesmas Makmur', statusSIP: 'Aktif', expSIP: '2027-12', avatar: 'AH', color: '#0ea5e9' },
  { id: 'N002', nama: 'Bidan Siti Aminah, S.Tr.Keb', profesi: 'Bidan', sip: 'SIPB/503/088/Dinkes', unit: 'Puskesmas Makmur', statusSIP: 'Aktif', expSIP: '2028-03', avatar: 'SA', color: '#10b981' },
  { id: 'N003', nama: 'Ns. Rian Pratama, S.Kep', profesi: 'Perawat', sip: 'SIPP/503/142/Dinkes', unit: 'RSUD Kabupaten', statusSIP: 'Aktif', expSIP: '2027-06', avatar: 'RP', color: '#8b5cf6' },
  { id: 'N004', nama: 'apt. Dewi Lestari, S.Farm', profesi: 'Apoteker', sip: 'SIPA/503/035/Dinkes', unit: 'Apotek Puskesmas', statusSIP: 'Hampir Exp', expSIP: '2026-08', avatar: 'DL', color: '#f59e0b' },
  { id: 'N007', nama: 'Ns. Fitri Handayani, S.Kep', profesi: 'Perawat', sip: 'SIPP/503/210/Dinkes', unit: 'Puskesmas Anggrek', statusSIP: 'Pending', expSIP: '2026-12', avatar: 'FH', color: '#6366f1' },
];

// --- DATA PENGADUAN ---
export const dummyPengaduan = [
  { id: 'PG-001', pelapor: 'Anonim', kategori: 'Pelayanan Buruk', perihal: 'Petugas loket kurang ramah saat pendaftaran', faskes: 'Puskesmas Mawar', tanggal: '2026-04-30', status: 'Baru', prioritas: 'Sedang' },
  { id: 'PG-002', pelapor: 'Budi S.', kategori: 'Ketersediaan Obat', perihal: 'Vitamin C habis selama 3 minggu', faskes: 'Puskesmas Makmur', tanggal: '2026-04-29', status: 'Diproses', prioritas: 'Tinggi' },
];

// --- DATA ANALITIK DINKES ---
export const dinkesKPI = {
  totalFaskes: 12,
  totalNakes: 156,
  stuntingRate: 19.2,
  imunisasiCoverage: 91.4,
  klbAlert: 0,
  sipPending: 8,
  pengaduanBaru: 4,
  akreditasiParipurna: 3,
};

export const chartStunting = [
  { kecamatan: 'Kec. Makmur', stunting: 18, normal: 82, total: 245 },
  { kecamatan: 'Kec. Sejahtera', stunting: 23, normal: 77, total: 312 },
  { kecamatan: 'Kec. Anggrek', stunting: 15, normal: 85, total: 198 },
  { kecamatan: 'Kec. Melati', stunting: 28, normal: 72, total: 287 },
  { kecamatan: 'Kec. Mawar', stunting: 12, normal: 88, total: 176 },
];

export const chartImunisasi = [
  { bulan: 'Jan', bcg: 92, dpt: 88, polio: 95, campak: 85 },
  { bulan: 'Feb', bcg: 88, dpt: 91, polio: 90, campak: 87 },
  { bulan: 'Mar', bcg: 94, dpt: 89, polio: 93, campak: 91 },
  { bulan: 'Apr', bcg: 90, dpt: 93, polio: 96, campak: 89 },
];

import { useState } from 'react';
import { Calendar, User, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { dummyNakesList } from '../../data/dummyData';

const SHIFTS = [
  { id: 'S1', nama: 'Pagi', jam: '08:00 - 14:00', color: '#10b981' },
  { id: 'S2', nama: 'Sore', jam: '14:00 - 20:00', color: '#f59e0b' },
  { id: 'S3', nama: 'Malam', jam: '20:00 - 08:00', color: '#8b5cf6' },
];

export default function JadwalJaga() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Dummy data jadwal
  const [jadwal, setJadwal] = useState([
    { id: 1, nakesId: 'N001', shift: 'Pagi', tanggal: 1 },
    { id: 2, nakesId: 'N002', shift: 'Sore', tanggal: 1 },
    { id: 3, nakesId: 'N003', shift: 'Malam', tanggal: 1 },
    { id: 4, nakesId: 'N001', shift: 'Pagi', tanggal: 2 },
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Jadwal Jaga Shift</h1>
          <p>Atur penugasan tenaga kesehatan per shift kerja</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
            <ChevronLeft size={16} />
          </button>
          <div style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: 8, fontWeight: 700, border: '1px solid var(--border)' }}>
            {monthName}
          </div>
          <button className="btn btn-secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const shiftsDay = jadwal.filter(j => j.tanggal === day);
          
          return (
            <div key={day} className="glass-card" style={{ padding: 10, minHeight: 140, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: 8, color: 'var(--text-muted)' }}>{day}</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                {shiftsDay.map(s => {
                  const nakes = dummyNakesList.find(n => n.id === s.nakesId);
                  const shiftInfo = SHIFTS.find(sh => sh.nama === s.shift);
                  return (
                    <div 
                      key={s.id} 
                      style={{ 
                        fontSize: '0.65rem', 
                        background: `${shiftInfo.color}20`, 
                        color: shiftInfo.color, 
                        padding: '4px 6px', 
                        borderRadius: 4,
                        borderLeft: `3px solid ${shiftInfo.color}`,
                        fontWeight: 700
                      }}
                    >
                      {s.shift}: {nakes?.nama.split(' ')[1]}
                    </div>
                  );
                })}
              </div>

              <button 
                style={{ 
                  marginTop: 6, 
                  background: 'none', 
                  border: '1px dashed var(--border)', 
                  borderRadius: 4, 
                  color: 'var(--text-muted)', 
                  fontSize: '0.6rem',
                  padding: '2px 0',
                  cursor: 'pointer'
                }}
              >
                + Tambah
              </button>
            </div>
          );
        })}
      </div>

      <div className="glass-card" style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 12 }}>Keterangan Shift:</h3>
        <div style={{ display: 'flex', gap: 20 }}>
          {SHIFTS.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color }} />
              <div style={{ fontSize: '0.78rem' }}><strong>Shift {s.nama}:</strong> {s.jam}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

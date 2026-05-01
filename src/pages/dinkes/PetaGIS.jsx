import { useState } from 'react';
import { Map as MapIcon, MapPin, Search, Filter, Info } from 'lucide-react';

const locations = [
  { id: 1, x: '20%', y: '30%', nama: 'Puskesmas Makmur', type: 'Puskesmas', stunting: '18%', nakes: 12, status: 'Normal' },
  { id: 2, x: '45%', y: '20%', nama: 'Puskesmas Mawar', type: 'Puskesmas', stunting: '12%', nakes: 8, status: 'Normal' },
  { id: 3, x: '70%', y: '40%', nama: 'RSUD Kabupaten', type: 'Rumah Sakit', stunting: '-', nakes: 56, status: 'Normal' },
  { id: 4, x: '35%', y: '65%', nama: 'Puskesmas Sejahtera', type: 'Puskesmas', stunting: '23%', nakes: 10, status: 'Waspada' },
  { id: 5, x: '60%', y: '75%', nama: 'Puskesmas Melati', type: 'Puskesmas', stunting: '28%', nakes: 9, status: 'Kritis' },
];

export default function PetaGIS() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ height: 'calc(100vh - 180px)', display: 'flex', gap: 20 }}>
      {/* MAP AREA */}
      <div style={{ flex: 1, position: 'relative', background: 'var(--bg-surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Simulasi Map Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
        
        {/* Simulasi Kontur Wilayah (UI Based) */}
        <div style={{ position: 'absolute', inset: '10%', border: '2px solid rgba(14,165,233,0.1)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 70%', background: 'rgba(14,165,233,0.02)' }} />

        {/* PINS */}
        {locations.map(loc => (
          <div 
            key={loc.id} 
            style={{ 
              position: 'absolute', 
              left: loc.x, 
              top: loc.y, 
              cursor: 'pointer',
              transform: 'translate(-50%, -100%)',
              transition: 'all 0.3s'
            }}
            onClick={() => setSelected(loc)}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              filter: selected?.id === loc.id ? 'drop-shadow(0 0 10px var(--primary))' : 'none'
            }}>
              <div style={{ 
                background: loc.status === 'Kritis' ? 'var(--danger)' : loc.status === 'Waspada' ? 'var(--warning)' : 'var(--primary)',
                color: 'white',
                padding: 6,
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)'
              }}>
                <MapPin size={16} style={{ transform: 'rotate(45deg)' }} />
              </div>
              {selected?.id === loc.id && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: '120%', 
                  background: 'var(--bg-card)', 
                  padding: '6px 12px', 
                  borderRadius: 8, 
                  border: '1px solid var(--border)',
                  fontSize: '0.7rem',
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  {loc.nama}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* CONTROLS */}
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="glass-card" style={{ padding: 10, display: 'flex', gap: 8 }}>
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Cari wilayah/faskes..." style={{ background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: '0.75rem' }} />
          </div>
          <div className="glass-card" style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>LEGENDA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} /> Normal
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--warning)' }} /> Waspada Stunting
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)' }} /> Kritis Stunting
            </div>
          </div>
        </div>
      </div>

      {/* INFO SIDEBAR */}
      <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ flex: 1 }}>
          {!selected ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Info size={40} style={{ marginBottom: 12, opacity: 0.2 }} />
              <p style={{ fontSize: '0.85rem' }}>Pilih salah satu titik di peta untuk melihat detail data faskes.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{selected.nama}</h2>
                <span className={`badge ${selected.status === 'Kritis' ? 'badge-red' : selected.status === 'Waspada' ? 'badge-yellow' : 'badge-green'}`}>
                  {selected.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: 'var(--bg-input)', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tipe Fasilitas</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selected.type}</div>
                </div>
                <div style={{ background: 'var(--bg-input)', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Prevalensi Stunting Wilayah</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: selected.status === 'Kritis' ? 'var(--danger)' : 'var(--text-primary)' }}>{selected.stunting}</div>
                </div>
                <div style={{ background: 'var(--bg-input)', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Tenaga Kesehatan</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selected.nakes} Orang</div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: 12 }}>Top Isu Kesehatan Wilayah:</h4>
                <ul style={{ paddingLeft: 20, fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Peningkatan kasus ISPA (Efek Musim)</li>
                  <li>Kebutuhan tambahan Vaksin BCG</li>
                  <li>Target penurunan stunting 5% (2026)</li>
                </ul>
              </div>

              <button className="btn btn-primary w-full" style={{ marginTop: 30, justifyContent: 'center' }}>
                Buka Dashboard Faskes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

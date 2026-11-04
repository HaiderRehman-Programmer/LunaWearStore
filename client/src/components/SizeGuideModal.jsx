import React from 'react';
import { useStore } from '../context/StoreContext';
import { X } from 'lucide-react';

const SIZE_GUIDE_DATA = {
  women: [
    { size: 'XS', bust: '31-32"', waist: '24-25"', hips: '34-35"', uk: '6', eu: '34' },
    { size: 'S', bust: '33-34"', waist: '26-27"', hips: '36-37"', uk: '8', eu: '36' },
    { size: 'M', bust: '35-36"', waist: '28-29"', hips: '38-39"', uk: '10-12', eu: '38-40' },
    { size: 'L', bust: '37-39"', waist: '30-32"', hips: '40-42"', uk: '14-16', eu: '42-44' },
    { size: 'XL', bust: '40-42"', waist: '33-35"', hips: '43-45"', uk: '18', eu: '46' }
  ],
  men: [
    { size: 'S', chest: '36-38"', waist: '30-32"', hips: '37-39"', uk: 'S', eu: '46' },
    { size: 'M', chest: '39-41"', waist: '33-35"', hips: '40-42"', uk: 'M', eu: '48-50' },
    { size: 'L', chest: '42-44"', waist: '36-38"', hips: '43-45"', uk: 'L', eu: '52-54' },
    { size: 'XL', chest: '45-47"', waist: '39-41"', hips: '46-48"', uk: 'XL', eu: '56' },
    { size: 'XXL', chest: '48-50"', waist: '42-44"', hips: '49-51"', uk: 'XXL', eu: '58-60' }
  ]
};

export const SizeGuideModal = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  const [activeGender, setActiveGender] = React.useState('women');

  if (!sizeGuideOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setSizeGuideOpen(false)}>
      <div className="size-guide-modal animate-popup" onClick={e => e.stopPropagation()}>
        <div className="size-guide-header">
          <h2>Size Guide</h2>
          <button className="modal-close-btn" onClick={() => setSizeGuideOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="size-guide-tabs">
          <button
            className={`size-guide-tab ${activeGender === 'women' ? 'active' : ''}`}
            onClick={() => setActiveGender('women')}
          >
            Women's
          </button>
          <button
            className={`size-guide-tab ${activeGender === 'men' ? 'active' : ''}`}
            onClick={() => setActiveGender('men')}
          >
            Men's
          </button>
        </div>

        <div className="size-guide-tip">
          <strong>Tip:</strong> All measurements are in inches. For the most accurate fit, measure over your undergarments.
        </div>

        <div className="size-guide-table-wrap">
          <table className="size-guide-table">
            <thead>
              <tr>
                <th>Size</th>
                {activeGender === 'women' ? (
                  <>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>UK Size</th>
                    <th>EU Size</th>
                  </>
                ) : (
                  <>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>UK Size</th>
                    <th>EU Size</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_DATA[activeGender].map(row => (
                <tr key={row.size}>
                  <td><strong>{row.size}</strong></td>
                  <td>{activeGender === 'women' ? row.bust : row.chest}</td>
                  <td>{row.waist}</td>
                  <td>{row.hips}</td>
                  <td>{row.uk}</td>
                  <td>{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="size-guide-footer-note">
          Between sizes? We recommend sizing up for a more relaxed fit, or down for a tailored look.
        </div>
      </div>
    </div>
  );
};

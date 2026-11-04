import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { Modal } from '../common/Modal.jsx';
import { SIZE_CHART_DATA } from '../../utils/constants.js';

export const SizeGuideModal = () => {
  const { sizeGuideModalOpen, setSizeGuideModalOpen } = useStore();
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [tab, setTab] = useState('tops'); // 'tops' | 'bottoms'

  // Conversion helper
  const convertValue = (val) => {
    if (unit === 'inches') return val;
    // Extract numbers and convert from inches to cm (1 in = 2.54 cm)
    return val.replace(/(\d+)(?:-(\d+))?"/, (_, g1, g2) => {
      const cm1 = Math.round(Number(g1) * 2.54);
      if (g2) {
        const cm2 = Math.round(Number(g2) * 2.54);
        return `${cm1}-${cm2} cm`;
      }
      return `${cm1} cm`;
    });
  };

  const chartRows = tab === 'tops' ? SIZE_CHART_DATA.tops : SIZE_CHART_DATA.bottoms;

  return (
    <Modal 
      isOpen={sizeGuideModalOpen} 
      onClose={() => setSizeGuideModalOpen(false)}
      title="Garment Measurement & Size Guide"
      maxWidth="680px"
    >
      <div className="size-guide-modal-inner">
        {/* Unit and Category Toggles */}
        <div className="size-guide-controls">
          <div className="guide-tab-toggle">
            <button 
              className={`guide-tab-btn ${tab === 'tops' ? 'active' : ''}`}
              onClick={() => setTab('tops')}
            >
              Tops, Coats & Knitwear
            </button>
            <button 
              className={`guide-tab-btn ${tab === 'bottoms' ? 'active' : ''}`}
              onClick={() => setTab('bottoms')}
            >
              Pants & Denim
            </button>
          </div>

          <div className="guide-unit-toggle">
            <button 
              className={`unit-pill ${unit === 'inches' ? 'active' : ''}`}
              onClick={() => setUnit('inches')}
            >
              IN
            </button>
            <button 
              className={`unit-pill ${unit === 'cm' ? 'active' : ''}`}
              onClick={() => setUnit('cm')}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="table-responsive">
          <table className="size-guide-table">
            <thead>
              <tr>
                <th>Size</th>
                {tab === 'tops' ? (
                  <>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Length</th>
                  </>
                ) : (
                  <>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Inseam</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {chartRows.map((row) => (
                <tr key={row.size}>
                  <td className="size-col-bold">{row.size}</td>
                  {tab === 'tops' ? (
                    <>
                      <td>{convertValue(row.chest)}</td>
                      <td>{convertValue(row.waist)}</td>
                      <td>{convertValue(row.hips)}</td>
                      <td>{convertValue(row.length)}</td>
                    </>
                  ) : (
                    <>
                      <td>{convertValue(row.waist)}</td>
                      <td>{convertValue(row.hips)}</td>
                      <td>{convertValue(row.inseam)}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Instructions */}
        <div className="how-to-measure-box">
          <h4 className="measure-guide-title">How To Measure for the Perfect Fit</h4>
          <ul className="measure-guide-list">
            <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</li>
            <li><strong>Hips:</strong> Stand with feet together and measure around the fullest point of your hips.</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default SizeGuideModal;

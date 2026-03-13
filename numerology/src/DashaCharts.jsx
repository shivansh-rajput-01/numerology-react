import React from "react";
import LoshuAnalysis from "./LoshuAnalysis";
import MedicalAnalysis from "./MedicalAnalysis";
import Miscellaneous from "./Miscellaneous";

const MiniGrid = ({ title, data, dashaLabel, planetNum, searchDate }) => (
  <div className="dasha-master-unit" style={{ width: "100%", marginBottom: "100px" }}>
    
    {/* --- CHART SECTION (Isolated from Global CSS) --- */}
    <div style={{ 
      background: '#ffffff', 
      maxWidth: "500px", 
      margin: "0 auto 40px auto", 
      padding: "25px", 
      borderRadius: '20px', 
      border: '1px solid #ddd',
      borderLeft: '8px solid #a87e2f',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', color: '#b32d2d', margin: '0 0 10px 0', fontSize: '22px' }}>{title} Chart</h3>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Active: <span style={{ color: '#a87e2f', fontWeight: 'bold' }}>{dashaLabel} ({planetNum})</span>
      </p>

      {/* Unique Grid Classes to prevent CSS override */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          display: 'flex', flexDirection: 'column', width: '240px', border: '2px solid #a87e2f' 
        }}>
          {data.map((row, rIdx) => (
            <div key={rIdx} style={{ display: 'flex', height: '80px' }}>
              {row.map((cell, cIdx) => {
                const dashaCount = cell.dashaNums ? cell.dashaNums.length : 0;
                const normalCount = cell.count - dashaCount;
                return (
                  <div key={cIdx} style={{ 
                    flex: 1, border: '1px solid #eee', position: 'relative', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' 
                  }}>
                    <span style={{ position: 'absolute', top: '2px', right: '5px', fontSize: '10px', color: '#ccc' }}>{cell.num}</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {[...Array(normalCount)].map((_, i) => (
                        <span key={`n-${i}`} style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#444', margin: '1px' }}>{cell.num}</span>
                      ))}
                      {cell.dashaNums?.map((_, i) => (
                        <span key={`d-${i}`} style={{ fontSize: '1.4rem', fontWeight: '900', color: '#a87e2f', margin: '1px' }}>{cell.num}</span>
                      ))}
                      {cell.isSpecial && (
                        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#b32d2d', textDecoration: 'underline' }}>{cell.num}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* --- PREDICTIONS SECTION --- */}
    <div className="dasha-reports-wrapper">
      <div className="search-divider">
        <span className="divider-line"></span>
        <h2 className="search-title" style={{ fontSize: '1.4rem' }}>{title} Analysis</h2>
        <span className="divider-line"></span>
      </div>
      
      {/* Hum yahan wrapper use kar rahe hain taaki iske andar ki grid reports ki tarah behave kare */}
      <div className="dasha-report-grid-isolation">
         <LoshuAnalysis gridData={data} />
         <MedicalAnalysis gridData={data} />
         <Miscellaneous gridData={data} />
      </div>
    </div>
  </div>
);

const DashaCharts = ({ baseLoshu, highlightedDashas, searchDate }) => {
  if (!highlightedDashas || !highlightedDashas.maha) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  };

  const planetToNum = (p) => ({ Sun:1, Moon:2, Jupiter:3, Rahu:4, Mercury:5, Venus:6, Ketu:7, Saturn:8, Mars:9 }[p] || 0);

  const mdGrid = updateGridLogic(baseLoshu, planetToNum(highlightedDashas.maha?.p));
  const adGrid = updateGridLogic(mdGrid, planetToNum(highlightedDashas.antar?.p));
  const pdGrid = updateGridLogic(adGrid, planetToNum(highlightedDashas.prat?.p));

  function updateGridLogic(grid, num) {
    return JSON.parse(JSON.stringify(grid)).map(row => row.map(cell => {
      if (cell.num === num) {
        return { ...cell, count: cell.count + 1, dashaNums: [...(cell.dashaNums || []), num] };
      }
      return cell;
    }));
  }

  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <div className="search-divider" style={{ marginBottom: '60px' }}>
        <span className="divider-line"></span>
        <h2 className="search-title">Date Analysis: {formatDate(searchDate)}</h2>
        <span className="divider-line"></span>
      </div>

      <MiniGrid title="MahaDasha" data={mdGrid} dashaLabel={highlightedDashas.maha?.p} planetNum={planetToNum(highlightedDashas.maha?.p)} searchDate={formatDate(searchDate)} />
      <MiniGrid title="AntarDasha" data={adGrid} dashaLabel={highlightedDashas.antar?.p} planetNum={planetToNum(highlightedDashas.antar?.p)} searchDate={formatDate(searchDate)} />
      <MiniGrid title="PratyantarDasha" data={pdGrid} dashaLabel={highlightedDashas.prat?.p} planetNum={planetToNum(highlightedDashas.prat?.p)} searchDate={formatDate(searchDate)} />
    </div>
  );
};

export default DashaCharts;
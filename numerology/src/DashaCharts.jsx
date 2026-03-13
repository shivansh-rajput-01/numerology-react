import React from "react";
import LoshuAnalysis from "./LoshuAnalysis";
import MedicalAnalysis from "./MedicalAnalysis";
import Miscellaneous from "./Miscellaneous";

const MiniGrid = ({ title, data, dashaLabel, planetNum, searchDate }) => (
  <div className="dasha-section-container" style={{ width: "100%", marginBottom: "80px" }}>
    {/* Isolated Card for Chart Only */}
    <div style={{ 
      background: '#ffffff',
      maxWidth: "550px", 
      margin: "0 auto", 
      borderLeft: "6px solid #a87e2f",
      padding: "25px",
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      position: 'relative',
      display: 'block' // Ensures it doesn't try to be a grid item
    }}>
      {/* Date Badge */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        right: '20px',
        background: '#a87e2f',
        color: 'white',
        padding: '4px 15px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 10
      }}>
        Status on: {searchDate}
      </div>

      <h3 style={{ 
        color: "#b32d2d", 
        fontSize: "24px", 
        textAlign: 'center', 
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <span style={{ height: '10px', width: '10px', backgroundColor: '#a87e2f', borderRadius: '50%' }}></span>
        {title}
      </h3>
      
      <p style={{ textAlign: "center", color: "#666", fontSize: '16px', marginBottom: '20px' }}>
        Active Planet: <strong style={{color: '#a87e2f'}}>{dashaLabel} ({planetNum})</strong>
      </p>

      {/* Grid wrapper with flex to ensure it stays centered and doesn't break */}
      <div style={{ display: "flex", justifyContent: "center", width: '100%' }}>
        <div className="loshu-grid" style={{ 
            width: "240px", 
            margin: "0", 
            display: 'flex', 
            flexDirection: 'column', 
            border: '3px solid #a87e2f',
            borderRadius: '10px' 
        }}>
          {data.map((row, rIdx) => (
            <div key={rIdx} className="loshu-row" style={{ height: "80px", display: 'flex' }}>
              {row.map((cell, cIdx) => {
                const dashaCount = cell.dashaNums ? cell.dashaNums.length : 0;
                const normalCount = cell.count - dashaCount;
                return (
                  <div key={cIdx} className="loshu-box" style={{ 
                      flex: 1, 
                      border: '1px solid #eee', 
                      position: 'relative', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: '#fff'
                  }}>
                    <span className="grid-bg-num" style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px', color: '#ccc' }}>{cell.num}</span>
                    <div className="num-display" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px' }}>
                      {[...Array(normalCount)].map((_, i) => (
                        <span key={`dob-${i}`} className="dob-num" style={{ fontSize: "1.5rem", fontWeight: 'bold', color: '#444' }}>{cell.num}</span>
                      ))}
                      {cell.dashaNums?.map((_, i) => (
                        <span key={`dasha-${i}`} className="dob-num" style={{ fontSize: "1.5rem", color: "#a87e2f", fontWeight: "900" }}>{cell.num}</span>
                      ))}
                      {cell.isSpecial && <span className="fixed-num" style={{ fontSize: "1.5rem", color: '#b32d2d', fontWeight: '900', textDecoration: 'underline' }}>{cell.num}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Predictions Section - Global CSS will apply here correctly */}
    <div style={{ marginTop: "50px", width: "100%" }}>
      <div className="search-divider">
        <span className="divider-line"></span>
        <h2 className="search-title" style={{ fontSize: "1.6rem" }}>{title} Predictions ({searchDate})</h2>
        <span className="divider-line"></span>
      </div>
      
      {/* Container for Reports */}
      <div className="dasha-reports-flow" style={{ width: '100%' }}>
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

  const formattedSearchDate = formatDate(searchDate);
  const planetToNum = (p) => ({ Sun:1, Moon:2, Jupiter:3, Rahu:4, Mercury:5, Venus:6, Ketu:7, Saturn:8, Mars:9 }[p] || 0);

  const mdNum = planetToNum(highlightedDashas.maha?.p);
  const adNum = planetToNum(highlightedDashas.antar?.p);
  const pdNum = planetToNum(highlightedDashas.prat?.p);

  const updateGrid = (grid, newNum) => grid.map(row => row.map(cell => {
    if (cell.num === newNum) {
      return { ...cell, count: cell.count + 1, dashaNums: [...(cell.dashaNums || []), newNum] };
    }
    return { ...cell };
  }));

  const mdGrid = updateGrid(JSON.parse(JSON.stringify(baseLoshu)), mdNum);
  const adGrid = updateGrid(JSON.parse(JSON.stringify(mdGrid)), adNum);
  const pdGrid = updateGrid(JSON.parse(JSON.stringify(adGrid)), pdNum);

  return (
    <div className="dasha-wrapper" style={{ width: "100%", marginTop: "30px", padding: '0 10px' }}>
      <div className="search-divider" style={{ marginBottom: '50px' }}>
        <span className="divider-line" style={{ background: '#a87e2f' }}></span>
        <div style={{ textAlign: 'center' }}>
          <h2 className="search-title" style={{ color: '#a87e2f', marginBottom: '10px' }}>
            Dasha Insights For:
          </h2>
          <div style={{ 
            fontSize: '2.2rem', 
            fontWeight: '900', 
            color: '#b32d2d', 
            background: '#fff', 
            padding: '10px 30px', 
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            display: 'inline-block'
          }}>
            {formattedSearchDate}
          </div>
        </div>
        <span className="divider-line" style={{ background: '#a87e2f' }}></span>
      </div>

      <MiniGrid title="MahaDasha" data={mdGrid} dashaLabel={highlightedDashas.maha?.p} planetNum={mdNum} searchDate={formattedSearchDate} />
      <MiniGrid title="AntarDasha" data={adGrid} dashaLabel={highlightedDashas.antar?.p} planetNum={adNum} searchDate={formattedSearchDate} />
      <MiniGrid title="PratyantarDasha" data={pdGrid} dashaLabel={highlightedDashas.prat?.p} planetNum={pdNum} searchDate={formattedSearchDate} />
    </div>
  );
};

export default DashaCharts;
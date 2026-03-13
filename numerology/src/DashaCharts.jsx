import React from "react";
import LoshuAnalysis from "./LoshuAnalysis";
import MedicalAnalysis from "./MedicalAnalysis";
import Miscellaneous from "./Miscellaneous";

const MiniGrid = ({ title, data, dashaLabel, planetNum, searchDate }) => (
  <div className="dasha-section-container" style={{ width: "100%", marginBottom: "60px" }}>
    <div className="prediction-card" style={{ 
      maxWidth: "600px", 
      margin: "0 auto", 
      borderLeft: "6px solid #a87e2f",
      padding: "20px",
      position: 'relative'
    }}>
      {/* Date Badge inside each card for extra clarity */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        right: '20px',
        background: '#a87e2f',
        color: 'white',
        padding: '2px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        Status on: {searchDate}
      </div>

      <h3 className="card-title" style={{ justifyContent: "center", fontSize: "22px" }}>
        <span className="dot" style={{ backgroundColor: "#a87e2f" }}></span>
        {title}
      </h3>
      <p style={{ textAlign: "center", color: "#666" }}>
        Active: <strong>{dashaLabel} ({planetNum})</strong>
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <div className="loshu-grid" style={{ width: "240px", margin: "0" }}>
          {data.map((row, rIdx) => (
            <div key={rIdx} className="loshu-row" style={{ height: "80px" }}>
              {row.map((cell, cIdx) => {
                const dashaCount = cell.dashaNums ? cell.dashaNums.length : 0;
                const normalCount = cell.count - dashaCount;
                return (
                  <div key={cIdx} className="loshu-box">
                    <span className="grid-bg-num">{cell.num}</span>
                    <div className="num-display">
                      {[...Array(normalCount)].map((_, i) => (
                        <span key={`dob-${i}`} className="dob-num" style={{ fontSize: "1.5rem" }}>{cell.num}</span>
                      ))}
                      {cell.dashaNums?.map((_, i) => (
                        <span key={`dasha-${i}`} className="dob-num" style={{ fontSize: "1.5rem", color: "#a87e2f", fontWeight: "900" }}>{cell.num}</span>
                      ))}
                      {cell.isSpecial && <span className="fixed-num" style={{ fontSize: "1.5rem" }}>{cell.num}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ marginTop: "40px", width: "100%" }}>
      <div className="search-divider">
        <span className="divider-line"></span>
        <h2 className="search-title" style={{ fontSize: "1.4rem" }}>{title} Predictions ({searchDate})</h2>
        <span className="divider-line"></span>
      </div>
      
      <div className="dasha-grid-fix">
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
    <div className="dasha-wrapper" style={{ width: "100%", marginTop: "30px" }}>
      {/* --- Main Date Header --- */}
      <div className="search-divider" style={{ marginBottom: '40px' }}>
        <span className="divider-line" style={{ background: '#a87e2f' }}></span>
        <div style={{ textAlign: 'center' }}>
          <h2 className="search-title" style={{ color: '#a87e2f', marginBottom: '5px' }}>
            Dasha Insights For:
          </h2>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: '900', 
            color: '#b32d2d', 
            background: '#fff', 
            padding: '5px 20px', 
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
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
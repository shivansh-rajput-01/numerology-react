import React from "react";

const MiniGrid = ({ title, data, dashaLabel, planetNum }) => (
  <div
    className="prediction-card"
    style={{ flex: "1", minWidth: "300px", textAlign: "center" }}
  >
    <h3 className="card-title" style={{ justifyContent: "center" }}>
      <span className="dot" style={{ backgroundColor: "#a87e2f" }}></span>
      {title}
    </h3>
    <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
      Active Planet:{" "}
      <strong>
        {dashaLabel} ({planetNum})
      </strong>
    </p>

    <div className="loshu-grid" style={{ margin: "0 auto", width: "240px" }}>
      {data.map((row, rIdx) => (
        <div key={rIdx} className="loshu-row" style={{ height: "80px" }}>
          {row.map((cell, cIdx) => {
            // Jitne dasha numbers is cell mein hain unka count
            const dashaCount = cell.dashaNums ? cell.dashaNums.length : 0;
            const normalCount = cell.count - dashaCount;

            return (
              <div key={cIdx} className="loshu-box">
                <span className="grid-bg-num">{cell.num}</span>
                <div className="num-display">
                  {/* 1. DOB wale normal Black numbers */}
                  {[...Array(normalCount)].map((_, i) => (
                    <span
                      key={`dob-${i}`}
                      className="dob-num"
                      style={{ fontSize: "1.5rem", color: "#444" }}
                    >
                      {cell.num}
                    </span>
                  ))}

                  {/* 2. DASHA wale saare numbers (Color: #a87e2f) */}
                  {cell.dashaNums &&
                    cell.dashaNums.map((_, i) => (
                      <span
                        key={`dasha-${i}`}
                        className="dob-num"
                        style={{
                          fontSize: "1.5rem",
                          color: "#a87e2f",
                          fontWeight: "900",
                        }}
                      >
                        {cell.num}
                      </span>
                    ))}

                  {/* 3. Original Basic/Destiny Red numbers */}
                  {cell.isSpecial && (
                    <span className="fixed-num" style={{ fontSize: "1.5rem" }}>
                      {cell.num}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

const DashaCharts = ({ baseLoshu, highlightedDashas, searchDate }) => {
  if (!highlightedDashas || !highlightedDashas.maha) return null;

  // Date format change logic (YYYY-MM-DD to DD-MM-YYYY)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  };

  const planetToNum = (planet) => {
    const map = {
      Sun: 1,
      Moon: 2,
      Jupiter: 3,
      Rahu: 4,
      Mercury: 5,
      Venus: 6,
      Ketu: 7,
      Saturn: 8,
      Mars: 9,
    };
    return map[planet] || 0;
  };

  const mdNum = planetToNum(highlightedDashas.maha?.p);
  const adNum = planetToNum(highlightedDashas.antar?.p);
  const pdNum = planetToNum(highlightedDashas.prat?.p);

  // Helper to add dasha number and keep track of it
  const updateGridIncremental = (grid, newNum) => {
    return grid.map((row) =>
      row.map((cell) => {
        if (cell.num === newNum) {
          const existingDashaNums = cell.dashaNums || [];
          return {
            ...cell,
            count: cell.count + 1,
            dashaNums: [...existingDashaNums, newNum],
          };
        }
        return { ...cell };
      }),
    );
  };

  // 1. MD Chart (Base + MD)
  const mdGrid = updateGridIncremental(
    JSON.parse(JSON.stringify(baseLoshu)),
    mdNum,
  );

  // 2. AD Chart (MD Grid + AD) - Now MD and AD both will be gold
  const adGrid = updateGridIncremental(
    JSON.parse(JSON.stringify(mdGrid)),
    adNum,
  );

  // 3. PD Chart (AD Grid + PD) - Now MD, AD and PD all will be gold
  const pdGrid = updateGridIncremental(
    JSON.parse(JSON.stringify(adGrid)),
    pdNum,
  );

  return (
    <div className="analysis-container" style={{ marginTop: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h4 style={{ color: "#a87e2f", margin: "0", fontSize: "1.2rem" }}>
          Analysis for Date:{" "}
          <span style={{ color: "#444" }}>
            {formatDate(searchDate) || "Current Date"}
          </span>
        </h4>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          (Showing dynamic planetary activations in Gold)
        </p>
      </div>

      <div
        className="predictions-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        <MiniGrid
          title="MahaDasha Chart"
          data={mdGrid}
          dashaLabel={highlightedDashas.maha?.p}
          planetNum={mdNum}
        />
        <MiniGrid
          title="AntarDasha Chart"
          data={adGrid}
          dashaLabel={highlightedDashas.antar?.p}
          planetNum={adNum}
        />
        <MiniGrid
          title="Pratyantardasha Chart"
          data={pdGrid}
          dashaLabel={highlightedDashas.prat?.p}
          planetNum={pdNum}
        />
      </div>
    </div>
  );
};

export default DashaCharts;

import React, { useState } from "react";
import LoshuAnalysis from "./LoshuAnalysis";
import "./App.css";
import MedicalAnalysis from "./MedicalAnalysis";
import Miscellaneous from "./Miscellaneous";
import DashaCharts from "./DashaCharts";
import PythagoreanAnalysis from "./PythagoreanAnalysis";

const dasha1 = [
  [1, "Sun", 8],
  [2, "Moon", 16],
  [3, "Jupiter", 24],
  [4, "Rahu", 32],
  [5, "Mercury", 41],
  [6, "Venus", 49],
  [7, "Ketu", 57],
  [8, "Saturn", 65],
  [9, "Mars", 73],
];
const dSum = (n) => (n % 9 === 0 ? 9 : n % 9);
const digiSum = (...d) => dSum(d.reduce((a, b) => a + dSum(Number(b)), 0));
const calcBasic = (dob) => digiSum(dob.split("-")[2]);
const calcDestiny = (dob) => {
  let [y, m, d] = dob.split("-").map(Number);
  return digiSum(d, m, y);
};
const isLeap = (y) => (y % 100 === 0 && y % 400 !== 0 ? false : y % 4 === 0);
const change = (arr, mDays) => {
  let nM = 0;
  if (arr[1] === 1) {
    nM = 12;
    arr[1] = nM;
    arr[2]--;
  } else {
    nM = arr[1] - 1;
    arr[1] = nM;
  }
  arr[0] = mDays[nM - 1];
  return arr;
};
const calcAntar = (dob, y) => {
  let b = calcBasic(dob);
  let m = Number(dob.split("-")[1]);
  let nY = String(y).slice(-2).padStart(2, "0");
  let dK = { 0: 1, 1: 2, 2: 9, 3: 5, 4: 3, 5: 6, 6: 8 };
  let dN = new Date(`${y}-${m}-${dob.split("-")[2]}`).getDay();
  return digiSum(b, m, nY, dK[dN] || 1);
};

export default function App() {
  const [formData, setFormData] = useState({ name: "", dob: "", gender: "" });
  const [showResult, setShowResult] = useState(false);
  const [isAdvanceView, setIsAdvanceView] = useState(false);
  const [showDashaCharts, setShowDashaCharts] = useState(false);
  const [analysisType, setAnalysisType] = useState("chaldean");
  const [res, setRes] = useState({
    basic: 0,
    destiny: 0,
    name: 0,
    maha: [],
    antar: [],
    prat: [],
  });
  const [tab, setTab] = useState("maha");

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [highlightedDashas, setHighlightedDashas] = useState({
    maha: null,
    antar: null,
    prat: null,
  });

  const [isPaid, setIsPaid] = useState(true); // Default false, payment ke baad true hoga
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const handleAdvanceAccess = () => {
    if (isPaid) {
      // Agar paid hai toh Loshu Grid wale section par le jao
      setTab("loshu"); // Agla feature hum 'loshu' tab mein dalenge
    } else {
      // Agar nahi hai toh payment page/modal dikhao
      setShowPaymentGateway(true);
    }
  };

  // Helper to convert "D-M-YYYY" to a JS Date object
  const parseDate = (str) => {
    const [d, m, y] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const performSearch = (targetDateStr, currentRes) => {
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const findActive = (arr) =>
      arr.find((item) => {
        const start = parseDate(item.s);
        const end = parseDate(item.e);
        return target >= start && target <= end;
      });

    setHighlightedDashas({
      maha: findActive(currentRes.maha),
      antar: findActive(currentRes.antar),
      prat: findActive(currentRes.prat),
    });
  };

  

  const handleStartAnalysis = (e, type) => {
  e.preventDefault();

  // --- STEP 1: FORM VALIDATION ---
  
  const form = e.target.closest("form");
  if (form && !form.checkValidity()) {
    form.reportValidity(); 
    return; 
  }

  // --- STEP 2: SET ANALYSIS TYPE ---
  setAnalysisType(type);

  // --- STEP 3: LOGIC EXECUTION ---
  if (type === "chaldean") {
    const dob = formData.dob;
    const person = formData.name;
    
    // Basic & Destiny
    let b = calcBasic(dob);
    let d = calcDestiny(dob);
    
    // Name Calculation (Chaldean)
    let nName = person.trim().split(" ").join("").toLowerCase();
    let nArr = [
      [1, "a", "i", "j", "q", "y"],
      [2, "b", "k", "r"],
      [3, "c", "g", "l", "s"],
      [4, "d", "m", "t"],
      [5, "e", "h", "n"],
      [6, "u", "v", "w", "x"],
      [7, "o", "z"],
      [8, "f", "p"],
    ];
    let nS = 0;
    for (let i = 0; i < nName.length; i++) {
      for (let j = 0; j < nArr.length; j++) {
        if (nArr[j].includes(nName[i])) {
          nS += nArr[j][0];
          break;
        }
      }
    }
    let nF = dSum(nS);

    // --- Original Dasha Logic (Maha, Antar, Prat) ---

    // let mR = [];
    // let [y, m, day] = dob.split("-").map(Number);
    // let oD = day, oM = m, oY = y;
    // let sD = day, sM = m, sY = y;
    // if (sD !== 1) sD--;
    // else {
    //   let mD = isLeap(sY)
    //     ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    //     : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //   let nDate = change([sD, sM, sY], mD);
    //   sD = nDate[0]; sM = nDate[1]; sY = nDate[2];
    // }
    // let cY = sY + dasha1[b - 1][0];
    // let sI = b - 1;
    // for (let i = 0; i < 27; i++) {
    //   mR.push({
    //     s: `${oD}-${oM}-${oY}`,
    //     e: `${sD}-${sM}-${cY}`,
    //     v: dasha1[sI][0],
    //     p: dasha1[sI][1],
    //   });
    //   oY += dasha1[sI][0];
    //   sI = (sI + 1) % 9;
    //   cY += dasha1[sI][0];
    // }
    let mR = [];
let [y, m, day] = dob.split("-").map(Number);
let currentStart = new Date(y, m - 1, day); // Asli DOB se shuru

let sI = b - 1; // Basic number index

for (let i = 0; i < 27; i++) {
  let duration = dasha1[sI][0];
  
  // End Date: Start Date + Duration Years - 1 Din
  let currentEnd = new Date(currentStart);
  currentEnd.setFullYear(currentEnd.getFullYear() + duration);
  currentEnd.setDate(currentEnd.getDate() - 1);

  mR.push({
    s: `${currentStart.getDate()}-${currentStart.getMonth() + 1}-${currentStart.getFullYear()}`,
    e: `${currentEnd.getDate()}-${currentEnd.getMonth() + 1}-${currentEnd.getFullYear()}`,
    v: duration,
    p: dasha1[sI][1],
  });

  // Agli row ki Start Date = End Date + 1 Din
  currentStart = new Date(currentEnd);
  currentStart.setDate(currentStart.getDate() + 1);
  
  sI = (sI + 1) % 9;
}

    // Antar & Prat Logic (Original)
    // let aR = [];
    // let ay = Number(dob.split("-")[0]);
    // for (let i = 0; i < 3; i++) {
    //   let idx = b - 1; let itr = 0;
    //   for (let j = 0; j < 45; j++) {
    //     if (itr === dasha1[idx][0]) { itr = 0; idx = (idx + 1) % 9; }
    //     itr++;
    //     let d2 = new Date(ay + 1, m - 1, day - 1);
    //     let cA = calcAntar(dob, ay);
    //     aR.push({
    //       s: `${day}-${m}-${ay}`,
    //       e: `${d2.getDate()}-${d2.getMonth() + 1}-${d2.getFullYear()}`,
    //       m: dasha1[idx][0], a: cA, p: dasha1[cA - 1][1],
    //     });
    //     ay++;
    //   }
    // }

    let aR = [];
let [dobY, dobM, dobD] = dob.split("-").map(Number);
let adStart = new Date(dobY, dobM - 1, dobD);
let idx = b - 1; 
let itr = 0;

for(let k = 0; k < 3; k++){
  for (let j = 0; j < 45; j++) {
  if (itr === dasha1[idx][0]) {
    itr = 0;
    idx = (idx + 1) % 9;
  }
  
  let currentMD = dasha1[idx][0];
  let adEnd = new Date(adStart);
  adEnd.setFullYear(adEnd.getFullYear() + 1);
  adEnd.setDate(adEnd.getDate() - 1);

  let cA = calcAntar(dob, adStart.getFullYear());

  aR.push({
    s: `${adStart.getDate()}-${adStart.getMonth() + 1}-${adStart.getFullYear()}`,
    e: `${adEnd.getDate()}-${adEnd.getMonth() + 1}-${adEnd.getFullYear()}`,
    m: currentMD,
    a: cA,
    p: dasha1[cA - 1][1]
  });

  itr++; 
  adStart = new Date(adEnd);
  adStart.setDate(adStart.getDate() + 1);
}
}
    let pR = [];
    let py = Number(dob.split("-")[0]);
    let fD = new Date(dob);
    for (let i = 0; i < 3; i++) {
      let idx = b - 1; let itr = 0;
      for (let j = 0; j < 45; j++) {
        if (itr === dasha1[idx][0]) { itr = 0; idx = (idx + 1) % 9; }
        itr++;
        let cA = calcAntar(dob, py);
        let sP = cA - 1;
        for (let k = 1; k <= 9; k++) {
          let tD = new Date(fD);
          tD.setDate(tD.getDate() + dasha1[sP][2]);
          pR.push({
            s: `${fD.getDate()}-${fD.getMonth() + 1}-${fD.getFullYear()}`,
            e: `${tD.getDate()}-${tD.getMonth() + 1}-${tD.getFullYear()}`,
            m: dasha1[idx][0], a: cA, pr: sP + 1, p: dasha1[sP][1],
          });
          sP = (sP + 1) % 9;
          fD = k === 9 && tD.getDate() !== day
            ? new Date(tD.getFullYear(), tD.getMonth(), tD.getDate() + 1)
            : new Date(tD);
        }
        py++;
      }
    }

    // --- Loshu Grid Logic (Original) ---
    const dateParts = dob.split("-");
    const yearDigits = dateParts[0].slice(-2).split("");
    const monthDigits = dateParts[1].split("");
    const dayDigits = dateParts[2].split("");
    const loshuNumbers = [...yearDigits, ...monthDigits, ...dayDigits].map(Number).filter(n => n !== 0);
    const gridLayout = [[3, 1, 9], [6, 7, 5], [2, 8, 4]];
    const gridData = gridLayout.map(row => row.map(cellNum => ({
      num: cellNum,
      count: loshuNumbers.filter(n => n === cellNum).length,
      isSpecial: cellNum === b || cellNum === d
    })));

    setRes({
      basic: b,
      destiny: d,
      name: nF,
      maha: mR,
      antar: aR,
      prat: pR,
      loshu: gridData,
    });

    performSearch(new Date().toISOString().split("T")[0], { maha: mR, antar: aR, prat: pR });
  }

  
  setShowResult(true);
};
  return (
    <div className="astro-theme-wrapper">
      {!showResult ? (
        /* --- PAGE 0: FORM VIEW --- */
        <div className="form-container">
          <h2 className="main-title">Numerology Calculator</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box">
              <label>Birth Date</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* <div className="center-box">
              <button
                type="button"
                className="astro-btn"
                onClick={(e) => handleStartAnalysis(e, "chaldean")}
              >
                Numerology
              </button>

              <button
                type="button"
                className="astro-btn pythagorean-btn"
                onClick={(e) => handleStartAnalysis(e, "pythagorean")}
              >
                Pythagorean Numerology
              </button>
            </div> */}
            <div className="center-box">
  <button
    type="button"
    className="astro-btn"
    onClick={(e) => handleStartAnalysis(e, "chaldean")}
  >
    Numerology
  </button>

  <button
    type="button"
    className="astro-btn pythagorean-btn"
    onClick={(e) => handleStartAnalysis(e, "pythagorean")}
  >
    Pythagorean Numerology
  </button>
</div>
          </form>
        </div>
      ) : (
        /* --- MAIN DASHBOARD VIEW --- */
        <div className="result-view">
          {analysisType === "pythagorean" ? (
            /* --- NEW PORTION: PYTHAGOREAN MODE --- */
            <div className="pythagorean-mode-wrapper">
              <div className="astro-header">
                <h1>Pythagorean Analysis</h1>
                <button
                  className="reset-btn"
                  onClick={() => setShowResult(false)}
                >
                  Calculate New
                </button>
              </div>
              <PythagoreanAnalysis name={formData.name} dob={formData.dob} />
            </div>
          ) : (
            <>
              <div className="astro-header">
                <h1>
                  {isAdvanceView
                    ? "Advance Astro Arogya's Dasha Insights"
                    : "Astro Arogya's Numerology Insights"}
                </h1>

                <div style={{ display: "flex", gap: "10px" }}>
                  {isPaid && (
                    <button
                      className="reset-btn"
                      style={{ background: "#a87e2f", color: "white" }}
                      onClick={() => {
                        setIsAdvanceView(!isAdvanceView);
                        if (!isAdvanceView) setTab("loshu");
                        else setTab("maha");
                      }}
                    >
                      {isAdvanceView
                        ? "← Basic Numerology"
                        : "Advance Numerology "}
                    </button>
                  )}
                  <button
                    className="reset-btn"
                    onClick={() => {
                      setShowResult(false);
                      setIsAdvanceView(false);
                      setShowDashaCharts(false); // Reset toggle on new calc
                    }}
                  >
                    Calculate New
                  </button>
                </div>
              </div>

              {!isAdvanceView ? (
                /* ==========================================
             BASIC VIEW (Dasha, Search, Table)
             ========================================== */
                <div className="basic-view-content" style={{ width: "100%" }}>
                  <div className="ncards-row">
                    <div className="astro-card">
                      <span>Basic</span>
                      <p>{res.basic}</p>
                    </div>
                    <div className="astro-card">
                      <span>Destiny</span>
                      <p>{res.destiny}</p>
                    </div>
                    <div className="astro-card">
                      <span>Name Number</span>
                      <p>{res.name}</p>
                    </div>
                  </div>

                  <div className="search-divider">
                    <span className="divider-line"></span>
                    <h2 className="search-title">Search Dasha by Date</h2>
                    <span className="divider-line"></span>
                  </div>

                  <div className="search-section">
                    <div className="search-controls">
                      <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                      <button
                        className="astro-btn"
                        onClick={() => performSearch(searchDate, res)}
                      >
                        Search Date
                      </button>
                    </div>

                    <div className="ncards-row" style={{ marginTop: "20px" }}>
                      <div className="astro-card">
                        <span>Active MahaDasha</span>
                        <p>{highlightedDashas.maha?.p || "—"}</p>
                        <div
                          style={{
                            fontSize: "1.2rem",
                            color: "#666",
                            marginTop: "10px",
                          }}
                        >
                          {highlightedDashas.maha?.s}{" "}
                          <span style={{ color: "#b32d2d" }}>to</span>{" "}
                          {highlightedDashas.maha?.e}
                        </div>
                      </div>
                      <div className="astro-card">
                        <span>Active AntarDasha</span>
                        <p>{highlightedDashas.antar?.p || "—"}</p>
                        <div
                          style={{
                            fontSize: "1.2rem",
                            color: "#666",
                            marginTop: "10px",
                          }}
                        >
                          {highlightedDashas.antar?.s}{" "}
                          <span style={{ color: "#b32d2d" }}>to</span>{" "}
                          {highlightedDashas.antar?.e}
                        </div>
                      </div>
                      <div className="astro-card">
                        <span>Active PratiyantarDasha</span>
                        <p>{highlightedDashas.prat?.p || "—"}</p>
                        <div
                          style={{
                            fontSize: "1.2rem",
                            color: "#666",
                            marginTop: "10px",
                          }}
                        >
                          {highlightedDashas.prat?.s}{" "}
                          <span style={{ color: "#b32d2d" }}>to</span>{" "}
                          {highlightedDashas.prat?.e}
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isPaid && !showPaymentGateway && (
                    <div className="premium-lock-box">
                      <p>
                        Unlock Advance Numerology Insights (Loshu Grid & more)
                      </p>
                      <button
                        className="astro-btn premium-btn"
                        onClick={() => setShowPaymentGateway(true)}
                      >
                        Explore Advance Features @ ₹200
                      </button>
                    </div>
                  )}

                  <div className="tab-menu">
                    <button
                      className={tab === "maha" ? "active" : ""}
                      onClick={() => setTab("maha")}
                    >
                      MahaDasha
                    </button>
                    <button
                      className={tab === "antar" ? "active" : ""}
                      onClick={() => setTab("antar")}
                    >
                      AntarDasha
                    </button>
                    <button
                      className={tab === "prat" ? "active" : ""}
                      onClick={() => setTab("prat")}
                    >
                      Pratyantar
                    </button>
                  </div>

                  <div className="table-section">
                    {/* Mobile view indicator */}
                    <div className="swipe-hint" style={{ display: "none" }}>
                      {/* Ise CSS se mobile pe block kar dena */}
                    </div>

                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>MD</th>
                            {tab !== "maha" && <th>AD</th>}
                            {tab === "prat" && <th>PD</th>}
                            <th>Planet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(tab === "maha"
                            ? res.maha
                            : tab === "antar"
                              ? res.antar
                              : res.prat
                          ).map((row, i) => {
                            const isMatch =
                              (tab === "maha" &&
                                row.s === highlightedDashas.maha?.s) ||
                              (tab === "antar" &&
                                row.s === highlightedDashas.antar?.s) ||
                              (tab === "prat" &&
                                row.s === highlightedDashas.prat?.s);
                            return (
                              <tr
                                key={i}
                                className={`row-${row.p} ${isMatch ? "highlight-row" : ""}`}
                              >
                                <td>{row.s}</td>
                                <td>{row.e}</td>
                                <td>{row.v || row.m}</td>
                                {tab !== "maha" && <td>{row.a}</td>}
                                {tab === "prat" && <td>{row.pr}</td>}
                                <td style={{ fontWeight: "bold" }}>{row.p}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* ==========================================
             ADVANCE VIEW (Loshu Grid + Dasha Charts + Reports)
             ========================================== */
                <div className="advance-view-content">
                  <div className="search-divider">
                    <span className="divider-line"></span>
                    <h2 className="search-title">Vedic Grid Analysis</h2>
                    <span className="divider-line"></span>
                  </div>

                  <div className="loshu-flex-container">
                    {/* Left Side: Grid */}
                    <div className="loshu-main-side">
                      <div className="loshu-grid">
                        {res.loshu?.map((row, rowIndex) => (
                          <div key={rowIndex} className="loshu-row">
                            {row.map((cell, cellIndex) => (
                              <div key={cellIndex} className="loshu-box">
                                <span className="grid-bg-num">{cell.num}</span>
                                <div className="num-display">
                                  {[...Array(cell.count)].map((_, i) => (
                                    <span key={i} className="dob-num">
                                      {cell.num}
                                    </span>
                                  ))}
                                  {cell.isSpecial && (
                                    <span className="fixed-num">
                                      {cell.num}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side: Guide with Dots */}
                    <div className="loshu-guide-side">
                      <div className="guide-card">
                        <h3>Quick Guide</h3>
                        <ul className="guide-list">
                          <li>
                            <span className="guide-dot dob-dot"></span>
                            <div>
                              <strong>Black Digits:</strong>
                              <p>Numbers from your Birth Date.</p>
                            </div>
                          </li>
                          <li>
                            <span className="guide-dot fixed-dot"></span>
                            <div>
                              <strong>Red Digits:</strong>
                              <p>
                                Your <strong>Basic</strong> &{" "}
                                <strong>Destiny</strong> numbers.
                              </p>
                            </div>
                          </li>
                          <li>
                            <span className="guide-dot bg-dot"></span>
                            <div>
                              <strong>Small Faint:</strong>
                              <p>Original position in the grid.</p>
                            </div>
                          </li>
                        </ul>
                        <div className="tip-box">
                          Multiple numbers in one box mean stronger planetary
                          influence.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- NEW FEATURE: DASHA CHARTS TOGGLE --- */}
                  <LoshuAnalysis gridData={res.loshu} />
                  <MedicalAnalysis gridData={res.loshu} />
                  <Miscellaneous gridData={res.loshu} />
                  <div
                    className="dasha-controls"
                    style={{ margin: "40px 0 20px 0", textAlign: "center" }}
                  >
                    <button
                      className="astro-btn"
                      onClick={() => setShowDashaCharts(!showDashaCharts)}
                      style={{
                        backgroundColor: showDashaCharts ? "#fff" : "#b32d2d",
                        color: showDashaCharts ? "#b32d2d" : "#fff",
                        border: "2px solid #b32d2d",
                        minWidth: "250px",
                      }}
                    >
                      {showDashaCharts
                        ? "✕ Hide Dasha Charts"
                        : "View Dasha Charts"}
                    </button>
                  </div>

                  {showDashaCharts && (
                    <DashaCharts
                      baseLoshu={res.loshu}
                      highlightedDashas={highlightedDashas}
                      searchDate={searchDate}
                    />
                  )}

                  <hr
                    style={{
                      border: "0",
                      borderTop: "1px solid #eee",
                      margin: "40px 0",
                    }}
                  />
                </div>
              )}

              {/* --- PAYMENT MODAL --- */}
              {showPaymentGateway && (
                <div className="payment-placeholder">
                  <div className="payment-card">
                    <h2>Complete Your Purchase</h2>
                    <p>
                      Pay <strong>₹200</strong> to unlock Advance features for 1
                      year.
                    </p>
                    <div className="payment-actions">
                      <button
                        className="astro-btn"
                        onClick={() => {
                          setIsPaid(true);
                          setShowPaymentGateway(false);
                          setIsAdvanceView(true);
                          setTab("loshu");
                        }}
                      >
                        [Simulate Successful Payment]
                      </button>
                      <button
                        className="reset-btn"
                        onClick={() => setShowPaymentGateway(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "./App.css";

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
  const [res, setRes] = useState({
    basic: 0,
    destiny: 0,
    name: 0,
    maha: [],
    antar: [],
    prat: [],
  });
  const [tab, setTab] = useState("maha");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dob = formData.dob;
    const person = formData.name;
    let b = calcBasic(dob);
    let d = calcDestiny(dob);
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

    // Logic Implementation (Original)
    let mR = [];
    let [y, m, day] = dob.split("-").map(Number);
    let oD = day,
      oM = m,
      oY = y;
    let sD = day,
      sM = m,
      sY = y;
    if (sD !== 1) sD--;
    else {
      let mD = isLeap(sY)
        ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let nDate = change([sD, sM, sY], mD);
      sD = nDate[0];
      sM = nDate[1];
      sY = nDate[2];
    }
    let cY = sY + dasha1[b - 1][0];
    let sI = b - 1;
    for (let i = 0; i < 27; i++) {
      mR.push({
        s: `${oD}-${oM}-${oY}`,
        e: `${sD}-${sM}-${cY}`,
        v: dasha1[sI][0],
        p: dasha1[sI][1],
      });
      oY += dasha1[sI][0];
      sI = (sI + 1) % 9;
      cY += dasha1[sI][0];
    }

    let aR = [];
    let ay = Number(dob.split("-")[0]);
    for (let i = 0; i < 3; i++) {
      let idx = b - 1;
      let itr = 0;
      for (let j = 0; j < 45; j++) {
        if (itr === dasha1[idx][0]) {
          itr = 0;
          idx = (idx + 1) % 9;
        }
        itr++;
        let d2 = new Date(ay + 1, m - 1, day - 1);
        let cA = calcAntar(dob, ay);
        aR.push({
          s: `${day}-${m}-${ay}`,
          e: `${d2.getDate()}-${d2.getMonth() + 1}-${d2.getFullYear()}`,
          m: dasha1[idx][0],
          a: cA,
          p: dasha1[cA - 1][1],
        });
        ay++;
      }
    }

    let pR = [];
    let py = Number(dob.split("-")[0]);
    let fD = new Date(dob);
    for (let i = 0; i < 3; i++) {
      let idx = b - 1;
      let itr = 0;
      for (let j = 0; j < 45; j++) {
        if (itr === dasha1[idx][0]) {
          itr = 0;
          idx = (idx + 1) % 9;
        }
        itr++;
        let cA = calcAntar(dob, py);
        let sP = cA - 1;
        for (let k = 1; k <= 9; k++) {
          let tD = new Date(fD);
          tD.setDate(tD.getDate() + dasha1[sP][2]);
          pR.push({
            s: `${fD.getDate()}-${fD.getMonth() + 1}-${fD.getFullYear()}`,
            e: `${tD.getDate()}-${tD.getMonth() + 1}-${tD.getFullYear()}`,
            m: dasha1[idx][0],
            a: cA,
            pr: sP + 1,
            p: dasha1[sP][1],
          });
          sP = (sP + 1) % 9;
          fD =
            k === 9 && tD.getDate() !== day
              ? new Date(tD.getFullYear(), tD.getMonth(), tD.getDate() + 1)
              : new Date(tD);
        }
        py++;
      }
    }

    setRes({ basic: b, destiny: d, name: nF, maha: mR, antar: aR, prat: pR });
    setShowResult(true);
  };

  return (
    <div className="astro-theme-wrapper">
      {!showResult ? (
        /* --- COMPACT FORM VIEW --- */
        <div className="form-container">
          <h2 className="main-title">Numerology Calculator</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="center-box">
              <button type="submit" className="astro-btn">
                Predict Now
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* --- WIDE DASHBOARD VIEW --- */
        <div className="result-view">
          <div className="astro-header">
            <h1>Astro Dasha Insights</h1>
            <button className="reset-btn" onClick={() => setShowResult(false)}>
              Calculate New
            </button>
          </div>

          {/* This row now expands to fill the 1100px width */}
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

          <div className="table-wrapper">
            <table>
              <thead>
                {tab === "maha" && (
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Value</th>
                    <th>Planet</th>
                  </tr>
                )}
                {tab === "antar" && (
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>MD</th>
                    <th>AD</th>
                    <th>Planet</th>
                  </tr>
                )}
                {tab === "prat" && (
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>MD</th>
                    <th>AD</th>
                    <th>PD</th>
                    <th>Planet</th>
                  </tr>
                )}
              </thead>
              {/* <tbody>
                {(tab === "maha"
                  ? res.maha
                  : tab === "antar"
                    ? res.antar
                    : res.prat
                ).map((row, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`dot ${row.p}`}></span>
                    </td>
                    <td>{row.s}</td>
                    <td>{row.e}</td>
                    <td>{row.v || row.m}</td>
                    {tab === "antar" && <td>{row.a}</td>}
                    {tab === "prat" && <td>{row.a}</td>}
                    {tab === "prat" && <td>{row.pr}</td>}
                    <td style={{ fontWeight: "600" }}>{row.p}</td>
                  </tr>
                ))}
              </tbody> */}
              <tbody>
                {(tab === "maha"
                  ? res.maha
                  : tab === "antar"
                    ? res.antar
                    : res.prat
                ).map((row, i) => (
                  <tr key={i} className={`row-${row.p}`}>
                    {/* Starting from Start Date now, since dot is removed */}
                    <td>{row.s}</td>
                    <td>{row.e}</td>
                    <td>{row.v || row.m}</td>

                    {tab === "antar" && <td>{row.a}</td>}
                    {tab === "prat" && <td>{row.a}</td>}
                    {tab === "prat" && <td>{row.pr}</td>}

                    <td style={{ fontWeight: "bold" }}>{row.p}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

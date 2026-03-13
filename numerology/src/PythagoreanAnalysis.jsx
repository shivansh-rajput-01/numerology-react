import React from "react";
import "./Pythagorean.css";

const pythagoreanMap = {
  1: ["a", "j", "s"],
  2: ["b", "k", "t"],
  3: ["c", "l", "u"],
  4: ["d", "m", "v"],
  5: ["e", "n", "w"],
  6: ["f", "o", "x"],
  7: ["g", "p", "y"],
  8: ["h", "q", "z"],
  9: ["i", "r"],
};

const pNum = (char) => {
  for (let key in pythagoreanMap) {
    if (pythagoreanMap[key].includes(char)) return Number(key);
  }
  return 0;
};

const isVowel = (char) => ["a", "e", "i", "o", "u"].includes(char);

export default function PythagoreanAnalysis({ name, dob }) {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  const [y, m, d] = dob.split("-").map(Number);

  // Core Calculations
  const talent = (d + m + y) % 9 || 9;
  const destinySum = [...cleanName].reduce((acc, char) => acc + pNum(char), 0);
  const destiny = destinySum % 9 || 9;
  
  const vSum = [...cleanName].reduce((acc, char) => acc + (isVowel(char) ? pNum(char) : 0), 0);
  const heart = vSum % 9 || 9;
  
  const cSum = [...cleanName].reduce((acc, char) => acc + (!isVowel(char) ? pNum(char) : 0), 0);
  const personality = cSum % 9 || 9;
  
  const ultimate = (destiny + talent) % 9 || 9;
  const bday = d % 9 || 9;

  // Intensity
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  [...cleanName].forEach((char) => { counts[pNum(char)]++; });
  const lowIntense = Object.keys(counts).filter((k) => counts[k] === 0).join(", ");

  // Temperament
  const temp = [
    (counts[2] + counts[3] + counts[6]) % 9 || 9,
    (counts[7] + counts[9]) % 9 || 9,
    (counts[1] + counts[8]) % 9 || 9,
    (counts[4] + counts[5]) % 9 || 9,
  ];

  return (
    <div className="pg-main-wrapper">
      <div className="pg-container">
        
        {/* Major & Minor Section */}
        <div className="pg-row">
          <div className="pg-card">
            <h3 className="pg-title">Major Numbers</h3>
            <ul className="pg-list">
              <li><span>Talent Number:</span> <strong>{talent}</strong></li>
              <li><span>Destiny Number:</span> <strong>{destiny}</strong></li>
              <li><span>Heart Number:</span> <strong>{heart}</strong></li>
              <li><span>Personality Number:</span> <strong>{personality}</strong></li>
              <li><span>Ultimate Number:</span> <strong>{ultimate}</strong></li>
            </ul>
          </div>
          <div className="pg-card">
            <h3 className="pg-title">Minor Numbers</h3>
            <ul className="pg-list">
              <li><span>Birthday Number:</span> <strong>{bday}</strong></li>
              <li><span>Habit Number:</span> <strong>{cleanName.length % 9 || 9}</strong></li>
              <li><span>First Vowel:</span> <strong>{pNum([...cleanName].find(isVowel)) || "N/A"}</strong></li>
              <li><span>First Letter:</span> <strong>{pNum(cleanName[0]) || "N/A"}</strong></li>
            </ul>
          </div>
        </div>

        {/* Intensity Table */}
        <div className="pg-card pg-full-width">
          <h3 className="pg-title">Intensity of Numbers</h3>
          <div className="pg-table-scroll">
            <table className="pg-data-table">
              <thead>
                <tr>
                  <th>Number</th>
                  {Object.keys(counts).map(n => <th key={n}>{n}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Intensity</td>
                  {Object.values(counts).map((v, i) => <td key={i}>{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pg-hint">Low Intensity: <strong>{lowIntense || "None"}</strong></p>
        </div>

        {/* Force & Temperament */}
        <div className="pg-row">
          <div className="pg-card">
            <h3 className="pg-title">Birth Force Period</h3>
            <div className="pg-table-scroll">
              <table className="pg-data-table">
                <thead><tr><th>0-25</th><th>25-50</th><th>50+</th></tr></thead>
                <tbody><tr><td>{m}</td><td>{d}</td><td>{y}</td></tr></tbody>
              </table>
            </div>
          </div>
          <div className="pg-card">
            <h3 className="pg-title">Temperament</h3>
            <div className="pg-table-scroll">
              <table className="pg-data-table">
                <thead><tr><th>Emotional</th><th>Intuitive</th><th>Mental</th><th>Physical</th></tr></thead>
                <tbody><tr>{temp.map((v, i) => <td key={i}>{v}</td>)}</tr></tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
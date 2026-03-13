import React from "react";

import "./AnalysisStyle.css"

const pythagorean = {
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

// Helper Functions (Logic remains exactly as shared)
const pNum = (char) => {
  for (let key in pythagorean) {
    if (pythagorean[key].includes(char)) return Number(key);
  }
  return 0;
};

const isVowel = (char) => ["a", "e", "i", "o", "u"].includes(char);

const vowelSum = (name) => {
  let sum = 0;
  for (let char of name.toLowerCase()) {
    if (/[a-z]/.test(char) && isVowel(char)) sum += pNum(char);
  }
  return sum;
};

const consonantSum = (name) => {
  let sum = 0;
  for (let char of name.toLowerCase()) {
    if (/[a-z]/.test(char) && !isVowel(char) && char !== " ") sum += pNum(char);
  }
  return sum;
};

export default function PythagoreanAnalysis({ name, dob }) {
  const cleanName = name.toLowerCase();
  const [y, m, d] = dob.split("-").map(Number);

  // Core Calculations
  const talent = (d + m + y) % 9 === 0 ? 9 : (d + m + y) % 9;

  const destinySum = [...cleanName].reduce(
    (acc, char) => acc + (/[a-z]/.test(char) ? pNum(char) : 0),
    0,
  );

  const destiny = destinySum % 9 === 0 ? 9 : destinySum % 9;

  const heart = vowelSum(cleanName) % 9 === 0 ? 9 : vowelSum(cleanName) % 9;

  const personality =
    consonantSum(cleanName) % 9 === 0 ? 9 : consonantSum(cleanName) % 9;

  const ultimate = (destiny + talent) % 9 === 0 ? 9 : (destiny + talent) % 9;

  const bday = d % 9 === 0 ? 9 : d % 9;

  const firstName = cleanName.split(" ")[0];

  const nameNumVal = vowelSum(firstName) + consonantSum(firstName);

  const habitCount = [...cleanName].filter(
    (c) => c !== " " && /[a-z]/.test(c),
  ).length;

  const habit = habitCount % 9 === 0 ? 9 : habitCount % 9;

  // Intensity & Temperament
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  [...cleanName].forEach((char) => {
    if (/[a-z]/.test(char)) counts[pNum(char)]++;
  });

  const lowIntense = Object.keys(counts)
    .filter((k) => counts[k] === 0)
    .join(", ");

  const temp = [
    (counts[2] + counts[3] + counts[6]) % 9 || 9,
    (counts[7] + counts[9]) % 9 || 9,
    (counts[1] + counts[8]) % 9 || 9,
    (counts[4] + counts[5]) % 9 || 9,
  ];

  return (
    <div className="pythagorean-display">
      <div className="major-minor">
        <div className="major">
          <h3>Major Numbers</h3>
          <ul>
            <li>Talent Number: {talent}</li>
            <li>Destiny Number: {destiny}</li>
            <li>Heart Number: {heart}</li>
            <li>Personality Number: {personality}</li>
            <li>Ultimate Number: {ultimate}</li>
          </ul>
        </div>

        <div className="minor">
          <h3>Minor Numbers</h3>
          <ul>
            <li>Birthday Number: {bday}</li>
            <li>
              Name Number: {nameNumVal} / {nameNumVal % 9 || 9}
            </li>
            <li>Habit Number: {habit}</li>
            <li>
              First Vowel Number:{" "}
              {[...cleanName].find(isVowel)
                ? pNum([...cleanName].find(isVowel))
                : " "}
            </li>
            <li>
              First Letter Number:{" "}
              {pNum([...cleanName].find((c) => /[a-z]/.test(c))) || " "}
            </li>
          </ul>
        </div>
      </div>

      <div className="intensity">
        <h3>Intensity of Numbers</h3>
        <table className="py-table">
          <thead>
            <tr>
              <th key={11}>Number</th>
              {Object.keys(counts).map((num) => (
                <th key={num}>{num}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td key={12}>Intensity</td>
              {Object.values(counts).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: "15px" }}>
          Low Intensity: {lowIntense || "None"}
        </p>
      </div>

      <div className="force">
        <h3>Birth Force Period</h3>
        <table className="py-table">
          <thead>
            <tr>
              <th>0-25</th>
              <th>25-50</th>
              <th>50+</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{m}</td>
              <td>{d}</td>
              <td>{y}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="temperament">
        <h3>Temperament</h3>
        <table className="py-table">
          <thead>
            <tr>
              <th>Emotional</th>
              <th>Intuitive</th>
              <th>Mental</th>
              <th>Physical</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {temp.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
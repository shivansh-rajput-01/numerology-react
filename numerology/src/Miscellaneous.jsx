import React, { useMemo } from "react";
import "./LoshuAnalysis.css";

const Miscellaneous = ({ gridData }) => {
  const predictions = useMemo(() => {
    if (!gridData || gridData.length === 0) return [];
    const flatData = gridData.flat();
    const isPresent = (num) => {
      const cell = flatData.find((c) => c.num === num);
      return cell && (cell.count > 0 || cell.isSpecial);
    };

    const isMissing = (num) => !isPresent(num);

    const results = [];

    if (isPresent(8) && isPresent(9)) {
      results.push({
        title: "EARTH QUICK YOGA [8-9]",
        desc: [
          "A native having B/D - 9/8 then face various Up and Down in his life so not recommend to marriage.",
        ],
      });
    }

    if (
      (isPresent(1) && isPresent(7)) ||
      (isPresent(2) && isPresent(6)) ||
      (isPresent(6) && isPresent(7))
    ) {
      results.push({
        title: "AFFAIR YOGA",
        desc: [
          "There is a chance of Affair if there is a love marriage formed then Chances of Affair reduce.",
        ],
      });
    }

    const cell3 = flatData.find((c) => c.num === 3);
    const cell6 = flatData.find((c) => c.num === 6);
    const cell9 = flatData.find((c) => c.num === 9);

    if (
      (isPresent(9) && isPresent(4)) ||
      (isPresent(5) && isPresent(4)) ||
      (isPresent(8) && isPresent(4)) ||
      (cell3 && cell3.count == 3) ||
      (cell6 && cell6.count == 3) ||
      (cell9 && cell9.count == 3) ||
      (isPresent(3) && isPresent(6) && isPresent(2))
    ) {
      results.push({
        title: "Health Warning",
        desc: ["Lead to health issues"],
      });
    }

    const cell2 = flatData.find((c) => c.num === 2);
    const cell4 = flatData.find((c) => c.num === 4);
    const cell8 = flatData.find((c) => c.num === 8);
    const cell7 = flatData.find((c) => c.num === 7);

    const isOdd = (count) => count > 0 && count % 2 !== 0;

    if (
      (cell7 && cell7.count == 3) ||
      (cell4 && isOdd(cell4.count)) ||
      (cell8 && isOdd(cell8.count))
    ) {
      results.push({
        title: "Carrier",
        desc: ["Carrier Issues"],
      });
    }

    if ((isPresent(2) && isPresent(8)) || (isPresent(4) && isPresent(8))) {
      results.push({
        title: "Depressive Tendency",
        desc: [
          "Chances of depressive tendency, It should not be formed in both chart, if one has then other person try to recover one’s from depression",
        ],
      });
    }

    if (
      (cell2 && cell2.count == 3) ||
      (cell3 && cell3.count == 3) ||
      (cell6 && cell6.count == 3) ||
      (cell7 && cell7.count == 3)
    ) {
      results.push({
        title: "Divorce Risk",
        desc: [
          "It should not be formed in chart lead to divorce, if our client have these yoga then other chart should not have these yogas.",
        ],
      });
    }

    const getCount = (num) => {
      const cell = flatData.find((c) => c.num === num);
      return cell ? cell.count : 0;
    };

    // 111, 222, 333, 444
    if (getCount(1) === 3) {
      results.push({
        title: "111 - Check",
        desc: [
          "RIGID, OVER BOSSY & EGOISTIS, SHORT TEMPERED & OVER DOMINATING. IF ANTIDOT 2,8,3,7 PRESENT THEN ADJUST",
        ],
      });
    }
    if (getCount(2) === 3) {
      results.push({
        title: "222 - Check",
        desc: [
          "OVER IMOTIONAL AND DEPRESSIVE. SHOULD HAVE ATLEAST 2 NUMBERS FROM [3,1,9,5] IN CHART",
        ],
      });
    }
    if (getCount(3) === 3) {
      results.push({
        title: "333 - Check",
        desc: [
          "COMPLETE AVOID BECAUSE OF DRAMATIC, LIVER ISSUES, DISTERBANCES IN FAMILY LIFE. ANTI-DOT: [1,9,5,7] ANY ONE OR {2,8} ANY ONE.",
        ],
      });
    }
    if (getCount(4) === 3) {
      results.push({
        title: "444 - Check",
        desc: ["COMPLETE AVOID, RIGID, UP-DOWN IN LIFE, UNCERTAINITY IN LIFE"],
      });
    }

    // 555, 666, 777, 888, 999
    if (getCount(5) === 3) {
      results.push({
        title: "555 - Check",
        desc: [
          "WANT MORE FREEDOME, MORE CHANGES IN LIFE, ANXIETY, NERVES ISSEUE, FINANCIAL SCAM. [3,1,8(EVEN)] ANY 2 WILL OVERCOME PROBLEM.",
        ],
      });
    }
    if (getCount(6) === 3) {
      results.push({
        title: "666 - Check",
        desc: [
          "LITIGATION ISSUES, DEMAND FOR MORE LUXURY BUT LUXURY LESS, SPREM, GYNAE PPROBLEM IN FEMALE. [5-7-6] COMBINATION SHOULD BE IN VADIK GRID CHART",
        ],
      });
    }
    if (getCount(7) === 3) {
      results.push({
        title: "777 - Check",
        desc: [
          "DEMAND FOR UNIQIUE PARTNER, INVOLVE IN RESEARCHES, ALOPNESS, INTRESTED TO GO IN DEEP RELATION, DEEP STUDY. [1,5,6,9] ANY 2 WILL OVERCOME PROBLEM.",
        ],
      });
    }
    if (getCount(8) === 3) {
      results.push({
        title: "888 - Check",
        desc: [
          "Struggle in married life, Over helpful, Emotional, Health or Career issues. ANTIDOT 1,3,5,9 any 2 WILL OVERCOME PROBLEM.",
        ],
      });
    }
    if (getCount(9) === 3) {
      results.push({
        title: "999 - Check",
        desc: [
          "Over Dominating, Impulsive, Financial Problem, Accident prone, Highly Aggressive. ANTIDOT 3,5,7 ANY 2 WILL OVERCOME PROBLEM.",
        ],
      });
    }

    return results;
  }, [gridData]);

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="header-title">
          <h2>Relationship, Marriage, Muhrat Prediction Reports</h2>
        </div>
        <div className="engine-badge">Vedic</div>
      </div>

      <div className="predictions-grid">
        {predictions.length > 0 ? (
          predictions.map((item, idx) => (
            <div key={idx} className="prediction-card">
              <h3 className="card-title">
                <span className="dot"></span>
                {item.title}
              </h3>
              <ul className="prediction-list">
                {item.desc.map((point, pIdx) => (
                  <li key={pIdx} className="prediction-item">
                    <span className="bullet">●</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="empty-state">No special combinations detected.</div>
        )}
      </div>
    </div>
  );
};

export default Miscellaneous;

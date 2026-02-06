import React, { useMemo } from "react";
import "./LoshuAnalysis.css";

const LoshuAnalysis = ({ gridData }) => {
  const predictions = useMemo(() => {
    if (!gridData || gridData.length === 0) return [];
    const flatData = gridData.flat();
    const isPresent = (num) => {
      const cell = flatData.find((c) => c.num === num);
      return cell && (cell.count > 0 || cell.isSpecial);
    };

    const isMissing = (num) => !isPresent(num);

    const results = [];
    if (isPresent(4) && isPresent(8) && isMissing(2)) {
      results.push({
        title: "RAHU- SATURN (Moon Missing)",
        desc: [
          "Imaginary",
          "Chances of Accidents",
          "Native indulge in Bad Habits",
          "Native do plan well but not execute them.",
        ],
      });
    }

    if (isPresent(7) && isPresent(8) && isMissing(1)) {
      results.push({
        title: "KETU - SATURN (Sun missing)",
        desc: [
          "Misfortune in any perspective of Life i.e. Parents, Accidents, Marriage",
          "PESSIMISTIC",
          "Family Disturbances Issues",
        ],
      });
    }

    if (isPresent(1) && isPresent(8) && isMissing(7)) {
      results.push({
        title: "SUN - SATURN (Ketu Missing)",
        desc: [
          "Job Disturbances",
          "Family Disturbances",
          "Health issues to Father",
          "Obstacles",
          "Disrespect",
          "Loss of Government",
        ],
      });
    }

    if (isPresent(2) && isPresent(4) && isMissing(8)) {
      results.push({
        title: "MOON - RAHU (SATURN MISSING)",
        desc: [
          "Fear",
          "Family Struggle",
          "Worry",
          "Unrealistic Expectations",
          "Anxiety Problem",
          "Inferiority Complex",
          "Mental Disease",
          "Weak English",
        ],
      });
    }

    if (isPresent(9) && isPresent(4) && isMissing(5)) {
      results.push({
        title: "MARS - RAHU (Mercury Missing)",
        desc: [
          "Court, Litigation",
          "Hospital",
          "Doctor",
          "Mentally Disturbances",
          "Lawyer",
          "Take Food in Kitchen",
        ],
      });
    }

    if (isPresent(5) && isPresent(4) && isMissing(9)) {
      results.push({
        title: "MERCURY - RAHU (Mars Absent)",
        desc: [
          "Need Continuous Change in Life",
          "Clever or Sharp Minded",
          "Loss In Government Work",
          "Wise",
          "Litigation to self or in a family",
          "Disease self or in a family",
        ],
      });
    }

    if (isPresent(7) && isPresent(6) && isMissing(5)) {
      results.push({
        title: "KETU - VENUS (Mercury Missing)",
        desc: [
          "Love Affair",
          "Spirituality",
          "Instability issues",
          "Attractive",
          "Fond of Music and Art",
        ],
      });
    }

    if (isPresent(3) && isPresent(9) && isMissing(1)) {
      results.push({
        title: "JUPITER - MARS (Sun Missing)",
        desc: [
          "Meditation",
          "Intelligent",
          "Learned with Wisdom",
          "Leader",
          "Doctor",
          "Less Gain after more work",
          "Pilgrimages",
        ],
      });
    }

    if (isPresent(7) && isPresent(5) && isMissing(6)) {
      results.push({
        title: "Easy Money {(KETU -MERCURY) - VENUS Absent}",
        desc: [
          "Lucky People to get more money easily",
          "Native Work Appreciate by other people",
          "Attractive Look , Smart",
          "Easy Relationship",
          "They Make friend easily",
          "Good Speaker",
          "Good Writer",
        ],
      });
    }

    if (isPresent(3) && isPresent(6) && isMissing(2)) {
      results.push({
        title: "Don’t Want to Marry (Jupiter - Venus {Moon Absent})",
        desc: [
          "CREATIVE PEOPLE",
          "BLESSED",
          "RISE OF DESTINY AFTER MARRIAGE",
          "GOOD SOCIAL LIFE",
        ],
      });
    }

    if (isPresent(1) && isPresent(3) && isMissing(9)) {
      results.push({
        title: "SUN - JUPITER",
        desc: [
          "LEADER",
          "REPUTATED PERSON",
          "DOCTOR",
          "JUDGE",
          "RESPECTIVE PERSON",
          "WISDOM",
          "LEARNED",
          "WISE",
        ],
      });
    }

    if (isPresent(1) && isPresent(9) && isMissing(3)) {
      results.push({
        title: "SUN - MARS(Jupiter - Missing)",
        desc: [
          "SHORT TEMPERED",
          "GOOD EDUCATION",
          "READY TO HELP OTHERS",
          "AGGRESSIVE",
          "SELF -CONFIDENT",
          "LEADER",
          "ENGINER",
          "SURGEON",
        ],
      });
    }

    if (isPresent(1) && isPresent(7) && isMissing(8)) {
      results.push({
        title: "SUN - KETU",
        desc: [
          "LACK OF DOMESTIC HAPPINESS",
          "DUAL MARITAL RELATIONS",
          "COMBINATION FOR GOVERNMENT",
          "JOB, MUSICAL SCIENCE'S",
          "MISUNDERSTANDING WITH FATHERS",
        ],
      });
    }

    if (isPresent(6) && isPresent(2) && isMissing(3)) {
      results.push({
        title: "VENUS - MOON (Jupiter Missing)",
        desc: [
          "DISEASE",
          "AFFAIR PRONE",
          "VERY CREATIVE PEOPLE",
          "MUSIC AND ART LOVER",
          "CHANCES OF DIABETES AND URINARY DISEASE",
          "CAN DO EVERYTHING FOR LUXURY",
        ],
      });
    }

    if (isPresent(3) && isPresent(5) && isPresent(2)) {
      results.push({
        title: "JUPITER - MERCURY - MOON",
        desc: [
          "INVOLVED IN FINANCIAL SCAM",
          "SHARP MINDED",
          "FOREIGN TRAVEL",
          "LACK OF HAPPINESS FROM ONE’S OWN PROPERTY",
        ],
      });
    }

    if (isPresent(3) && isPresent(9) && isPresent(8)) {
      results.push({
        title: "JUPITER - MARS - SATURN",
        desc: [
          "FAMILY ISSUES",
          "EITHER NO BROTHER OR DIFFERENCES",
          "HURDELS IN EDUCATION",
        ],
      });
    }

    if (isPresent(3) && isPresent(1) && isPresent(9)) {
      results.push({
        title: "JUPITER - SUN - MARS",
        desc: [
          "STRONG PERSONALITY",
          "AGGRESSIVE",
          "SPORT-PERSON",
          "COURAGEOUS",
          "MARRIAGE DELAY",
        ],
      });
    }

    if (isPresent(5) && isPresent(6) && isPresent(7)) {
      results.push({
        title: "MERCURY - VENUS - KETU",
        desc: [
          "ULTRA LUXURIOUS",
          "BIG HOUSE",
          "HIGH LEVEL",
          "INCREASE IN FAMILY GROWTH",
        ],
      });
    }

    if (isPresent(9) && isPresent(4)) {
      results.push({
        title: "BANDHAN YOG (Mars - Rahu)",
        desc: [
          "OUTSPOKEN",
          "JACK OF ALL MASTER OF NONE",
          "PROPERTY DISPUTE",
          "MULTITASKER",
          "QUICK DECISION",
          "QUICK ACTION",
        ],
      });
    }

    if (isPresent(3) && isPresent(2)) {
      results.push({
        title: "JUPITER - MOON",
        desc: [
          "DON’T WANT TO MARRY",
          "RISE OF DESTINY AFTER MARRIAGE",
          "GYNAE RELATED ISSUES",
          "ATTRACTIVE",
          "MUSIC LOVER",
          "GOOD EDUCATION",
        ],
      });
    }

    if (isPresent(2) && isPresent(8) && isPresent(4)) {
      results.push({
        title: "MOON - SATURN - RAHU",
        desc: [
          "AGGRESSIVE",
          "ACCIDENT PRONE (CAN BE FATAL)",
          "OUTSPOKEN OR IMPULSIVE WHEN AGGRESSIVE",
          "FACES VARIOUS UPS AND DOWNS IN LIFE",
        ],
      });
    }

    if (isPresent(1) && isPresent(8)) {
      results.push({
        title: "SUN - SATURN",
        desc: [
          "STRONG INTUITION POWER",
          "BLACK TONGUE",
          "KNOWLEDGE OF TECHNICAL WORK",
          "MORE THAN ONE SOURCE OF INCOME",
          "HELPFUL BUT DOES NOT GET IN RETURN",
        ],
      });
    }

    if (isPresent(1) && isPresent(9)) {
      results.push({
        title: "SUN - MARS",
        desc: [
          "MARRIAGE ISSUES LIKE MARRIAGE DELAY",
          "INTER-CASTE MARRIAGE",
          "MANGLIK",
          "FOREIGN TRAVEL",
          "FORTUNE",
        ],
      });
    }



    return results;
  }, [gridData]);

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="header-title">
          <h2>Prediction Reports</h2>
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

export default LoshuAnalysis;

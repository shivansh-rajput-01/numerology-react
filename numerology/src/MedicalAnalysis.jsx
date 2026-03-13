import React, { useMemo } from "react";
import "./LoshuAnalysis.css";

const MedicalAnalysis = ({ gridData }) => {
  const predictions = useMemo(() => {
    if (!gridData || gridData.length === 0) return [];
    const flatData = gridData.flat();
    const isPresent = (num) => {
      const cell = flatData.find((c) => c.num === num);
      return cell && (cell.count > 0 || cell.isSpecial);
    };

    const isMissing = (num) => !isPresent(num);

    const results = [];
    // --- Unique Medical Predictions (Common with Loshu Removed) ---

    if (isPresent(1) && isPresent(8) && isMissing(7)) {
      results.push({
        title: "SUN - SATURN (Ketu Missing)",
        desc: [
          "Sun is Karaka of Bones and Saturn is Karaka of joints",
          "Arthritis",
          "Bone related disease",
          "Feel depression if native is in JOB DISTURBANCES",
          "HEALTH ISSUES TO FATHER",
          "DISRESPECT",
        ],
      });
    }

    if (isPresent(2) && isPresent(4) && isMissing(8)) {
      results.push({
        title: "MOON - RAHU (Saturn Missing)",
        desc: [
          "Mental Disease but not depression yoga because of Rahu - Confusion",
          "Feel unnecessary Fear - illusion",
          "Family Struggle",
          "Eyesight Weak",
          "Worry",
          "Anxiety Problem",
          "Inferiority Complex - Like Black Magic",
        ],
      });
    }

    if (isPresent(9) && isPresent(4) && isMissing(5)) {
      results.push({
        title: "BANDHAN YOGA , MARS - RAHU (Mercury Missing)",
        desc: [
          "Court, Litigation",
          "Hospital",
          "Doctor",
          "FIRE ACCIDENTS",
          "Bloodshed",
          "Mentally Disturbances",
          "Lawyer",
          "TAKE FOOD IN KITCHEN FOR 40 DAYS REGULARLY OR BUY AN ITEM OF FOOD/DRINK FROM HOSPITAL IN A WEEK",
        ],
      });
    }

    if (isPresent(5) && isPresent(4) && isMissing(9)) {
      results.push({
        title: "BANDHAN YOGA - MERCURY - RAHU (Mars Absent)",
        desc: [
          "Skin Issues",
          "Intestine Problems",
          "Weak eyesight",
          "Illusion in Mind",
          "Vata related issues",
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

    if (isPresent(7) && isPresent(5) && isMissing(6)) {
      results.push({
        title: "Easy Money {(KETU - MERCURY) - VENUS Absent}",
        desc: [
          "Lucky people to get more money easily",
          "Native's work appreciated by other people",
          "Attractive look, smart",
          "Easy relationships",
          "They make friends easily",
          "Good speaker",
          "Good writer",
        ],
      });
    }

    if (isPresent(1) && isPresent(7) && isMissing(8)) {
      results.push({
        title: "DISEASE - SUN - KETU",
        desc: ["Heart Disease And Cholesterol problem"],
      });
    }

    if (isPresent(6) && isPresent(2) && isMissing(3)) {
      results.push({
        title: "VENUS -MOON (Jupiter Missing)",
        desc: [
          "DISEASE",
          "CHANCES OF DIABETIES AND URINARY DISEASE",
          "CAN DO EVERTHING FOR LUXARY",
        ],
      });
    }

    if (isPresent(3) && isPresent(6) && isPresent(2)) {
      results.push({
        title: "Jupiter - Venus- Moon",
        desc: [
          "Gyanee Problem",
          "Sperms count problem",
          "Skin Disease",
          "Chances of Deafness",
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
          "DON'T WANT TO MARRY",
          "RICE OF DESTINY AFTER MARRIAGE",
          "GAYNAE RELATED ISSUES",
          "ATTRACTIVE",
          "MUSIC LOVER",
          "GOOD EDUCATIOON",
        ],
      });
    }

    if (isPresent(2) && isPresent(8) && isPresent(4)) {
      results.push({
        title: "MOON - SATURN - RAHU - 1",
        desc: [
          "AGGRESSIVE and Deep Rooted mental illness",
          "Away from Birth Place",
          "Problem With mother",
          "Accident prone can lead to Death",
          "Out Spoken or impulsive while get Aggressive",
          "Face Various UP and Down in Life",
        ],
      });
    }

    if (isPresent(1) && isPresent(8)) {
      results.push({
        title: "SUN - SARTURN",
        desc: [
          "STRONG INTUTION POWER",
          "BLACK TOUNG",
          "KNOWLEDGE OF TECHNICAL WORK",
          "MORE THAN ONE SOURCE OF INCOME",
          "HELP FUL BUT DOES NOT GET IN RETURN",
        ],
      });
    }

    if (
      isPresent(6) &&
      isPresent(4) &&
      isMissing(7) &&
      isMissing(5) &&
      isMissing(8) &&
      isMissing(2)
    ) {
      results.push({
        title: "Disease Yoga",
        desc: [
          "Here Venus is afflicting from Rahu",
          "Disease Affecting Lower Part of Body",
          "Skin Disease",
          "Gyanee Issues",
        ],
      });
    }

    if (
      isPresent(7) &&
      isPresent(2) &&
      isMissing(3) &&
      isMissing(1) &&
      isMissing(6)
    ) {
      results.push({
        title: "Disease",
        desc: [
          "Confuse Person",
          "Stress",
          "Anxiety issues",
          "Health Issues to mother",
          "Phobia",
          "Mood Swimming",
        ],
      });
    }

    if (isPresent(1) && isPresent(7) && isPresent(2)) {
      results.push({
        title: "Disease 1-7-2 (no cross)",
        desc: [
          "Joint Pain",
          "Mental issues",
          "Interested in Isolation (Aloofness)",
          "Urinary Disease",
        ],
      });
    }

    if (isPresent(1) && isPresent(7) && isPresent(4)) {
      results.push({
        title: "Disease (1-7-4 (no cross))",
        desc: [
          "EGO CONFLICTS",
          "ABUSIVE",
          "FANTACY WORLD",
          "IMPULSIVE",
          "INTOXICATION",
          "ILLEGAL DISEASE",
          "Interested to earn money in wrong way",
        ],
      });
    }

    if (isPresent(2) && isPresent(8) && isMissing(4)) {
      results.push({
        title: "DEPRESSION YOGA",
        desc: [
          "MAGNATIC AURA",
          "VERY CREATIVE",
          "HIGHLY CRYING",
          "SENSITIVE",
          "CAN’T SEE PEOPLE CRYING",
        ],
      });
    }
    const cell2 = flatData.find((c) => c.num === 2);
    if (cell2 && cell2.count >= 3) {
      results.push({
        title: "DEPRESSION YOGA (Multiple 2s)",
        desc: [
          "Mood Swimming : The Person is highly mood swimming",
          "Suicidal Tendency : Moon Is Karka of Man if Moon afflicted the chance of Suicide occur.",
          "Emotional Imbalance Person : Unable to control their emotions",
          "Depressive : Native Sick to deportation tendency",
          "Addiction : They fond of any kind of addiction like Alcohol Addiction",
          "These conditions exist at the time of Amavasya, Solar Eclipse, Lunar Eclipse",
        ],
      });
    }

    return results;
  }, [gridData]);

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="header-title">
          <h2>Medical Prediction Reports</h2>
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

export default MedicalAnalysis;

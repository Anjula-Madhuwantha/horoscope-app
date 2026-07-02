import React, { useState } from "react";

const LuckyNumbers = ({ numbers, zodiacSign }) => {
  const [spinning, setSpinning] = useState(false);
  const [displayNumbers, setDisplayNumbers] = useState(numbers || [7, 14, 21]);

  const spinNumbers = () => {
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setDisplayNumbers(
        Array.from({ length: 3 }, () => Math.floor(Math.random() * 99) + 1)
      );
      count++;
      if (count > 10) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  const luckyColors = [
    { name: "රතු", hex: "#FF6B6B", emoji: "🔴" },
    { name: "නිල්", hex: "#4ECDC4", emoji: "🔵" },
    { name: "කොළ", hex: "#6BCB77", emoji: "🟢" },
    { name: "රන්", hex: "#FFD93D", emoji: "🟡" },
    { name: "දම්", hex: "#C77DFF", emoji: "🟣" },
  ];

  const luckyGems = [
    { name: "නිල් මැණික", emoji: "💎" },
    { name: "රුවන්", emoji: "💍" },
    { name: "කතෘනාල", emoji: "🔮" },
    { name: "මොතිය", emoji: "⚪" },
  ];

  const todayAuspicious = [
    { time: "6:00 - 7:30", type: "ශ්‍රේෂ්ඨ", color: "#6BCB77" },
    { time: "9:00 - 11:00", type: "ශ්‍රේෂ්ඨ", color: "#6BCB77" },
    { time: "12:00 - 1:30", type: "සාමාන්‍ය", color: "#FFD93D" },
    { time: "3:00 - 5:00", type: "ශ්‍රේෂ්ඨ", color: "#6BCB77" },
    { time: "7:00 - 8:30", type: "ශ්‍රේෂ්ඨ", color: "#6BCB77" },
  ];

  return (
    <div className="lucky-section">
      {/* Lucky Numbers */}
      <div className="lucky-card numbers-card">
        <div className="lucky-header">
          <h3>🎯 සුභ අංක</h3>
          <button
            className={`spin-btn ${spinning ? "spinning" : ""}`}
            onClick={spinNumbers}
            disabled={spinning}
          >
            {spinning ? "⟳" : "🎲"} නැවත ගණනය
          </button>
        </div>
        <div className="numbers-display">
          {displayNumbers.map((num, i) => (
            <div
              key={i}
              className={`number-ball ${spinning ? "animate" : ""}`}
              style={{
                background:
                  zodiacSign?.color ||
                  `hsl(${i * 120}, 70%, 50%)`,
              }}
            >
              {num}
            </div>
          ))}
        </div>
        <p className="numbers-note">
          ✨ මෙම සංඛ්‍යා අද ඔබට සුභ ගෙන දෙනු ඇත
        </p>
      </div>

      {/* Lucky Colors */}
      <div className="lucky-card colors-card">
        <div className="lucky-header">
          <h3>🌈 සුභ වර්ණ</h3>
        </div>
        <div className="colors-grid">
          {luckyColors.map((color, i) => (
            <div key={i} className="color-item">
              <div
                className="color-circle"
                style={{ background: color.hex }}
              >
                <span>{color.emoji}</span>
              </div>
              <span className="color-name">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auspicious Times */}
      <div className="lucky-card times-card">
        <div className="lucky-header">
          <h3>⏰ සුභ කාල</h3>
          <span className="today-badge">අද</span>
        </div>
        <div className="times-list">
          {todayAuspicious.map((item, i) => (
            <div key={i} className="time-item">
              <span className="time-text">🕐 {item.time}</span>
              <span
                className="time-type"
                style={{ color: item.color, borderColor: item.color }}
              >
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lucky Gems */}
      <div className="lucky-card gems-card">
        <div className="lucky-header">
          <h3>💎 සුභ ගල්</h3>
        </div>
        <div className="gems-grid">
          {luckyGems.map((gem, i) => (
            <div key={i} className="gem-item">
              <span className="gem-emoji">{gem.emoji}</span>
              <span className="gem-name">{gem.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckyNumbers;
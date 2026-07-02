import React, { useState } from "react";

const LuckyNumbers = ({ horoscope, zodiacSign }) => {
  const numbers = horoscope?.luckyNumbers || [7, 14, 21, 33, 42];
  const [displayNumbers, setDisplayNumbers] = useState(numbers);
  const [spinning, setSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const spinNumbers = () => {
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const newNums = new Set();
      while (newNums.size < 5) newNums.add(Math.floor(Math.random() * 49) + 1);
      setDisplayNumbers([...newNums]);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  const color = zodiacSign?.color || "#8B5CF6";

  const auspicious = [
    { time: "6:00 - 7:30 AM", type: "ශ්‍රේෂ්ඨ", quality: 95 },
    { time: "9:00 - 11:00 AM", type: "ශ්‍රේෂ්ඨ", quality: 88 },
    { time: "12:00 - 1:30 PM", type: "සාමාන්‍ය", quality: 65 },
    { time: "3:00 - 5:00 PM", type: "ශ්‍රේෂ්ඨ", quality: 82 },
    { time: "7:00 - 8:30 PM", type: "ශ්‍රේෂ්ඨ", quality: 90 },
  ];

  const luckyColors = [
    { name: "රතු", hex: "#FF6B6B" }, { name: "නිල්", hex: "#4ECDC4" },
    { name: "කොළ", hex: "#6BCB77" }, { name: "රන්", hex: "#FFD93D" },
    { name: "දම්", hex: "#C77DFF" }, { name: "රෝස", hex: "#FF8B94" },
  ];

  const gems = [
    { name: zodiacSign?.luckyGem || "නිල් මැණික", emoji: "💎" },
    { name: "රුවන්", emoji: "💍" },
    { name: "ස්ඵටිකය", emoji: "🔮" },
    { name: "මොතිය", emoji: "⚪" },
  ];

  return (
    <div className="ln-wrap">

      <div className="ln-card ln-numbers">
        <div className="ln-card-header">
          <h3>🎯 සුභ අංක</h3>
          <button
            className={`ln-spin-btn ${spinning ? "spinning" : ""}`}
            style={{ borderColor: color, color }}
            onClick={spinNumbers}
            disabled={spinning}
          >
            {spinning ? "⟳ ගණනය..." : "🎲 නැවත ගණනය"}
          </button>
        </div>
        <div className="ln-numbers-row">
          {displayNumbers.map((num, i) => (
            <button
              key={i}
              className={`ln-num-ball ${spinning ? "anim" : ""} ${selectedNumber === num ? "selected" : ""}`}
              style={{
                background: selectedNumber === num
                  ? `linear-gradient(135deg, ${color}, ${color}88)`
                  : `linear-gradient(135deg, ${color}33, ${color}11)`,
                borderColor: color,
                color: selectedNumber === num ? "white" : color,
              }}
              onClick={() => setSelectedNumber(selectedNumber === num ? null : num)}
            >
              {num}
            </button>
          ))}
        </div>
        <p className="ln-note">✨ මෙම සංඛ්‍යා අද ඔබට සුභ ගෙන දෙනු ඇත</p>
        {selectedNumber && (
          <div className="ln-selected-note" style={{ borderColor: color, color }}>
            🎯 {selectedNumber} — ඔබේ අද දිනේ ශ්‍රේෂ්ඨ සුභ අංකය!
          </div>
        )}
      </div>

      <div className="ln-card ln-times">
        <div className="ln-card-header">
          <h3>⏰ සුභ කාල</h3>
          <span className="ln-today-badge" style={{ borderColor: color, color }}>අද</span>
        </div>
        <div className="ln-times-list">
          {auspicious.map((item, i) => (
            <div key={i} className="ln-time-row">
              <span className="ln-time-label">🕐 {item.time}</span>
              <div className="ln-time-bar-wrap">
                <div
                  className="ln-time-bar"
                  style={{
                    width: `${item.quality}%`,
                    background: item.type === "ශ්‍රේෂ්ඨ"
                      ? `linear-gradient(90deg, #6BCB7788, #6BCB77)`
                      : `linear-gradient(90deg, #FFD93D88, #FFD93D)`,
                  }}
                />
              </div>
              <span
                className="ln-time-type"
                style={{ color: item.type === "ශ්‍රේෂ්ඨ" ? "#6BCB77" : "#FFD93D" }}
              >
                {item.type} {item.quality}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ln-card ln-colors">
        <div className="ln-card-header"><h3>🌈 සුභ වර්ණ</h3></div>
        <div className="ln-colors-row">
          {luckyColors.map((c, i) => (
            <div key={i} className="ln-color-item">
              <div className="ln-color-circle" style={{ background: c.hex }}>
                <div className="ln-color-shine" />
              </div>
              <span className="ln-color-name">{c.name}</span>
            </div>
          ))}
        </div>
        <div className="ln-sign-color">
          <span>🌟 ඔබේ රාශි වර්ණය:</span>
          <span className="ln-color-dot" style={{ background: color }} />
          <strong style={{ color }}>{zodiacSign?.luckyColor}</strong>
        </div>
      </div>

      <div className="ln-card ln-gems">
        <div className="ln-card-header"><h3>💎 සුභ ගල්</h3></div>
        <div className="ln-gems-grid">
          {gems.map((gem, i) => (
            <div key={i} className="ln-gem-card" style={{ borderColor: `${color}44` }}>
              <span className="ln-gem-emoji">{gem.emoji}</span>
              <span className="ln-gem-name">{gem.name}</span>
            </div>
          ))}
        </div>
        {zodiacSign?.luckyFlower && (
          <div className="ln-flower">
            🌸 සුභ මල: <strong>{zodiacSign.luckyFlower}</strong>
          </div>
        )}
      </div>

      {horoscope?.numerology && (
        <div className="ln-card ln-numerology">
          <div className="ln-card-header"><h3>🔢 ජ්‍යොතිෂ සංඛ්‍යා</h3></div>
          <div className="ln-numer-display">
            <div className="ln-numer-ball" style={{ borderColor: color, color }}>
              <span>{horoscope.numerology}</span>
            </div>
            <div className="ln-numer-info">
              <h4>ඔබේ දෛනික සංඛ්‍යාව</h4>
              <p>මෙම සංඛ්‍යාව අද ඔබේ ශ්‍රේෂ්ඨ ජය ලකුණයි. ශ්‍රේෂ්ඨ ලෙස ගන්නා කාර්යයන්හි මෙය භාවිත කරන්න.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LuckyNumbers;
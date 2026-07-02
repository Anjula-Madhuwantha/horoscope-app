import React, { useState } from "react";
import { zodiacSigns } from "../data/zodiacData";

const ZodiacSelector = ({ onSelect, selectedSign }) => {
  const [hoveredSign, setHoveredSign] = useState(null);

  return (
    <div className="zodiac-selector">
      <div className="selector-header">
        <h2>🔮 ඔබේ රාශිය තෝරන්න</h2>
        <p>ඔබ ඉපදුණු දිනය අනුව ඔබේ රාශිය තෝරන්න</p>
      </div>

      <div className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <div
            key={sign.id}
            className={`zodiac-card ${
              selectedSign?.id === sign.id ? "selected" : ""
            } ${hoveredSign === sign.id ? "hovered" : ""}`}
            onClick={() => onSelect(sign)}
            onMouseEnter={() => setHoveredSign(sign.id)}
            onMouseLeave={() => setHoveredSign(null)}
            style={{
              "--sign-color": sign.color,
            }}
          >
            <div className="sign-symbol">{sign.symbol}</div>
            <div className="sign-emoji">{sign.emoji}</div>
            <div className="sign-name">{sign.name}</div>
            <div className="sign-date">{sign.dateRange}</div>
            <div className="sign-element">
              <span className="element-badge">
                {sign.element === "ගිනි"
                  ? "🔥"
                  : sign.element === "ජලය"
                  ? "💧"
                  : sign.element === "වාතය"
                  ? "💨"
                  : "🌍"}
                {sign.element}
              </span>
            </div>
            {selectedSign?.id === sign.id && (
              <div className="selected-badge">✓ තෝරා ඇත</div>
            )}
          </div>
        ))}
      </div>

      {selectedSign && (
        <div
          className="selected-info"
          style={{ borderColor: selectedSign.color }}
        >
          <div className="selected-detail">
            <span className="detail-symbol">{selectedSign.symbol}</span>
            <div>
              <h3>{selectedSign.name} රාශිය තෝරා ගන්නා ලදී</h3>
              <p>ග්‍රහ: {selectedSign.planet} | මූලද්‍රව්‍ය: {selectedSign.element}</p>
              <div className="traits">
                {selectedSign.traits.map((trait, i) => (
                  <span key={i} className="trait-badge">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZodiacSelector;
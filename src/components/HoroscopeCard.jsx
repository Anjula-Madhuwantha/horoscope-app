import React from "react";

/* ── Score bar sub-component ── */
const ScoreBar = ({ score, color }) => (
  <div className="hc-score-bar">
    <div
      className="hc-score-fill"
      style={{
        width: `${score}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
      }}
    />
  </div>
);

/* ── Category card sub-component ── */
const CategoryCard = ({ cat, value, score }) => (
  <div className="hc-cat-card" style={{ "--cat-color": cat.color }}>
    <div className="hc-cat-top">
      <div
        className="hc-cat-icon-wrap"
        style={{ background: `${cat.color}22` }}
      >
        <span style={{ color: cat.color, fontSize: "1.4rem" }}>{cat.icon}</span>
      </div>
      <div>
        <span className="hc-cat-emoji">{cat.emoji}</span>
        <h4 className="hc-cat-title">{cat.title}</h4>
      </div>
      <span className="hc-cat-score" style={{ color: cat.color }}>
        {score}%
      </span>
    </div>
    <p className="hc-cat-text">{value || "ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත."}</p>
    <ScoreBar score={score} color={cat.color} />
  </div>
);

/* ── Main component ── */
const HoroscopeCard = ({ horoscope, zodiacSign, loading }) => {
  /* Loading state */
  if (loading) {
    return (
      <div className="hc-card hc-loading">
        <div className="hc-loading-inner">
          <div className="hc-crystal">🔮</div>
          <h3>රාශිඵල ගෙන එමින්...</h3>
          <p>තරු සමඟ සම්බන්ධ වෙමින්...</p>
          <div className="hc-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  /* Empty state */
  if (!horoscope || !zodiacSign) {
    return (
      <div className="hc-card hc-empty">
        <div className="hc-empty-inner">
          <div className="hc-empty-icon">🌙</div>
          <h3>ඔබේ රාශිය තෝරන්න</h3>
          <p>ඉහතින් ඔබේ රාශිය තෝරා ගැනීමෙන් ඵලාපල දැනගන්න</p>
          <div className="hc-zodiac-row">
            ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
          </div>
        </div>
      </div>
    );
  }

  const scores = horoscope.scores || {};
  const overall = scores.overall || 75;

  const categories = [
    { key: "love",          icon: "❤️",  title: "ආදරය",        color: "#FF6B6B", emoji: "💕" },
    { key: "career",        icon: "💼",  title: "වෘත්තිය",      color: "#4ECDC4", emoji: "📈" },
    { key: "health",        icon: "🌿",  title: "සෞඛ්‍යය",      color: "#6BCB77", emoji: "💚" },
    { key: "finance",       icon: "💰",  title: "ධනය",          color: "#FFD93D", emoji: "💎" },
    { key: "spiritual",     icon: "🧘",  title: "ආධ්‍යාත්මික",  color: "#C77DFF", emoji: "✨" },
    { key: "relationships", icon: "👥",  title: "සබඳතා",        color: "#FF9A3C", emoji: "🤝" },
  ];

  const infoStrip = [
    { label: "ග්‍රහ",      value: zodiacSign.planet,              icon: "🪐" },
    { label: "සුබ වර්ණය",  value: zodiacSign.luckyColor,          icon: "🌈" },
    { label: "සුබ දිනය",   value: zodiacSign.luckyDay,            icon: "📅" },
    { label: "සුබ කාලය",   value: horoscope.luckyTime || "9:00 AM", icon: "⏰" },
    { label: "චන්ද්‍ර",    value: horoscope.moonPhase?.emoji || "🌕", icon: "🌙" },
    { label: "සංඛ්‍යා",    value: horoscope.numerology,           icon: "🔢" },
  ];

  return (
    <div className="hc-card" style={{ "--sign-color": zodiacSign.color }}>

      {/* ── HERO ── */}
      <div
        className="hc-hero"
        style={{
          background:
            zodiacSign.gradient ||
            `linear-gradient(135deg, ${zodiacSign.color}44, ${zodiacSign.color}11)`,
        }}
      >
        <div className="hc-hero-glow" style={{ background: zodiacSign.color }} />

        <div className="hc-hero-content">
          {/* Left — symbol */}
          <div className="hc-hero-left">
            <div
              className="hc-symbol-ring"
              style={{ borderColor: zodiacSign.color }}
            >
              <span className="hc-big-symbol">{zodiacSign.symbol}</span>
            </div>
            <span className="hc-big-emoji">{zodiacSign.emoji}</span>
          </div>

          {/* Centre — info */}
          <div className="hc-hero-center">
            <span className="hc-sign-label">ඔබේ රාශිය</span>
            <h2 className="hc-sign-name">{zodiacSign.name} රාශිය</h2>
            <p className="hc-date-range">📅 {horoscope.current_date}</p>
            <p className="hc-range">{zodiacSign.dateRange}</p>

            <div className="hc-badges">
              <span
                className="hc-badge"
                style={{
                  borderColor: zodiacSign.color,
                  color: zodiacSign.color,
                }}
              >
                🔥 {zodiacSign.element}
              </span>
              <span
                className="hc-badge"
                style={{
                  borderColor: zodiacSign.color,
                  color: zodiacSign.color,
                }}
              >
                🪐 {zodiacSign.planet}
              </span>
              {horoscope.mood && (
                <span
                  className="hc-badge hc-mood-badge"
                  style={{
                    background: `${horoscope.mood.color}22`,
                    borderColor: horoscope.mood.color,
                    color: horoscope.mood.color,
                  }}
                >
                  {horoscope.mood.emoji} {horoscope.mood.label}
                </span>
              )}
            </div>
          </div>

          {/* Right — overall ring */}
          <div className="hc-hero-right">
            <div className="hc-overall-ring">
              <svg viewBox="0 0 100 100" className="hc-ring-svg">
                <circle cx="50" cy="50" r="42" className="hc-ring-bg" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="hc-ring-fill"
                  style={{
                    strokeDasharray: `${(overall / 100) * 264} 264`,
                    stroke: zodiacSign.color,
                  }}
                />
              </svg>
              <div className="hc-overall-text">
                <span className="hc-overall-num">{overall}</span>
                <span className="hc-overall-pct">%</span>
                <span className="hc-overall-lbl">සමස්ත</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AFFIRMATION ── */}
      {horoscope.affirmation && (
        <div
          className="hc-affirmation"
          style={{ borderLeftColor: zodiacSign.color }}
        >
          <span className="hc-aff-icon">✦</span>
          <p>"{horoscope.affirmation}"</p>
        </div>
      )}

      {/* ── GENERAL PREDICTION ── */}
      <div className="hc-general">
        <div className="hc-general-icon">🌟</div>
        <div>
          <h3>සාමාන්‍ය ඵලය</h3>
          <p>
            {horoscope.general ||
              horoscope.description ||
              "අද දිනය ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත."}
          </p>
        </div>
      </div>

      {/* ── LIFE CATEGORIES ── */}
      <div className="hc-section">
        <h3 className="hc-section-title">📊 ජීවිත ක්ෂේත්‍ර විශ්ලේෂණය</h3>
        <div className="hc-cat-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              value={horoscope[cat.key]}
              score={scores[cat.key] || 70}
            />
          ))}
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <div className="hc-info-strip">
        {infoStrip.map((item, i) => (
          <div key={i} className="hc-info-item">
            <span className="hc-info-icon">{item.icon}</span>
            <span className="hc-info-label">{item.label}</span>
            <strong className="hc-info-value">{item.value}</strong>
          </div>
        ))}
      </div>

      {/* ── MOON PHASE ── */}
      {horoscope.moonPhase && (
        <div className="hc-section hc-moon-section">
          <h3 className="hc-section-title">🌙 චන්ද්‍ර ස්ථිතිය</h3>
          <div className="hc-moon-card">
            <span className="hc-moon-emoji">{horoscope.moonPhase.emoji}</span>
            <div>
              <h4>{horoscope.moonPhase.name}</h4>
              <p className="hc-moon-energy">
                ශක්තිය: <strong>{horoscope.moonPhase.energy}</strong>
              </p>
              <p className="hc-moon-desc">{horoscope.moonPhase.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── PLANETARY POSITIONS ── */}
      {horoscope.planetaryPositions && (
        <div className="hc-section">
          <h3 className="hc-section-title">🪐 ග්‍රහ ස්ථාන</h3>
          <div className="hc-planet-grid">
            {horoscope.planetaryPositions.map((p, i) => (
              <div key={i} className="hc-planet-card">
                <span className="hc-planet-emoji">{p.emoji}</span>
                <span className="hc-planet-name">{p.planet}</span>
                <span className="hc-planet-pos">{p.position}</span>
                <span
                  className="hc-planet-effect"
                  style={{
                    color:
                      p.effect === "ධනාත්මක" || p.effect === "ශ්‍රේෂ්ඨ"
                        ? "#6BCB77"
                        : "#FFD93D",
                  }}
                >
                  {p.effect}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPATIBILITY ── */}
      {horoscope.compatibility && (
        <div className="hc-section">
          <h3 className="hc-section-title">💑 රාශි ගැළපීම</h3>
          <div className="hc-compat-grid">
            <div className="hc-compat-card hc-compat-best">
              <span>⭐⭐⭐</span>
              <p>හොඳම ගැළපීම</p>
              <strong>{horoscope.compatibility.best}</strong>
            </div>
            <div className="hc-compat-card hc-compat-good">
              <span>⭐⭐</span>
              <p>හොඳ ගැළපීම</p>
              <strong>{horoscope.compatibility.good}</strong>
            </div>
            <div className="hc-compat-card hc-compat-challenge">
              <span>⚡</span>
              <p>අභියෝගය</p>
              <strong>{horoscope.compatibility.challenging}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ── SIGN DETAILS ── */}
      <div className="hc-section">
        <h3 className="hc-section-title">📖 රාශි විස්තර</h3>
        <div className="hc-details-grid">
          <div className="hc-detail-card">
            <span className="hc-detail-icon">💪</span>
            <h4>ශක්තීන්</h4>
            <ul>
              {zodiacSign.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="hc-detail-card">
            <span className="hc-detail-icon">⚠️</span>
            <h4>දුර්වලතා</h4>
            <ul>
              {zodiacSign.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
          <div className="hc-detail-card">
            <span className="hc-detail-icon">🎯</span>
            <h4>ලක්ෂණ</h4>
            <ul>
              {zodiacSign.traits?.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="hc-detail-card">
            <span className="hc-detail-icon">✨</span>
            <h4>සුභ ගල</h4>
            <p className="hc-detail-single">{zodiacSign.luckyGem}</p>
            <h4 style={{ marginTop: "10px" }}>🌸 සුභ මල</h4>
            <p className="hc-detail-single">{zodiacSign.luckyFlower}</p>
          </div>
        </div>
        <p className="hc-sign-description">{zodiacSign.description}</p>
      </div>

    </div>
  );
};

export default HoroscopeCard;
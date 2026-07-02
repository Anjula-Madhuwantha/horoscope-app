import React, { useState } from "react";

const DailyForecast = ({ zodiacSign, horoscope }) => {
  const [activeTab, setActiveTab] = useState("today");

  const forecasts = {
    today: {
      label: "අද", icon: "☀️", rating: 85,
      summary: "අද දිනය ඔබට ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත. නව අවස්ථා ලැබෙනු ඇත.",
      advice: "ධනාත්මකව සිතා ශ්‍රේෂ්ඨ ප්‍රතිඵල ලබාගන්න.",
      highlights: ["නව ව්‍යාපෘති ආරම්භ කරන්න", "සමාජ කාර්යයන් සාර්ථකයි", "ධනාත්මක ශක්තිය ඉහළයි"],
    },
    tomorrow: {
      label: "හෙට", icon: "🌤️", rating: 70,
      summary: "හෙට දිනය සාමාන්‍ය ලෙස ගෙවෙනු ඇත. ඉවසිලිවන්තකම අවශ්‍ය වේ.",
      advice: "ඉදිරිය ගැන ශ්‍රේෂ්ඨ සැලසුම් කරන්න.",
      highlights: ["ලේඛන කටයුතු ශ්‍රේෂ්ඨ", "ශ්‍රේෂ්ඨ සිදුවීම් ලැබේ", "සාමාන්‍ය ශ්‍රේෂ්ඨ"],
    },
    week: {
      label: "සතිය", icon: "📅", rating: 75,
      summary: "මෙම සතිය ඔබේ ජීවිතයේ ශ්‍රේෂ්ඨ ගෙවිලාවකි.",
      advice: "කාලය නිවැරදිව කළමනාකරණය කරන්න.",
      highlights: ["ව්‍යාපාරික ජය", "සෞඛ්‍ය ශ්‍රේෂ්ඨ", "ආදරය සොයා දෙයි"],
    },
    month: {
      label: "මාසය", icon: "🌙", rating: 80,
      summary: "මෙම මාසය ශ්‍රේෂ්ඨ ජය ලබාදෙනු ඇත.",
      advice: "ශ්‍රේෂ්ඨ ඉලක්ක සිතා ඉදිරිය ඉදිරිදිශාවේ යන්න.",
      highlights: ["මාසය ශ්‍රේෂ්ඨ", "ශ්‍රේෂ්ඨ ආදායම", "ජය ශ්‍රේෂ්ඨ"],
    },
  };

  const weekDays = horoscope?.weeklyForecast || [
    { day: "ඉරිදා", rating: 90, emoji: "☀️", highlight: "ශ්‍රේෂ්ඨ" },
    { day: "සදුදා", rating: 65, emoji: "🌤️", highlight: "සාමාන්‍ය" },
    { day: "අඟ", rating: 80, emoji: "⭐", highlight: "හොඳ" },
    { day: "බදා", rating: 75, emoji: "🌟", highlight: "හොඳ" },
    { day: "බ්‍රහ", rating: 88, emoji: "✨", highlight: "ශ්‍රේෂ්ඨ" },
    { day: "සිකු", rating: 95, emoji: "🌠", highlight: "ශ්‍රේෂ්ඨ" },
    { day: "සෙන", rating: 70, emoji: "🌙", highlight: "සාමාන්‍ය" },
  ];

  const current = forecasts[activeTab];
  const color = zodiacSign?.color || "#8B5CF6";

  return (
    <div className="df-wrap">

      <div className="df-header">
        <h3>📊 ඵලාපල දළ විශ්ලේෂණය</h3>
        <p>ඔබේ {zodiacSign?.name} රාශියේ සවිස්තරාත්මක ඵලාපල</p>
      </div>

      <div className="df-tabs">
        {Object.entries(forecasts).map(([key, val]) => (
          <button
            key={key}
            className={`df-tab ${activeTab === key ? "active" : ""}`}
            style={activeTab === key ? { borderColor: color, color } : {}}
            onClick={() => setActiveTab(key)}
          >
            <span>{val.icon}</span>
            <span>{val.label}</span>
          </button>
        ))}
      </div>

      <div className="df-content">

        <div className="df-rating-row">
          <div className="df-ring-wrap">
            <svg viewBox="0 0 100 100" className="df-ring-svg">
              <circle cx="50" cy="50" r="42" className="df-ring-bg" />
              <circle
                cx="50" cy="50" r="42"
                className="df-ring-fill"
                style={{
                  strokeDasharray: `${(current.rating / 100) * 264} 264`,
                  stroke: color,
                }}
              />
            </svg>
            <div className="df-ring-inner">
              <span className="df-ring-num">{current.rating}</span>
              <span className="df-ring-pct">%</span>
            </div>
          </div>

          <div className="df-summary">
            <h4>සාර්ථකත්ව අනුපාතය</h4>
            <p>{current.summary}</p>
            <div className="df-advice" style={{ borderLeftColor: color }}>
              <span>💡</span>
              <span>{current.advice}</span>
            </div>
            <div className="df-highlights">
              {current.highlights.map((h, i) => (
                <span key={i} className="df-highlight-tag" style={{ borderColor: color, color }}>
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="df-chart-card">
          <h4>📈 සතිය පුරා ඵලාපල</h4>
          <div className="df-chart">
            {weekDays.map((day, i) => (
              <div key={i} className="df-bar-col">
                <span className="df-bar-val">{day.rating}</span>
                <div className="df-bar-track">
                  <div
                    className="df-bar-fill"
                    style={{ height: `${day.rating}%`, background: `linear-gradient(180deg, ${color}, ${color}88)` }}
                  />
                </div>
                <span className="df-bar-emoji">{day.emoji}</span>
                <span className="df-bar-day">{day.day}</span>
                <span
                  className="df-bar-tag"
                  style={{
                    color: day.highlight === "ශ්‍රේෂ්ඨ" ? "#6BCB77"
                      : day.highlight === "හොඳ" ? "#FFD93D" : "#FF8B94"
                  }}
                >
                  {day.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {horoscope?.scores && (
          <div className="df-scores-card">
            <h4>🎯 ජීවිත ක්ෂේත්‍ර ලකුණු</h4>
            <div className="df-scores-list">
              {[
                { label: "ආදරය", key: "love", emoji: "❤️", color: "#FF6B6B" },
                { label: "වෘත්තිය", key: "career", emoji: "💼", color: "#4ECDC4" },
                { label: "සෞඛ්‍යය", key: "health", emoji: "🌿", color: "#6BCB77" },
                { label: "ධනය", key: "finance", emoji: "💰", color: "#FFD93D" },
                { label: "ආධ්‍යාත්මික", key: "spiritual", emoji: "🧘", color: "#C77DFF" },
              ].map((item) => (
                <div key={item.key} className="df-score-row">
                  <span className="df-score-label">
                    {item.emoji} {item.label}
                  </span>
                  <div className="df-score-bar-wrap">
                    <div
                      className="df-score-bar-fill"
                      style={{
                        width: `${horoscope.scores[item.key] || 70}%`,
                        background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                      }}
                    />
                  </div>
                  <span className="df-score-num" style={{ color: item.color }}>
                    {horoscope.scores[item.key] || 70}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DailyForecast;
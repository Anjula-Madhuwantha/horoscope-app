import React, { useState } from "react";

const DailyForecast = ({ zodiacSign }) => {
  const [activeTab, setActiveTab] = useState("today");

  const forecasts = {
    today: {
      label: "අද",
      icon: "☀️",
      rating: 85,
      summary:
        "අද දිනය ඔබට ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත. නව අවස්ථා ලැබෙනු ඇත.",
      advice: "ධනාත්මකව සිතා ශ්‍රේෂ්ඨ ප්‍රතිඵල ලබාගන්න.",
    },
    tomorrow: {
      label: "හෙට",
      icon: "🌤️",
      rating: 70,
      summary:
        "හෙට දිනය සාමාන්‍ය ලෙස ගෙවෙනු ඇත. ඉවසිලිවන්තකම අවශ්‍ය වේ.",
      advice: "ඉදිරිය ගැන ශ්‍රේෂ්ඨ සැලසුම් කරන්න.",
    },
    week: {
      label: "සතිය",
      icon: "📅",
      rating: 75,
      summary:
        "මෙම සතිය ඔබේ ජීවිතයේ ශ්‍රේෂ්ඨ ගෙවිලාවකි.",
      advice: "කාලය නිවැරදිව කළමනාකරණය කරන්න.",
    },
  };

  const weekDays = [
    { day: "ඉරිදා", rating: 90, emoji: "☀️" },
    { day: "සදුදා", rating: 65, emoji: "🌤️" },
    { day: "අඟ", rating: 80, emoji: "⭐" },
    { day: "බදා", rating: 75, emoji: "🌟" },
    { day: "බ්‍රහ", rating: 88, emoji: "✨" },
    { day: "සිකු", rating: 95, emoji: "🌠" },
    { day: "සෙන", rating: 70, emoji: "🌙" },
  ];

  const current = forecasts[activeTab];

  return (
    <div className="daily-forecast">
      <div className="forecast-header">
        <h3>📊 ඵලාපල දළ විශ්ලේෂණය</h3>
      </div>

      <div className="forecast-tabs">
        {Object.entries(forecasts).map(([key, val]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="forecast-content">
        <div className="forecast-rating">
          <div className="rating-circle">
            <svg viewBox="0 0 100 100" className="rating-svg">
              <circle cx="50" cy="50" r="45" className="circle-bg" />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="circle-fill"
                style={{
                  strokeDasharray: `${(current.rating / 100) * 283} 283`,
                  stroke: zodiacSign?.color || "#8B5CF6",
                }}
              />
            </svg>
            <div className="rating-number">
              <span className="number">{current.rating}</span>
              <span className="percent">%</span>
            </div>
          </div>
          <div className="rating-info">
            <h4>සාර්ථකත්ව අනුපාතය</h4>
            <p>{current.summary}</p>
            <div className="advice-box">
              <span>💡</span>
              <span>{current.advice}</span>
            </div>
          </div>
        </div>

        <div className="weekly-chart">
          <h4>📈 සතිය පුරා ඵලාපල</h4>
          <div className="chart-bars">
            {weekDays.map((day, i) => (
              <div key={i} className="chart-bar-item">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      height: `${day.rating}%`,
                      background: zodiacSign?.color || "#8B5CF6",
                    }}
                  >
                    <span className="bar-value">{day.rating}</span>
                  </div>
                </div>
                <span className="bar-emoji">{day.emoji}</span>
                <span className="bar-day">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;
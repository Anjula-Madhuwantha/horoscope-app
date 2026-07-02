import React from "react";
import {
  FaHeart,
  FaBriefcase,
  FaLeaf,
  FaCoins,
  FaStar,
} from "react-icons/fa";

const HoroscopeCard = ({ horoscope, zodiacSign, loading }) => {
  if (loading) {
    return (
      <div className="horoscope-card loading-card">
        <div className="loading-animation">
          <div className="crystal-ball">🔮</div>
          <div className="loading-text">
            <h3>රාශිඵල ගෙන එමින්...</h3>
            <p>තරු සමඟ සම්බන්ධ වෙමින්...</p>
          </div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  if (!horoscope || !zodiacSign) {
    return (
      <div className="horoscope-card empty-card">
        <div className="empty-state">
          <div className="empty-icon">🌙</div>
          <h3>ඔබේ රාශිය තෝරන්න</h3>
          <p>ඉහතින් ඔබේ රාශිය තෝරා ගැනීමෙන් ඵලාපල දැනගන්න</p>
          <div className="zodiac-symbols">
            ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    {
      key: "love",
      icon: <FaHeart />,
      title: "ආදරය",
      color: "#FF6B6B",
      emoji: "💕",
    },
    {
      key: "career",
      icon: <FaBriefcase />,
      title: "වෘත්තිය",
      color: "#4ECDC4",
      emoji: "💼",
    },
    {
      key: "health",
      icon: <FaLeaf />,
      title: "සෞඛ්‍යය",
      color: "#6BCB77",
      emoji: "💚",
    },
    {
      key: "finance",
      icon: <FaCoins />,
      title: "ධනය",
      color: "#FFD93D",
      emoji: "💰",
    },
  ];

  return (
    <div
      className="horoscope-card"
      style={{ "--sign-color": zodiacSign.color }}
    >
      {/* Header */}
      <div className="card-header" style={{ background: `linear-gradient(135deg, ${zodiacSign.color}33, ${zodiacSign.color}11)` }}>
        <div className="card-header-content">
          <div className="sign-display">
            <span className="big-symbol">{zodiacSign.symbol}</span>
            <span className="big-emoji">{zodiacSign.emoji}</span>
          </div>
          <div className="sign-info">
            <h2>{zodiacSign.name} රාශිය</h2>
            <p className="sign-date-range">📅 {horoscope.current_date}</p>
            <p className="sign-range">{zodiacSign.dateRange}</p>
          </div>
          <div className="rating-section">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  style={{
                    color: star <= 4 ? "#FFD700" : "#555",
                    fontSize: "1.2rem",
                  }}
                />
              ))}
            </div>
            <span className="rating-text">සුභ දිනය</span>
          </div>
        </div>
      </div>

      {/* General Prediction */}
      <div className="general-prediction">
        <div className="prediction-icon">🌟</div>
        <div className="prediction-text">
          <h3>සාමාන්‍ය ඵලය</h3>
          <p>
            {horoscope.general ||
              horoscope.description ||
              "අද දිනය ඔබට ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත."}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="category-card"
            style={{ "--cat-color": cat.color }}
          >
            <div className="cat-header">
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-icon" style={{ color: cat.color }}>
                {cat.icon}
              </span>
              <h4>{cat.title}</h4>
            </div>
            <p className="cat-description">
              {horoscope[cat.key] ||
                "ශ්‍රේෂ්ඨ ලෙස ගෙවෙනු ඇත."}
            </p>
            <div className="cat-meter">
              <div
                className="meter-fill"
                style={{
                  width: `${Math.floor(Math.random() * 40) + 60}%`,
                  background: cat.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Planet Info */}
      <div className="planet-info">
        <div className="planet-item">
          <span>🪐 ග්‍රහ</span>
          <strong>{zodiacSign.planet}</strong>
        </div>
        <div className="planet-item">
          <span>🌈 සුබ වර්ණය</span>
          <strong>{zodiacSign.luckyColor}</strong>
        </div>
        <div className="planet-item">
          <span>📅 සුබ දිනය</span>
          <strong>{zodiacSign.luckyDay}</strong>
        </div>
        <div className="planet-item">
          <span>⏰ සුබ කාලය</span>
          <strong>{horoscope.luckyTime || "9:00 AM"}</strong>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeCard;
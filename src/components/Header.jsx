import React, { useState, useEffect } from "react";
import { FaStar, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  const formatSinhalaDate = (date) => {
    const days = [
      "ඉරිදා",
      "සදුදා",
      "අඟහරුවාදා",
      "බදාදා",
      "බ්‍රහස්පතින්දා",
      "සිකුරාදා",
      "සෙනසුරාදා",
    ];
    const months = [
      "ජනවාරි",
      "පෙබරවාරි",
      "මාර්තු",
      "අප්‍රේල්",
      "මැයි",
      "ජූනි",
      "ජූලි",
      "අගෝස්තු",
      "සැප්තැම්බර්",
      "ඔක්තෝබර්",
      "නොවැම්බර්",
      "දෙසැම්බර්",
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <header className="header">
      <div className="header-bg">
        <div className="stars-animation">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="star-dot"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 10 + 5}px`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      </div>

      <div className="header-content">
        <div className="header-top">
          <div className="date-display">
            <FaMoon className="date-icon" />
            <span>{formatSinhalaDate(currentTime)}</span>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            title="Theme Toggle"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="header-main">
          <div className="logo-section">
            <div className="logo-icon">
              <span className="zodiac-wheel">☸</span>
            </div>
            <div className="title-section">
              <h1 className="main-title">
                <FaStar className="title-star" />
                ජෝතිශ්‍ය ඵලාපල
                <FaStar className="title-star" />
              </h1>
              <p className="subtitle">ඔබේ එදිනෙදා රාශිඵල - Daily Horoscope</p>
              <p className="tagline">
                🌟 තරු ඔබට කියන රහස් දැනගන්න 🌟
              </p>
            </div>
          </div>
        </div>

        <div className="time-display">
          <span className="clock">
            ⏰{" "}
            {currentTime.toLocaleTimeString("si-LK", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
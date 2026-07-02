import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ZodiacSelector from "./components/ZodiacSelector";
import HoroscopeCard from "./components/HoroscopeCard";
import LuckyNumbers from "./components/LuckyNumbers";
import DailyForecast from "./components/DailyForecast";
import Footer from "./components/Footer";
import { getHoroscope } from "./services/horoscopeService";
import "./App.css";

function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("selector");
  const [notification, setNotification] = useState(null);

  const handleSignSelect = async (sign) => {
    setSelectedSign(sign);
    setLoading(true);
    setActiveSection("horoscope");

    showNotification(`${sign.name} රාශියේ ඵලාපල ගෙන එමින්...`, "info");

    try {
      const result = await getHoroscope(sign.englishName, "today");
      if (result.success) {
        setHoroscope(result.data);
        showNotification(`${sign.name} රාශියේ ඵලාපල සූදානම්!`, "success");
      }
    } catch (error) {
      showNotification("දෝශයක් ඇතිවිය. නැවත උත්සාහ කරන්න.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navItems = [
    { id: "selector", label: "රාශිය", icon: "♈" },
    { id: "horoscope", label: "ඵලාපල", icon: "🔮" },
    { id: "lucky", label: "සුභ", icon: "🎯" },
    { id: "forecast", label: "පුරෝකථනය", icon: "📊" },
  ];

  return (
    <div className="app">

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>
            {notification.type === "success"
              ? "✅"
              : notification.type === "error"
              ? "❌"
              : "ℹ️"}
          </span>
          {notification.message}
        </div>
      )}

      <div className="floating-stars">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="float-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 15 + 5}px`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          >
            {["✦", "★", "✧", "⭒", "✩"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <Header />

      <nav className="main-nav">
        <div className="nav-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">

        {(activeSection === "selector" || !selectedSign) && (
          <section className="section">
            <ZodiacSelector
              onSelect={handleSignSelect}
              selectedSign={selectedSign}
            />
          </section>
        )}

        {activeSection === "horoscope" && (
          <section className="section">
            <HoroscopeCard
              horoscope={horoscope}
              zodiacSign={selectedSign}
              loading={loading}
            />
            {selectedSign && !loading && (
              <button
                className="change-sign-btn"
                onClick={() => setActiveSection("selector")}
              >
                🔄 රාශිය වෙනස් කරන්න
              </button>
            )}
          </section>
        )}

        {activeSection === "lucky" && (
          <section className="section">
            {selectedSign ? (
              <LuckyNumbers
                numbers={horoscope?.luckyNumbers}
                zodiacSign={selectedSign}
              />
            ) : (
              <div className="please-select">
                <div className="please-icon">🔮</div>
                <h3>පළමුව රාශිය තෝරන්න</h3>
                <button onClick={() => setActiveSection("selector")}>
                  රාශිය තෝරන්න →
                </button>
              </div>
            )}
          </section>
        )}

        {activeSection === "forecast" && (
          <section className="section">
            {selectedSign ? (
              <DailyForecast zodiacSign={selectedSign} />
            ) : (
              <div className="please-select">
                <div className="please-icon">📊</div>
                <h3>පළමුව රාශිය තෝරන්න</h3>
                <button onClick={() => setActiveSection("selector")}>
                  රාශිය තෝරන්න →
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
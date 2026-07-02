import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-symbol">☸</span>
          <div>
            <h3>ජෝතිශ්‍ය ඵලාපල</h3>
            <p>Daily Horoscope in Sinhala</p>
          </div>
        </div>

        <div className="footer-zodiac">
          <p>සියලු රාශි</p>
          <div className="footer-symbols">
            {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map(
              (s, i) => (
                <span key={i}>{s}</span>
              )
            )}
          </div>
        </div>

        <div className="footer-note">
          <p>
            <FaStar style={{ color: "#FFD700" }} /> ජෝතිශ්‍ය ඵලාපල විනෝදය
            සඳහා පමණි
          </p>
          <p>
            <FaHeart style={{ color: "#FF6B6B" }} /> ශ්‍රී ලංකාවේ සාම්ප්‍රදායික
            ජෝතිශ්‍ය ක්‍රමය
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ජෝතිශ්‍ය ඵලාපල | Made with{" "}
          <FaHeart style={{ color: "#FF6B6B" }} /> in Sri Lanka
        </p>
      </div>
    </footer>
  );
};

export default Footer;
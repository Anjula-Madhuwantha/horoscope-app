import { sinhalaPredictions } from "../data/zodiacData";

const AZTRO_API_URL = "https://aztro.sameerkumar.website";

/* ── Public: fetch horoscope ── */
export const getHoroscope = async (sign, day = "today") => {
  try {
    const response = await fetch(
      `${AZTRO_API_URL}/?sign=${sign}&day=${day}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    return {
      success: true,
      data: enrichHoroscopeData(data, sign),
    };
  } catch (error) {
    return getLocalPrediction(sign);
  }
};

/* ── Merge API data with local enrichment ── */
const enrichHoroscopeData = (apiData, sign) => {
  const local = getLocalPrediction(sign).data;
  return {
    ...local,
    description: apiData.description,
    compatibility: apiData.compatibility,
    mood: apiData.mood,
    color: apiData.color,
    luckyNumber: apiData.lucky_number,
    luckyTime: apiData.lucky_time,
    current_date: apiData.current_date,
    date_range: apiData.date_range,
  };
};

/* ── Full local prediction (fallback) ── */
const getLocalPrediction = (sign) => {
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const today = new Date();

  const seed = today.getDate() + today.getMonth() + sign.charCodeAt(0);
  const scores = {
    love:     55 + (seed * 7)  % 45,
    career:   55 + (seed * 11) % 45,
    health:   55 + (seed * 13) % 45,
    finance:  55 + (seed * 17) % 45,
    overall:  55 + (seed * 9)  % 45,
    spiritual:55 + (seed * 19) % 45,
  };

  return {
    success: true,
    isLocal: true,
    data: {
      general:       getRandom(sinhalaPredictions.general),
      love:          getRandom(sinhalaPredictions.love),
      career:        getRandom(sinhalaPredictions.career),
      health:        getRandom(sinhalaPredictions.health),
      finance:       getRandom(sinhalaPredictions.finance),
      spiritual:     getRandom(sinhalaPredictions.spiritual),
      relationships: getRandom(sinhalaPredictions.relationships),
      scores,
      luckyNumbers:       generateLuckyNumbers(),
      luckyTime:          getLuckyTime(),
      mood:               getMood(),
      affirmation:        getAffirmation(),
      planetaryPositions: getPlanetaryPositions(),
      moonPhase:          getMoonPhase(),
      weeklyForecast:     generateWeeklyForecast(),
      current_date: today.toLocaleDateString("si-LK", {
        weekday: "long",
        year:    "numeric",
        month:   "long",
        day:     "numeric",
      }),
      compatibility: getCompatibility(),
      numerology:    getNumerology(today),
    },
  };
};

/* ── Helpers ── */
const generateLuckyNumbers = () => {
  const nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 49) + 1);
  }
  return [...nums];
};

const getLuckyTime = () => {
  const slots = [
    "6:00 - 7:30 AM",  "8:00 - 9:30 AM",  "10:00 - 11:30 AM",
    "12:00 - 1:30 PM", "2:00 - 3:30 PM",  "4:00 - 5:30 PM",
    "7:00 - 8:30 PM",
  ];
  return slots[Math.floor(Math.random() * slots.length)];
};

const getMood = () => {
  const moods = [
    { label: "ශ්‍රේෂ්ඨ",       emoji: "😄", color: "#6BCB77" },
    { label: "සතුටු",           emoji: "😊", color: "#FFD93D" },
    { label: "සාමාන්‍ය",       emoji: "😐", color: "#4ECDC4" },
    { label: "ශ්‍රද්ධාවන්ත",   emoji: "🧘", color: "#C77DFF" },
    { label: "ශක්තිමත්",       emoji: "💪", color: "#FF6B6B" },
    { label: "නිර්මාණශීලී",   emoji: "🎨", color: "#FF9A3C" },
  ];
  return moods[Math.floor(Math.random() * moods.length)];
};

const getAffirmation = () => {
  const list = [
    "ඔබ ශ්‍රේෂ්ඨ දේ කිරීමට හැකියාව ඇත.",
    "ඔබේ ස්වප්න සිනහාලෙමු.",
    "ඔබ දිනෙන් දිනේ ශ්‍රේෂ්ඨ වෙමින් සිටිති.",
    "ඔබේ ශක්තිය අසීමිතය.",
    "ජය ඔබේ ළඟ ඇත.",
    "ඔබ ආදරය ලබාදෙනවාට සුදුසුය.",
  ];
  return list[Math.floor(Math.random() * list.length)];
};

const getCompatibility = () => {
  const signs = [
    "මේෂ", "වෘෂභ", "මිථුන", "කටක",  "සිංහ",  "කන්‍යා",
    "තුලා","වෘශ්චික","ධනු",  "මකර", "කුම්භ", "මීන",
  ];
  const shuffled = [...signs].sort(() => 0.5 - Math.random());
  return {
    best:        shuffled[0],
    good:        shuffled[1],
    challenging: shuffled[11],
  };
};

const getNumerology = (date) => {
  const sum = date.getDate() + date.getMonth() + 1 + date.getFullYear();
  const reduce = (n) =>
    n > 9
      ? reduce([...String(n)].reduce((a, b) => a + +b, 0))
      : n;
  return reduce(sum);
};

/* ── Public: moon phase ── */
export const getMoonPhase = () => {
  const phases = [
    { name: "නව චන්ද්‍ර",      emoji: "🌑", energy: "ආරම්භ",     description: "නව ආරම්භ සඳහා සුබ කාලය" },
    { name: "වර්ධමාන චන්ද්‍ර", emoji: "🌒", energy: "වර්ධනය",    description: "ඉලක්ක සඳහා ශ්‍රමය කරන්න" },
    { name: "අර්ධ චන්ද්‍ර",    emoji: "🌓", energy: "තීරණ",      description: "ශ්‍රේෂ්ඨ තීරණ ගැනීමේ කාලය" },
    { name: "ගිලෙන චන්ද්‍ර",   emoji: "🌔", energy: "ශ්‍රේෂ්ඨ",  description: "ශ්‍රේෂ්ඨ ශක්තිය පිරී ඇත" },
    { name: "පූර්ණ චන්ද්‍ර",   emoji: "🌕", energy: "ඉසුරු",     description: "ජය ශ්‍රේෂ්ඨ ලෙස ලැබේ" },
    { name: "ක්ෂීයමාන චන්ද්‍ර",emoji: "🌖", energy: "මුදාහැරීම", description: "පරිස්සමෙන් ජීවත් වන්න" },
    { name: "සිහිල් චන්ද්‍ර",  emoji: "🌗", energy: "සංශෝධනය",  description: "ගෙවුණු ඡේදය සමාලෝචනය" },
    { name: "ශේෂ චන්ද්‍ර",     emoji: "🌘", energy: "ඉවසීම",     description: "විශ්‍රාම ගෙන නව ශ්‍රේෂ්ඨ යාත්‍රාවකට" },
  ];
  return phases[Math.floor(Math.random() * phases.length)];
};

/* ── Public: planetary positions ── */
export const getPlanetaryPositions = () => {
  const positions = ["ශ්‍රේෂ්ඨ", "සාමාන්‍ය", "ශ්‍රද්ධාශීලී", "ශක්තිමත්", "සමබල"];
  const effects   = ["ධනාත්මක", "මධ්‍යස්ත",  "ශ්‍රේෂ්ඨ",    "ශ්‍රද්ධාවන්ත"];
  return [
    { planet: "සූර්ය",  emoji: "☀️", position: positions[0], effect: effects[0] },
    { planet: "චන්ද්‍ර",emoji: "🌙", position: positions[1], effect: effects[1] },
    { planet: "අඟහරු", emoji: "♂️", position: positions[2], effect: effects[2] },
    { planet: "බුධ",    emoji: "☿",  position: positions[3], effect: effects[0] },
    { planet: "සිකුරු", emoji: "♀️", position: positions[4], effect: effects[3] },
    { planet: "ගුරු",   emoji: "♃",  position: positions[0], effect: effects[2] },
  ];
};

/* ── Private: weekly forecast ── */
const generateWeeklyForecast = () => {
  const days   = ["ඉරිදා","සදුදා","අඟ","බදා","බ්‍රහ","සිකු","සෙන"];
  const emojis = ["☀️","🌤️","⭐","🌟","✨","🌠","🌙"];
  return days.map((day, i) => ({
    day,
    emoji:     emojis[i],
    rating:    55 + Math.floor(Math.random() * 45),
    highlight: ["ශ්‍රේෂ්ඨ","සාමාන්‍ය","ශ්‍රද්ධාශීලී"][Math.floor(Math.random() * 3)],
  }));
};
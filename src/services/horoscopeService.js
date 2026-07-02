import { sinhalaPredictions } from "../data/zodiacData";

const AZTRO_API_URL = "https://aztro.sameerkumar.website";

export const getHoroscope = async (sign, day = "today") => {
  try {
    const response = await fetch(
      `${AZTRO_API_URL}/?sign=${sign}&day=${day}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        description: data.description,
        compatibility: data.compatibility,
        mood: data.mood,
        color: data.color,
        luckyNumber: data.lucky_number,
        luckyTime: data.lucky_time,
        date_range: data.date_range,
        current_date: data.current_date,
      },
    };
  } catch (error) {
    console.log("Using local predictions as fallback");
    return getLocalPrediction(sign);
  }
};

const getLocalPrediction = (sign) => {
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const today = new Date();
  const luckyNumbers = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 99) + 1
  );

  return {
    success: true,
    isLocal: true,
    data: {
      general: getRandom(sinhalaPredictions.general),
      love: getRandom(sinhalaPredictions.love),
      career: getRandom(sinhalaPredictions.career),
      health: getRandom(sinhalaPredictions.health),
      finance: getRandom(sinhalaPredictions.finance),
      luckyNumbers,
      luckyTime: getLuckyTime(),
      current_date: today.toLocaleDateString("si-LK", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };
};

const getLuckyTime = () => {
  const hours = [
    "6:00 AM",
    "9:00 AM",
    "11:00 AM",
    "2:00 PM",
    "4:00 PM",
    "7:00 PM",
  ];
  return hours[Math.floor(Math.random() * hours.length)];
};

export const getMoonPhase = () => {
  const phases = [
    { name: "නව චන්ද්‍ර", emoji: "🌑" },
    { name: "වර්ධමාන චන්ද්‍ර", emoji: "🌒" },
    { name: "අර්ධ චන්ද්‍ර", emoji: "🌓" },
    { name: "පූර්ණ චන්ද්‍ර", emoji: "🌕" },
    { name: "ක්ෂීයමාන චන්ද්‍ර", emoji: "🌖" },
  ];
  return phases[Math.floor(Math.random() * phases.length)];
};

export const getPlanetaryPositions = () => {
  return [
    { planet: "සූර්ය ☀️", position: "ශ්‍රේෂ්ඨ", effect: "ධනාත්මක" },
    { planet: "චන්ද්‍ර 🌙", position: "සාමාන්‍ය", effect: "මධ්‍යස්ත" },
    { planet: "අඟහරු ♂️", position: "ශක්තිමත්", effect: "ශ්‍රේෂ්ඨ" },
    { planet: "බුධ ☿", position: "සාමාන්‍ය", effect: "මධ්‍යස්ත" },
  ];
};
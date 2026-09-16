export const getTraffic = (area) => {
  const levels = ["Low", "Medium", "Heavy"];

  const randomIndex = Math.floor(Math.random() * levels.length);

  const level = levels[randomIndex];

  return {
    level: level,
    message:
      level === "Heavy"
        ? "⚠ Heavy Traffic - Delay expected"
        : level === "Medium"
        ? "⚠ Moderate Traffic"
        : "✔ Smooth Traffic",
  };
};
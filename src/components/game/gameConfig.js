// Dynamic game configuration for the betting template.
// Each game defines its name, draw rules, betting tabs and grid (odds).

const genNumbers = (n, odds, start = 0) =>
  Array.from({ length: n }, (_, i) => ({ label: String(start + i), odds }));

export const GAME_CONFIGS = {
  "may-man-28": {
    name: "Hàn Quốc may mắn 28",
    gameType: "lucky28",
    drawCount: 3,
    bigThreshold: 13,
    roundSeconds: 60,
    tabs: [
      {
        id: "tron",
        label: "Trôn",
        sections: [
          {
            columns: 2,
            items: [
              { label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" },
              { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" },
              { label: "Đơn hàng lớn", odds: "3.98" }, { label: "Đôi lớn", odds: "3.98" },
              { label: "Danh sách nhỏ", odds: "3.98" }, { label: "Đôi nhỏ", odds: "3.98" },
            ],
          },
          {
            columns: 3,
            items: [
              { label: "Lớn", odds: "13" }, { label: "Cực nhỏ", odds: "13" }, { label: "Báo", odds: "60" },
              { label: "Sóng đỏ", odds: "2.9" }, { label: "Sóng xanh", odds: "2.9" }, { label: "Sóng xanh dương", odds: "2.9" },
            ],
          },
        ],
      },
      { id: "ma-dac-biet", label: "Mã đặc biệt", sections: [{ columns: 2, items: genNumbers(10, "9.9") }] },
      { id: "biet", label: "Biệt", sections: [{ columns: 2, items: genNumbers(10, "19.8") }] },
    ],
  },
  "pk10": {
    name: "Đài Loan PK10",
    gameType: "pk10",
    drawCount: 10,
    bigThreshold: 45,
    roundSeconds: 90,
    tabs: [
      {
        id: "champion",
        label: "Vô địch",
        sections: [
          { columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] },
          { columns: 5, items: genNumbers(10, "9.9") },
        ],
      },
      { id: "top3", label: "Top 3", sections: [{ columns: 5, items: genNumbers(10, "9.9") }] },
      { id: "sum", label: "Tổng điểm", sections: [{ columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] }] },
    ],
  },
  "xoso": {
    name: "Thời gian Đài Loan",
    gameType: "xoso",
    drawCount: 1,
    bigThreshold: 5,
    roundSeconds: 300,
    tabs: [
      {
        id: "dac-biet",
        label: "Đặc biệt",
        sections: [
          { columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }, { label: "Bao lô", odds: "3.98" }] },
          { columns: 5, items: genNumbers(10, "9.9") },
        ],
      },
      { id: "nhat", label: "Giải nhất", sections: [{ columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] }] },
      { id: "nhi", label: "Giải nhì", sections: [{ columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] }] },
    ],
  },
  "casino": {
    name: "Casino",
    gameType: "casino",
    drawCount: 3,
    bigThreshold: 4,
    roundSeconds: 45,
    tabs: [
      { id: "baccarat", label: "Baccarat", sections: [{ columns: 3, items: [{ label: "Player", odds: "1.98" }, { label: "Banker", odds: "1.98" }, { label: "Tie", odds: "8" }, { label: "Player Pair", odds: "11" }, { label: "Banker Pair", odds: "11" }, { label: "Lucky 6", odds: "12" }] }] },
      { id: "roulette", label: "Roulette", sections: [{ columns: 3, items: [{ label: "Đỏ", odds: "1.98" }, { label: "Đen", odds: "1.98" }, { label: "Xanh", odds: "8" }, { label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] }] },
      { id: "dragon-tiger", label: "Rồng Hổ", sections: [{ columns: 3, items: [{ label: "Rồng", odds: "1.98" }, { label: "Hổ", odds: "1.98" }, { label: "Hòa", odds: "8" }] }] },
    ],
  },
  "slot": {
    name: "Slot",
    gameType: "slot",
    drawCount: 3,
    bigThreshold: 14,
    roundSeconds: 30,
    tabs: [
      { id: "classic", label: "Cổ điển", sections: [{ columns: 2, items: [{ label: "Lớn", odds: "1.98" }, { label: "Nhỏ", odds: "1.98" }, { label: "Đơn", odds: "1.98" }, { label: "Đôi", odds: "1.98" }] }] },
      { id: "jackpot", label: "Jackpot", sections: [{ columns: 3, items: [{ label: "3 BAR", odds: "20" }, { label: "3 Cherry", odds: "8" }, { label: "3 Seven", odds: "15" }, { label: "Bất kỳ", odds: "1.5" }] }] },
      { id: "bonus", label: "Bonus", sections: [{ columns: 2, items: [{ label: "Bonus Lớn", odds: "3.98" }, { label: "Bonus Nhỏ", odds: "3.98" }] }] },
    ],
  },
};

export const getGameConfig = (gameId) => GAME_CONFIGS[gameId] || GAME_CONFIGS["may-man-28"];

export const BALL_COLORS = ["#e23b3b", "#2e7d32", "#d81b60", "#1565c0", "#f9a825", "#6a1b9a", "#00838f", "#bf360c", "#455a64", "#ad1457"];

export const computeDrawLabels = (drawn, threshold) => {
  const sum = (drawn || []).reduce((a, b) => a + b, 0);
  return {
    sum,
    big: sum >= threshold ? "Lớn" : "Nhỏ",
    parity: sum % 2 === 1 ? "Đơn" : "Đôi",
  };
};

export const CHIPS = [10, 50, 100, 200, 500, 1000];
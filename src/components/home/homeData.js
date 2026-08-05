// Mock data source for the Home page (games, announcements, categories).

export const CATEGORIES = [
  { key: "all", labelKey: "cat_all" },
  { key: "lucky28", labelKey: "cat_lucky28" },
  { key: "xoso", labelKey: "cat_xoso" },
  { key: "pk10", labelKey: "cat_pk10" },
  { key: "slot", labelKey: "cat_slot" },
  { key: "casino", labelKey: "cat_casino" },
];

export const GAMES = [
  { id: "g1", gameId: "may-man-28", title: "Hàn Quốc may mắn 28", category: "lucky28", badge: "hot", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3b2df2e2c_4c343a3c4_2f02652a8036143883dbcb8537a0c05f42aa1f0e.png",
    titleClass: "text-figma-12 font-bold font-figma-inter leading-figma-17 text-[#ccb2eb]" },
  { id: "g2", gameId: "may-man-28", title: "New Zealand may mản 28", category: "lucky28", badge: "new", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d71b34984_45923ba29_5a123522383065620c2e37f1c4db6db9a30257d2.png",
    titleClass: "text-figma-11 font-normal font-paragraph leading-figma-31 text-[#d3bced]" },
  { id: "g3", gameId: "may-man-28", title: "May mản 28", category: "lucky28", badge: "hot", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/01edaa7eb_ed717bccf_2bb4ec263b6033bc8c29effe31de00492a6e62e3.png",
    titleClass: "text-figma-12 font-bold font-figma-inter leading-figma-17 text-[#d5bdec]" },
  { id: "g4", gameId: "xoso", title: "Thời gian Đài Loan", category: "xoso", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/dda59ff9c_256458f2e_a62a8a4560ccd427df8c1d3c9722019b44f243c5.png",
    titleClass: "text-figma-14 font-bold font-figma-news-cycle leading-figma-16 text-[#d2baec]" },
  { id: "g5", gameId: "xoso", title: "Thời gian Hàn Quốc", category: "xoso", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/915a8cc57_ad0256a57_eac5849fc6cb956f243bed385ae7717e7e3041b2.png",
    titleClass: "text-figma-12 font-bold font-figma-arimo leading-figma-17 text-[#cbb2ea]" },
  { id: "g6", gameId: "xoso", title: "Thời gian New Zealand", category: "xoso", status: "maintenance",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/09b3e1e3c_c8d147013_ed16e4f9174b2595b5666f82bc2d002688ccc734.png",
    titleClass: "text-figma-11 font-bold font-figma-arimo leading-figma-14 text-[#d1b8e9]" },
  { id: "g7", gameId: "pk10", title: "Đài Loan PK10", category: "pk10", badge: "hot", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b4f9873da_f71a46949_916de5bd1f54693d74531ac5b2e584eae8b0f777.png",
    overlay: { src: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b19be242e_292e7a944_5952b8f1ffb770a13601dc2d2c3e286f08149e5d.png", cls: "absolute top-[14px] left-[21px] w-[90px] h-[75px] object-contain z-10" },
    titleClass: "text-figma-13 font-bold font-figma-manrope leading-figma-15 text-[#c9afe8]" },
  { id: "g8", gameId: "pk10", title: "Hàn Quốc PK10", category: "pk10", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/04566b866_8e622d903_89a367f77b66fa20dae581e3ef944ddc941d1f08.png",
    overlay: { src: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/86af2d866_d6b9a21b7_937168ca48d3af77bc7be2801bd865606032ef8f.png", cls: "absolute top-[20px] left-[15px] w-[102px] h-[74px] object-contain z-10" },
    titleClass: "text-figma-12 font-bold font-figma-arimo leading-figma-17 text-[#d9c5ee]" },
  { id: "g9", gameId: "pk10", title: "Việt Nam PK10", category: "pk10", status: "active",
    bg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/38febe088_1eabcfca9_d156668801802b58119f12682f7a120ece51a035.png",
    titleClass: "text-figma-12 font-bold font-figma-arimo leading-figma-16 text-[#d6c3ec]" },

];

export const getGameById = (id) => GAMES.find((g) => g.id === id);

export const ANNOUNCEMENTS = [
  { id: "a1", title: "★ NguyenHa thắng 5.200.000 coin tại May mắn 28 Hàn Quốc!", detail: "Vào lúc 09:32 sáng nay, người chơi NguyenHa đã trúng giải đặc biệt tại phòng May mắn 28 Hàn Quốc với tổng thưởng 5.200.000 coin. Chúc mừng người chơi may mắn!" },
  { id: "a2", title: "Sự kiện: Nạp lần đầu tặng 50% đến 2.000.000 coin", detail: "Từ 01/08 - 15/08, thành viên mới nạp lần đầu sẽ nhận thưởng 50% giá trị nạp, tối đa 2.000.000 coin. Áp dụng cho tất cả phương thức thanh toán." },
  { id: "a3", title: "Bảo trì hệ thống Xổ số Đài Loan 02:00 - 03:00 ngày 06/08", detail: "Hệ thống Xổ số Đài Loan sẽ tạm bảo trì để nâng cấp từ 02:00 đến 03:00 ngày 06/08/2026. Các cược đang chờ sẽ được giữ nguyên. Xin lỗi vì sự bất tiện." },
];
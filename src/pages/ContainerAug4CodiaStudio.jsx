import React from "react";
import { motion } from "framer-motion";

export default function ContainerAug4CodiaStudio() {
  const listData = [
    {
      id: 1,
      height: 184,
      bgImg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/ea6d2b7cb_6a861687b_261e23549907efd611440ab2fccd145efb8ce9fd.png",
      icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/de59952f8_01bd103b7_ed4b66b8274561b2f6f781d949ca1677246f36ee.png",
      title: "May mắn 28",
      titleColor: "text-[#bfa22d]",
      chartColor: "text-[#8d323e]",
      chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f465a8eab_3f85146d1_3bf036e0a112b0c6b62adc7304039700c732f29b.png",
      subText: "Vào xem Giải Thưởng",
      subColor: "text-[#686a70]",
    },
    {
      id: 2,
      height: 183,
      bgImg: null,
      icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/7773452e0_8b263af52_50cca99ec8608d48e1f0ebfde3cf1616c9961d93.png",
      title: "New Zealand may mn 28",
      titleColor: "text-[#b4992d]",
      chartColor: "text-[#9e3c44]",
      chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/7080c8c79_6dde4c224_699b6a8c5a0009c91c49f2062473a71ab2dd69e7.png",
      subText: "Vào xem Giải Thưởng",
      subColor: "text-[#6c6d73]",
    },
    {
      id: 3,
      height: 179,
      bgImg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a2ba320dd_0d67ed007_f3378e692a4544720ea94aa5e5f52c6e0899e607.png",
      icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/fe8e3af58_08f1005d9_78e354c39715d0e23cb12d6bbcdc1a4dac9b0357.png",
      title: "Hàn Quốc may mắn 28",
      titleColor: "text-[#c8aa2d]",
      chartColor: "text-[#9f3e4c]",
      chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e0ddf737d_37493dc8c_365687be63810517cfc13766ec5bbb3f6d06dc05.png",
      subText: "Vào xem Giải Thưởng",
      subColor: "text-[#6d6d73]",
    },
    {
      id: 4,
      height: 193,
      bgImg: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/90c97aad6_9f86ee4d3_f3c5d9fd6bbdbe6b6c7315e0ac706c1af4ff2e39.png",
      icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/fde491dc7_558245cf7_5c2b9ff0f40b7464dd66e62e7de61c19b6ae8478.png",
      title: "Thời gian Đài Loan",
      titleColor: "text-[#c0a32f]",
      chartColor: "text-[#9d3946]",
      chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/40ca688ab_f9c945587_df09bbfe9eb1d0f0bfd82810d271a4764bcae456.png",
      subText: "Vào xem Giải Thưởng",
      subColor: "text-[#6d6d72]",
    },
  ];

  const row5 = {
    id: 5,
    height: 192,
    icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d97c4dd5b_ed2bdfa35_0d1d1f74e06a555aa782fc21aefc610caa4d34bd.png",
    title: "Thời gian Hàn Quốc",
    titleColor: "text-[#c2a62a]",
    chartColor: "text-figma-text-9-2",
    chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/49696a82a_aa1d53020_6938179bfdf0a5a023db7987a19b77dc4927bd9e.png",
    subText: "Vào xem Giải Thưởng",
    subColor: "text-figma-text-8-2",
  };

  const row6 = {
    id: 6,
    height: 164,
    icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2016d3021_2d7180363_287013f6c604b60a9c1e039f22f68111aa2aaece.png",
    title: "Thòi gian New Zealand",
    titleColor: "text-figma-text-7-2",
    chartColor: "text-figma-text-6-2",
    chevron: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d078f8d5f_acfe415f9_a47cb237cff7181c767c40e3cffb71f7e79f3477.png",
    subText: "Vào xem Giai Thuong",
    subColor: "text-figma-text-5-2",
  };

  const row7 = {
    id: 7,
    height: 80,
    icon: "https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/268806a8b_a139dd20b_9979bf9de6df5da988fb15747aa45028f3fbfd74.png",
    title: "Đài Loan PK10",
    titleColor: "text-figma-text-4-2",
  };

  const ListItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full flex flex-col justify-center"
      style={{ minHeight: `${item.height}px` }}
    >
      {item.bgImg && (
        <div className="absolute inset-0 z-0 overflow-clip pointer-events-none">
          <img src={item.bgImg} alt="" className="w-full h-full object-cover object-center" />
        </div>
      )}
      <div className="relative z-10 flex flex-col w-full h-full pt-[27px] pb-[20px]">
        <div className="flex flex-row items-center w-full pl-[18px] pr-[15px]">
          <img src={item.icon} alt="" className="w-[74px] h-[76px] shrink-0 object-cover" />
          <div className="ml-[12px] flex-1 flex flex-col justify-center">
            <p className={`text-[clamp(15px,4.38vw,27px)] font-normal font-figma-times-new-roman leading-[1.4815] ${item.titleColor}`}>
              {item.title}
            </p>
          </div>
          {item.chartColor && (
            <div className="flex flex-row items-center shrink-0 ml-4 cursor-pointer group">
              <p className={`text-[clamp(16px,4vw,19px)] font-normal font-figma-arial-narrow leading-[30px] ${item.chartColor} mr-[24px] group-hover:opacity-80 transition-opacity`}>
                Biểu đồ
              </p>
              <img src={item.chevron} alt="" className="w-[15px] h-[27px] object-cover group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
        {item.subText && (
          <div className="w-full px-[9px] mt-[9px]">
            <p className={`text-[clamp(16px,4.87vw,30px)] font-normal font-paragraph leading-[1.3333] ${item.subColor}`}>
              {item.subText}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <main className="max-w-[616px] w-full mx-auto relative min-h-[1372px] bg-[#191c40] overflow-clip flex flex-col font-sans">
      {/* Global Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/0058140bb_bb88bd021_ad348d4ac15ef99dca5862af0e63e87aa07a283a.png" alt="Background" className="w-full h-full object-cover object-center" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full min-h-[66px] bg-[#191c40] flex items-center justify-center shrink-0 shadow-md">
        <p className="text-[clamp(15px,4.38vw,27px)] font-normal font-paragraph leading-[1.2963] text-[#cbcdd4]">
          Giải Thưởng
        </p>
      </header>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto overflow-x-clip pb-[clamp(25px,16.2vw,100px)] scrollbar-hide">
        <div className="flex flex-col w-full pt-2">
          {listData.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}

          {/* Special Group for Rows 5 & 6 with shared background */}
          <div className="relative w-full flex flex-col">
            <div className="absolute inset-0 z-0 overflow-clip pointer-events-none">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/ae62bbd9c_5b63e4619_998c7e24b448fa4e4a7d02fbceac41b999d6d701.png" alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div className="relative z-10 flex flex-col w-full">
              <ListItem item={row5} />
              <ListItem item={row6} />
            </div>
          </div>

          {/* Separator and Row 7 */}
          <div className="w-full flex flex-col mt-4">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2f2c72155_4007729c8_8a4bc12f7fd750d4f129d4a5fa73ff5667ded8c6.png" alt="" className="w-full h-[18px] object-cover object-center" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full flex flex-row items-center px-[18px] py-[25px]"
            >
              <img src={row7.icon} alt="" className="w-[75px] h-[47px] shrink-0 object-cover" />
              <p className={`ml-[13px] text-[clamp(14px,4.06vw,25px)] font-semibold font-figma-times-new-roman leading-none ${row7.titleColor}`}>
                {row7.title}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute right-[45px] bottom-[150px] z-40 pointer-events-auto">
        <motion.button
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[71px] h-[70px] rounded-full shadow-lg overflow-clip focus:outline-none focus:ring-2 focus:ring-[#bfa22d]"
        >
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8266f77dd_0c6cbe664_6e0b0c38fba686fb5aa97062d8db64457e70ec77.png" alt="Support" className="w-full h-full object-cover" />
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 w-full min-h-[86px] z-50">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d7bcbe06c_c73015b44_a5d35d3cf4b3aacd9842e794a79d67bfa39da6cf.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
        {/* Top border line */}
        <div className="absolute top-0 left-0 w-full min-h-[2px] z-10">
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/30e42baea_bb291e141_af23c935534437f9913994c386a677edaf015667.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-row justify-between items-end px-[clamp(16px,5.7vw,35px)] pb-[12px]">
          {/* Nav Item 1 */}
          <button className="flex flex-col items-center justify-end h-full group focus:outline-none">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c675c6d5b_8d140aa7a_255998b5db2f0a2029e693fb3ca9ddd68f6d9143.png" alt="" className="w-[35px] h-[31px] object-cover mb-1 group-hover:-translate-y-1 transition-transform" />
            <p className="text-[19px] font-normal font-figma-inter leading-[21px] text-figma-text-1-2 whitespace-nowrap">
              Trang chu
            </p>
          </button>

          {/* Nav Item 2 (Active) */}
          <button className="flex flex-col items-center justify-end h-full group focus:outline-none">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/98cf00b6e_057c1c933_3457d84fa24efd4a1fd25ce0a6540c34fba7a156.png" alt="" className="w-[55px] h-[41px] object-cover mb-1 group-hover:-translate-y-1 transition-transform" />
            <p className="text-[18px] font-normal font-paragraph leading-[20px] text-figma-text-3-2 whitespace-nowrap">
              Giải Thưởng
            </p>
          </button>

          {/* Nav Item 3 */}
          <button className="flex flex-col items-center justify-end h-full group focus:outline-none">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a055d87af_51082870c_1032c4dddfa86601c12ea374f143d94bf37dddfc.png" alt="" className="w-[41px] h-[35px] object-cover mb-1 group-hover:-translate-y-1 transition-transform" />
            <p className="text-[18px] font-normal font-paragraph leading-[19px] text-figma-text-1-2 whitespace-nowrap">
              Sanh Choi
            </p>
          </button>

          {/* Nav Item 4 */}
          <button className="flex flex-col items-center justify-end h-full group focus:outline-none">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/725b0aa2b_69bf6a3a5_8c46f8c6fec0e76309e5dcc6e7bb0dba269974ee.png" alt="" className="w-[32px] h-[33px] object-cover mb-1 group-hover:-translate-y-1 transition-transform" />
            <p className="text-[17px] font-normal font-figma-microsoft-sans-serif leading-[19px] text-figma-text-1-2 whitespace-nowrap">
              Cua Tôi
            </p>
          </button>
        </div>
      </nav>
    </main>
  );
}

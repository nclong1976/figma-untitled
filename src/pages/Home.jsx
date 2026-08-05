import React from "react";
import { motion } from "framer-motion";

export default function MarinaBaySandsApp() {
  return (
    <main className="max-w-[516px] w-full mx-auto relative min-h-[1062px] bg-background overflow-clip flex flex-col font-sans">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-secondary w-full h-full absolute top-0 left-0" />
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/51180f3b5_b60421ada_4b68ef08ef88c5e8b3877cb04357aa802c84a60d.png"
          alt="Starry Background"
          className="absolute top-[190px] left-0 w-full h-[805px] object-cover"
        />
      </div>

      {/* Content Flow */}
      <div className="relative z-10 flex flex-col flex-1 pb-[clamp(16px,9.7vw,50px)]">
        {/* Header */}
        <header className="relative w-full min-h-[37px] flex flex-col items-center justify-center shrink-0">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/113475db5_42023f32b_8814f9fc52211a9a6147fc0078db9f9503eba721.png"
            alt="Header Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative z-10 flex flex-col items-center mt-1">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/eb69c374c_645c88250_4e121c95b33117e8ce7ec88128a7f79b89007876.png" alt="Crown Logo" className="w-[26px] h-[13px] object-cover" />
            <p className="text-figma-17 font-normal font-heading leading-figma-14 text-[#7f7161] mt-0.5">
              Sands
            </p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full min-h-[151px] shrink-0">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e57f331cd_708f7e507_e87283081c2ffaf4802a737a4f6e0a1d686d3b3c.png"
            alt="Casino Floor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Announcement Marquee */}
        <div className="flex items-center px-4 mt-[27px] gap-3 shrink-0">
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d6fe3fa1c_5922cc67d_b8fb578590ee1be3aa29b51c4562c84411e57cba.png" alt="Speaker Icon" className="w-[15px] h-[13px] shrink-0" />
          <div className="flex-1 overflow-clip relative h-4 flex items-center">
            <motion.div
              className="absolute whitespace-nowrap flex items-center"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <p className="text-figma-11 font-normal font-paragraph leading-figma-16 text-[#2a6873]">
                Chào mừng bạn đến với Marina Bay Sands. Với nhiều tùy chọn
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-x-[27px] gap-y-[20px] px-4 mt-[27px] shrink-0">
          <button className="relative w-full h-[51px] rounded-lg overflow-clip flex items-center justify-center hover:opacity-90 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/959dbe27e_aae6f748e_eb2c8d4e6e5b384e09e4e7c87d6043a39d17f26f.png" alt="Nạp tiền ngay bg" className="absolute inset-0 w-full h-full object-cover" />
            <span className="relative z-10 text-figma-12 font-normal font-paragraph leading-figma-17 text-[#ddd2ef]">
              Nap tièn ngay
            </span>
          </button>
          <button className="relative w-full h-[51px] rounded-lg overflow-clip flex items-center justify-center hover:opacity-90 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/7b49e88ac_53b9467de_aed3384a6b74fec41040a27f65aeda359774b582.png" alt="Rút tiền mặt bg" className="absolute inset-0 w-full h-full object-cover" />
            <span className="relative z-10 text-figma-12 font-normal font-paragraph leading-figma-17 text-[#f3dabb]">
              Rút tiền mặt
            </span>
          </button>
          <button className="relative w-full h-[51px] rounded-lg overflow-clip flex items-center justify-center hover:opacity-90 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2cdbe2998_54e015fbd_22321ceea9ad484c383e07ad84cc52ef48d08a91.png" alt="Lịch sử đặt cược bg" className="absolute inset-0 w-full h-full object-cover" />
            <span className="relative z-10 text-figma-12 font-normal font-paragraph leading-figma-17 text-[#f3d8bc]">
              Lịch sử đặt cược
            </span>
          </button>
          <button className="relative w-full h-[51px] rounded-lg overflow-clip flex items-center justify-center hover:opacity-90 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c1504c4b7_7f09c48e9_bc57ebbbcfcd5c80380def67ce2e84e13d56831b.png" alt="Hỗ trợ trực tuyến bg" className="absolute inset-0 w-full h-full object-cover" />
            <span className="relative z-10 text-figma-12 font-normal font-paragraph leading-figma-22 text-[#dacfed]">
              Hỗ trợ trực tuyến
            </span>
          </button>
        </div>

        {/* Game Lobby Section */}
        <div className="mt-[29px] flex flex-col shrink-0">
          <div className="flex items-center gap-1.5 px-4 mb-2">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/937f70d57_df7f64077_b8189efdff23f45686f10141f8648f32f77ac18c.png" alt="Lobby Icon" className="w-3.5 h-3.5 object-cover" />
            <h2 className="text-figma-14 font-bold font-paragraph leading-figma-15 text-[#6691c0]">
              Sảnh chơi
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-x-[19px] gap-y-[19px] px-[clamp(16px,6.4vw,33px)]">
            {/* Row 1 */}
            <div className="relative w-full aspect-[130/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3b2df2e2c_4c343a3c4_2f02652a8036143883dbcb8537a0c05f42aa1f0e.png" alt="Game 1" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-12 font-bold font-figma-inter leading-figma-17 text-[#ccb2eb] text-center px-1">
                Hàn Quốc may mắn 28
              </p>
            </div>
            <div className="relative w-full aspect-[131/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d71b34984_45923ba29_5a123522383065620c2e37f1c4db6db9a30257d2.png" alt="Game 2" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-11 font-normal font-paragraph leading-figma-31 text-[#d3bced] text-center px-1">
                New Zealand may mản 28
              </p>
            </div>
            <div className="relative w-full aspect-[130/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/01edaa7eb_ed717bccf_2bb4ec263b6033bc8c29effe31de00492a6e62e3.png" alt="Game 3" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-12 font-bold font-figma-inter leading-figma-17 text-[#d5bdec] text-center px-1">
                May mản 28
              </p>
            </div>

            {/* Row 2 */}
            <div className="relative w-full aspect-[130/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/dda59ff9c_256458f2e_a62a8a4560ccd427df8c1d3c9722019b44f243c5.png" alt="Game 4" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-14 font-bold font-figma-news-cycle leading-figma-16 text-[#d2baec] text-center px-1">
                Thời gian Đài Loan
              </p>
            </div>
            <div className="relative w-full aspect-[131/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/915a8cc57_ad0256a57_eac5849fc6cb956f243bed385ae7717e7e3041b2.png" alt="Game 5" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-12 font-bold font-figma-arimo leading-figma-17 text-[#cbb2ea] text-center px-1">
                Thời gian Hàn Quốc
              </p>
            </div>
            <div className="relative w-full aspect-[130/163] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/09b3e1e3c_c8d147013_ed16e4f9174b2595b5666f82bc2d002688ccc734.png" alt="Game 6" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-11 font-bold font-figma-arimo leading-figma-14 text-[#d1b8e9] text-center px-1">
                Thời gian New Zealand<br/>Zealand
              </p>
            </div>

            {/* Row 3 */}
            <div className="relative w-full aspect-[130/162] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b4f9873da_f71a46949_916de5bd1f54693d74531ac5b2e584eae8b0f777.png" alt="Game 7 bg" className="absolute inset-0 w-full h-full object-cover z-0" />
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b19be242e_292e7a944_5952b8f1ffb770a13601dc2d2c3e286f08149e5d.png" alt="Roulette" className="absolute top-[14px] left-[21px] w-[90px] h-[75px] object-contain z-10" />
              <p className="relative z-20 text-figma-13 font-bold font-figma-manrope leading-figma-15 text-[#c9afe8] text-center px-1">
                Đài Loan PK10
              </p>
            </div>
            <div className="relative w-full aspect-[131/162] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/04566b866_8e622d903_89a367f77b66fa20dae581e3ef944ddc941d1f08.png" alt="Game 8 bg" className="absolute inset-0 w-full h-full object-cover z-0" />
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/86af2d866_d6b9a21b7_937168ca48d3af77bc7be2801bd865606032ef8f.png" alt="Cards" className="absolute top-[20px] left-[15px] w-[102px] h-[74px] object-contain z-10" />
              <p className="relative z-20 text-figma-12 font-bold font-figma-arimo leading-figma-17 text-[#d9c5ee] text-center px-1">
                Hàn Quốc PK10
              </p>
            </div>
            <div className="relative w-full aspect-[129/162] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer hover:scale-[1.02] transition-transform">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/38febe088_1eabcfca9_d156668801802b58119f12682f7a120ece51a035.png" alt="Game 9" className="absolute inset-0 w-full h-full object-cover z-0" />
              <p className="relative z-10 text-figma-12 font-bold font-figma-arimo leading-figma-16 text-[#d6c3ec] text-center px-1">
                Việt Nam PK10
              </p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center items-center gap-[9px] mt-[21px] mb-[16px] shrink-0">
          <button className="text-figma-13 font-normal font-paragraph leading-figma-14 text-figma-text-10 hover:text-white transition-colors">Vietnam</button>
          <button className="text-figma-13 font-normal font-figma-noto-sans-sc leading-figma-15 text-figma-text-9 hover:text-white transition-colors">中文</button>
          <button className="text-figma-13 font-normal font-figma-noto-sans-sc leading-figma-16 text-figma-text-8 hover:text-white transition-colors">繁體</button>
          <button className="text-figma-13 font-normal font-figma-noto-sans-sc leading-figma-16 text-figma-text-7 hover:text-white transition-colors">日本語</button>
          <button className="text-figma-13 font-light font-figma-inter leading-figma-16 text-figma-text-6 hover:text-white transition-colors">Русский</button>
          <button className="text-figma-13 font-normal font-paragraph leading-figma-16 text-figma-text-5 hover:text-white transition-colors">English Malay</button>
        </div>
      </div>

      {/* Floating Action Button (Live Chat) */}
      <button className="absolute top-[745px] left-[416px] z-50 hover:scale-110 transition-transform">
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a6b09cdbe_e305385f5_c124b35ae65b0f408c513d378c99f5419622e3d6.png" alt="Live Chat" className="w-[46px] h-[43px] object-cover" />
      </button>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 w-full min-h-[50px] z-50">
        <div className="absolute top-[-15px] left-0 w-full h-4 bg-accent z-0" /> {/* Accent line above nav */}
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/98f5d6cba_8d6379b95_14d14d5794fe6f90218db68fc7112d8e087eb2e1.png" alt="Nav Background" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-10 w-full h-full grid grid-cols-4 items-center">
          <button className="flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8390c83a6_5af996216_217ac042c74810ab527d374523849755bf470f61.png" alt="Trang chủ" className="w-[19px] h-[19px] object-cover" />
            <span className="text-figma-10 font-normal font-paragraph leading-figma-12 text-figma-text-3">Trang chủ</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5f6b77fef_235fe25c7_26cd816d2c3af9bd3dd1eb034cc9b5a5eb4fcf78.png" alt="Giải Thưởng" className="w-[18px] h-[19px] object-cover" />
            <span className="text-figma-10 font-normal font-paragraph leading-figma-13 text-figma-text-1">Giải Thưởng</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a06965d60_4a773a828_d440d5c368de5635492e30921cb8fa4b7c1e0271.png" alt="Sảnh Chơi" className="w-6 h-[22px] object-cover" />
            <span className="text-figma-10 font-normal font-paragraph leading-figma-11 text-figma-text-1">Sanh Choi</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/117ce1079_da10fd381_67d7d4616cdd5693b561bbc12eefabc1755a1866.png" alt="Của Tôi" className="w-[17px] h-[18px] object-cover" />
            <span className="text-figma-10 font-normal font-paragraph leading-figma-11 text-figma-text-4">Của Tôi</span>
          </button>
        </div>
      </nav>
    </main>
  );
}

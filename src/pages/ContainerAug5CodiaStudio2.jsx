import React from "react";
import { motion } from "framer-motion";

export default function ContainerAug5CodiaStudio2() {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="relative w-full max-w-[522px] mx-auto min-h-[1146px] bg-figma-secondary-3 overflow-clip flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/518e53313_69945e7bb_bbfe3ea5762a00d0bb1b98d9859463bbeecc46eb.png"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 w-full flex-1 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header: Close Button & Logo */}
        <motion.div variants={itemVariants} className="w-full relative h-[188px]">
          <button className="absolute top-[23px] right-[37px] w-[26px] h-[27px] hover:opacity-80 transition-opacity">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/1de50a8d8_0b83177cc_64090f98cf035c5f5975ac0c7f8e2362ce58829b.png" alt="Close" className="w-full h-full object-cover" />
          </button>
          <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[160px] min-h-[98px]">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2599bc2f5_8cbd76e72_c67e9b462e30a2799bc999ea206489547cc5fcae.png" alt="Sands Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants} className="relative w-full h-[76px] mt-[clamp(29px,22.2vw,116px)]">
          {/* Login Tab */}
          <div className="absolute left-[23.94%] top-0 flex flex-col items-start w-[138px] cursor-pointer">
            <p className="text-figma-21 font-normal font-paragraph leading-figma-29 text-[#b73e42]">
              Đăng nhập tài
            </p>
            <p className="text-figma-21 font-normal font-paragraph leading-figma-26 text-[#c54242] mt-[3px]">
              khoản
            </p>
          </div>

          {/* Register Tab */}
          <div className="absolute left-[50.95%] top-0 flex flex-col items-start w-[112px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
            <p className="text-[clamp(14px,4.6vw,24px)] font-normal font-paragraph leading-[1.1667] text-[#c3c5cb]">
              Dng ky tài
            </p>
            <p className="text-figma-21 font-normal font-paragraph leading-figma-25 text-[#c9cbd0] mt-[5px]">
              khoan
            </p>
          </div>

          {/* Underlines */}
          <div className="absolute left-[24.71%] top-[69px] flex items-end">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5f28311e9_b9af2a8cd_407fafb2a75746391b05e5fab7d65b8b52c934b6.png" alt="Active Line" className="w-[105px] h-[3px] object-cover" />
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f708eaaaf_81728f5cb_5b1e95bd73877137432205202ba0d599834eb753.png" alt="Inactive Line" className="w-[160px] h-1.5 object-cover" />
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[444px] mx-auto mt-[clamp(16px,6.1vw,32px)] flex flex-col gap-[clamp(16px,6.1vw,32px)] px-[19px] sm:px-0"
        >
          {/* Username Input */}
          <div className="relative w-full min-h-[61px] bg-figma-primary-2 rounded-[27px] shadow-[inset_0_0_0_2px_#b8b4b9] flex items-center px-[31px] gap-[21px] focus-within:shadow-[inset_0_0_0_2px_#fff] transition-shadow">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/af86d741d_9ef8a5bc3_1289de38208ea60c36c32778edfbdb4094cfc6d9.png" alt="User Icon" className="w-[22px] h-[26px] object-cover shrink-0" />
            <input
              type="text"
              placeholder="Nhâp ten tài khoan"
              className="flex-1 bg-transparent outline-none text-figma-21 font-normal font-paragraph leading-figma-28 text-figma-text-9-7 placeholder:text-figma-text-9-7"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full min-h-[61px] bg-figma-primary-2 rounded-[27px] shadow-[inset_0_0_0_1px_#bcb9be] flex items-center px-[31px] gap-[20px] focus-within:shadow-[inset_0_0_0_2px_#fff] transition-shadow">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/00cc5067e_1d66be312_11373047ec794e8892e07f1f381f23dba7139b01.png" alt="Lock Icon" className="w-6 h-[25px] object-cover shrink-0" />
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="flex-1 bg-transparent outline-none text-figma-21 font-normal font-paragraph leading-figma-28 text-[#b5a199] placeholder:text-[#b5a199]"
            />
          </div>

          {/* Submit Button */}
          <button className="relative w-full h-[59px] bg-[#fd4441] rounded-[4px_3px_0px_0px] shadow-[inset_0_0_0_1px_#cf7879] flex items-center justify-center hover:bg-[#ff5555] active:scale-[0.98] transition-all">
            <span className="text-[clamp(14px,4.6vw,24px)] font-bold font-paragraph leading-[1.25] text-figma-text-8-7">
              Đăng nhập
            </span>
          </button>
        </motion.div>

        {/* Language Selector (Parametric Scatter for exact fidelity) */}
        <motion.div variants={itemVariants} className="relative w-full h-[55px] mt-[27px]">
          <p className="absolute left-[7.08%] top-[1px] text-figma-21 font-normal font-paragraph leading-figma-23 text-figma-text-3-7 cursor-pointer hover:text-white transition-colors">Vietnam</p>
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/09593e546_b611bcaec_6defe463931abcf3d4e5294a4817b4a033b0f8c8.png" alt="sep" className="absolute left-[22.98%] top-[4px] w-1 h-5 object-cover" />
          <p className="absolute left-[24.32%] top-0 text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-25 text-figma-text-6-7 cursor-pointer hover:text-white transition-colors">中文</p>
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3fa19040a_a6b0abfc6_0ef4284feeca83779bc06552bed8e66480ba1203.png" alt="sep" className="absolute left-[33.33%] top-[4px] w-1 h-[21px] object-cover" />
          <p className="absolute left-[34.86%] top-0 text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-26 text-figma-text-5-7 cursor-pointer hover:text-white transition-colors">繁體</p>
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/0b2257f24_fcaf6d858_45873f4b28e350d46bf2330977174092c97fc6f5.png" alt="sep" className="absolute left-[44.44%] top-[6px] w-0.5 h-[18px] object-cover" />
          <p className="absolute left-[45.78%] top-0 text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-26 text-figma-text-4-7 cursor-pointer hover:text-white transition-colors">日本語</p>
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/4db4287a2_6fc085b48_22ecb10ae6187dbe95fe4a486726143bc6638c0c.png" alt="sep" className="absolute left-[58.42%] top-[4px] w-[5px] h-5 object-cover" />
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e248b753a_89d45f70f_7f410533dafe5112c7c844169d454afa3e2099cb.png" alt="sep" className="absolute left-[60.53%] top-[4px] w-[5px] h-5 object-cover" />
          <p className="absolute left-[62.06%] top-[1px] text-figma-20 font-medium font-figma-inter leading-figma-26 text-figma-text-3-7 cursor-pointer hover:text-white transition-colors">Русский</p>
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/de5639ec5_1205c9945_37e7c0302de279d65f7d5c2e90d2361187f9ae96.png" alt="sep" className="absolute left-[77.58%] top-[4px] w-[5px] h-[21px] object-cover" />
          <p className="absolute left-[79.11%] top-[1px] text-figma-21 font-normal font-paragraph leading-figma-26 text-[#5b555a] cursor-pointer hover:text-white transition-colors">English</p>

          {/* Second Row */}
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d7dacf587_2746cab69_e3cb690ef6ba4d1ba60c7cc09156fc102f639c6b.png" alt="sep" className="absolute left-[44.25%] top-[36px] w-0.5 h-[19px] object-cover" />
          <p className="absolute left-[45.40%] top-[32px] text-figma-21 font-normal font-paragraph leading-figma-25 text-figma-text-1-7 cursor-pointer hover:text-white transition-colors">Malay</p>
        </motion.div>

        {/* Promo Image & Floating Support Icon */}
        <motion.div variants={itemVariants} className="relative w-full max-w-[444px] mx-auto mt-[30px] pb-[clamp(16px,7.7vw,40px)] px-[19px] sm:px-0">
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f8997bff6_e38556dc1_437516a0b1897435a7fa238c5b66960e3084426a.png" alt="Promo" className="w-full h-auto object-cover rounded-md shadow-2xl" />

          {/* Floating Support Icon */}
          <div className="absolute top-[11%] right-[-0.5%] w-[63px] min-h-[65px] z-20">
            <motion.button
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-full h-full hover:scale-110 transition-transform"
            >
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/095b2e24b_4f2c71649_3d7eac50647b944d17703beff32c08c148630cea.png" alt="Support" className="w-full h-full object-cover drop-shadow-lg" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

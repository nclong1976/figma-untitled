import React from "react";
import { motion } from "framer-motion";

export default function SignupForm() {
  return (
    <main className="max-w-[440px] w-full mx-auto relative min-h-[954px] bg-figma-secondary-3 overflow-clip flex flex-col">
      {/* Header */}
      <header className="relative h-11 flex items-center justify-center shrink-0 z-20">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/771eff2bd_198881f24_89c06e399be2b327fba9d232c9325ab941eaf9a2.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Header Background"
        />
        <button className="absolute left-[17px] w-[13px] h-[23px] flex items-center justify-center z-10">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/58adcbca4_55e980931_827248fb5b533feaf5912946198e5f84b9136df9.png"
            className="w-full h-full object-cover"
            alt="Back"
          />
        </button>
        <h1 className="text-figma-20 font-normal font-paragraph leading-figma-26 text-figma-text-10-6 relative z-10">
          Đăng ký miễn phí
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col z-10">
        {/* Background Image */}
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/04947611e_8a9357390_e7964c8e120626ed10fcc400a30d3bca65fddbd8.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Background"
        />

        <div className="relative z-10 flex flex-col px-8 pt-10 pb-8 h-full">
          {/* Tabs */}
          <div className="flex justify-center gap-12 mb-14 relative">
            {/* Active Tab */}
            <div className="flex flex-col items-start relative cursor-pointer">
              <span className="text-figma-17 font-normal font-paragraph leading-figma-24 text-figma-text-2-6">
                Đăng ký tài
              </span>
              <span className="text-figma-18 font-normal font-paragraph leading-figma-20 text-figma-text-2-6">
                khoản
              </span>
              <img
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/32b494739_f56cb5eaa_164477a7c08cbfec61798d2849f83c251c9f0096.png"
                className="absolute -bottom-2 left-1 w-[85px] h-0.5"
                alt="Active Indicator"
              />
            </div>

            {/* Inactive Tab */}
            <div className="flex flex-col items-start relative cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-figma-21 font-normal font-paragraph leading-figma-23 text-[#cbced4]">
                Dng nhp tài
              </span>
              <span className="text-figma-18 font-normal font-paragraph leading-figma-20 text-[#c8ccd1]">
                khoan
              </span>
              <img
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/ecbd8ca95_c4a976273_81b76887f0b3a6cdc8ef9d82cc7d45ecb3637feb.png"
                className="absolute -bottom-2 -left-3 w-[128px] h-1"
                alt="Inactive Indicator"
              />
            </div>
          </div>

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#c2c2c5] min-h-[49px] flex items-center px-6 overflow-clip">
                <img
                  src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/65d7111e0_ba8ee6178_10dd3f879bc68fcba43205803eb74f624a7771d6.png"
                  className="w-[17px] h-[21px] mr-4 shrink-0"
                  alt="User Icon"
                />
                <input
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  className="bg-transparent outline-none flex-1 text-figma-17 font-normal font-paragraph leading-figma-22 text-figma-text-9-6 placeholder:text-figma-text-9-6 w-full"
                />
              </div>
              <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-[#71717a] px-5">
                Vui lòng nhập 6~20 chữ cái, số hoặc tổ hợp
              </p>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="bg-figma-primary-2 rounded-[21px] shadow-[inset_0_0_0_1px_#ababaf] min-h-[50px] flex items-center px-6 overflow-clip">
                <img
                  src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a1e0c941f_853c33bf3_d264746a50a0e82bd6a52a16eb98210a250e9a58.png"
                  className="w-[19px] h-5 mr-4 shrink-0"
                  alt="Lock Icon"
                />
                <input
                  type="password"
                  placeholder="Nhâp mât khâu"
                  className="bg-transparent outline-none flex-1 text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-8-6 placeholder:text-figma-text-8-6 w-full"
                />
              </div>
              <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-[#716f79] px-5">
                Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ
                <br />
                <span className="text-figma-13 leading-figma-20 text-[#747379]">
                  SÔ
                </span>
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#ababaf] min-h-[49px] flex items-center px-6 overflow-clip">
                <img
                  src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/32ab69713_0c4d643a9_3a7042d0ce17dbf03d1843c797050c8ca5dce172.png"
                  className="w-[19px] h-5 mr-4 shrink-0"
                  alt="Lock Icon"
                />
                <input
                  type="password"
                  placeholder="Vui lòng nhập lại mật khẩu"
                  className="bg-transparent outline-none flex-1 text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-7-6 placeholder:text-figma-text-7-6 w-full"
                />
              </div>
              <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-figma-text-1-6 px-5">
                Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ
                <br />
                <span className="text-figma-13 leading-figma-20 text-[#75747b]">
                  SÓ
                </span>
              </p>
            </div>

            {/* Payment Password Field */}
            <div className="flex flex-col gap-2">
              <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#adadb1] min-h-[49px] flex items-center px-6 overflow-clip">
                <img
                  src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/4991c36ed_2db3938a7_82409f63f89088c5588f898d6f179068f4fb603e.png"
                  className="w-[19px] h-[21px] mr-4 shrink-0"
                  alt="Shield Icon"
                />
                <input
                  type="password"
                  placeholder="Đặt mật khẩu thanh toán"
                  className="bg-transparent outline-none flex-1 text-figma-17 font-normal font-paragraph leading-figma-23 text-[#b9a59f] placeholder:text-[#b9a59f] w-full"
                />
              </div>
              <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-figma-text-1-6 px-5">
                Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ
                <br />
                <span className="text-figma-13 leading-figma-20 text-[#75747b]">
                  SÓ
                </span>
              </p>
            </div>

            {/* CAPTCHA Field */}
            <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#b3b3b6] min-h-[49px] flex items-center px-6 overflow-clip">
              <img
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d68418d7a_30250d91b_2e25d5e0b55110b470b3fd40e10d1bb0a63bff43.png"
                className="w-[19px] h-[21px] mr-4 shrink-0"
                alt="Check Icon"
              />
              <input
                type="text"
                placeholder="Vui lòng nhâp CAPTCHA"
                className="bg-transparent outline-none flex-1 text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-4-6 placeholder:text-figma-text-4-6 w-full min-w-0"
              />
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/6730d242d_c78a5052e_9f04de342a730fb8d48567438d56a491b199b2d6.png" className="w-3.5 h-[15px]" alt="Digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/533ec979a_35efc0fe2_266f9c9b158ff78d164185f3b32557ecbced5182.png" className="w-3.5 h-[15px]" alt="Digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8eedb9fbd_28efc43fc_ab30516bd849fecad19ffff9187e45087a5b3e72.png" className="w-[15px] h-[15px]" alt="Digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f9742e5ab_f3d8ba7e6_4735721fe4b67bd47d583b1f20e278a327a3b189.png" className="w-[13px] h-[15px]" alt="Digit" />
              </div>
            </div>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-start gap-3 mt-10 px-5"
          >
            <button className="shrink-0 mt-1 flex items-center justify-center">
              <img
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/868a18071_76f26f86b_c7cd2396282bda381bef6ecf77e2a33806737eec.png"
                className="w-[17px] h-[17px]"
                alt="Checkbox"
              />
            </button>
            <p className="text-figma-15 font-normal font-paragraph leading-figma-23 text-[#625e67]">
              Tôi trên 18 tuổi và đồng ý chấp nhận{" "}
              <a
                href="#"
                className="font-figma-hanken-grotesk leading-figma-21 text-[#154eaa] hover:underline"
              >
                Điều khoản
              </a>
              <br />
              <a
                href="#"
                className="leading-figma-21 text-[#164ea7] hover:underline"
              >
                đăng ký
              </a>
            </p>
          </motion.div>

          {/* Flexible Spacer */}
          <div className="flex-1 min-h-[60px]"></div>

          {/* Footer Actions */}
          <div className="mt-auto flex flex-col gap-5 relative z-20">
            <div className="h-px w-full bg-figma-accent-3" />
            <button className="w-full h-11 bg-figma-muted-2 rounded-[3px] shadow-[inset_0_0_0_1px_#d74747] flex items-center justify-center hover:opacity-90 transition-opacity active:scale-[0.98]">
              <span className="text-figma-18 font-normal font-paragraph leading-figma-24 text-figma-text-3-6">
                Đăng ký ngay
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Support) */}
      <div className="absolute bottom-[110px] right-3 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          className="w-[52px] h-[52px] rounded-full overflow-clip shadow-lg hover:scale-105 transition-transform"
        >
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5b51eee0c_5ce02bf40_3b7c538037a47e9a7f343efb8dad7f8d51746177.png"
            className="w-full h-full object-cover"
            alt="Customer Support"
          />
        </motion.button>
      </div>
    </main>
  );
}

import React from "react";

export default function ContainerAug5CodiaStudio() {
  return (
    <main className="max-w-[440px] w-full mx-auto relative min-h-[954px] bg-figma-secondary-3 overflow-clip flex flex-col">
      {/* Background Image */}
      <div className="absolute top-[45px] left-0 w-full h-[calc(100%-45px)] z-0">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/4dd80120b_4b3ce3200_e7964c8e120626ed10fcc400a30d3bca65fddbd8.png"
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>

      {/* Header */}
      <header className="relative h-11 flex items-center justify-center shrink-0 z-20">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c8398988f_476d19250_89c06e399be2b327fba9d232c9325ab941eaf9a2.png"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt=""
        />
        <button className="absolute left-[17px] w-[13px] h-[23px] flex items-center justify-center">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a369ab5a3_dce4b8d7e_827248fb5b533feaf5912946198e5f84b9136df9.png"
            className="w-full h-full object-cover object-center"
            alt="Back"
          />
        </button>
        <h1 className="text-figma-20 font-normal font-paragraph leading-figma-26 text-figma-text-10-6 relative z-10">
          Đăng ký miễn phí
        </h1>
      </header>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 flex flex-col w-full">

        {/* Tabs */}
        <div className="relative w-full mt-[clamp(16px,9.3vw,41px)] pl-[clamp(17px,25.2vw,111px)] flex">
          {/* Active Tab */}
          <div className="flex flex-col relative z-10">
            <span className="text-figma-17 font-normal font-paragraph leading-figma-24 text-figma-text-2-6">
              Đăng ký tài
            </span>
            <span className="text-figma-18 font-normal font-paragraph leading-figma-20 text-figma-text-2-6 mt-[3px]">
              khoản
            </span>
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/615d43741_8da15f2a9_164477a7c08cbfec61798d2849f83c251c9f0096.png"
              className="absolute -bottom-[29px] left-[4px] w-[85px] h-0.5 object-cover"
              alt=""
            />
          </div>

          {/* Inactive Tab */}
          <div className="flex flex-col ml-[9px] relative z-10">
            <span className="text-figma-21 font-normal font-paragraph leading-figma-23 text-[#cbced4]">
              Dng nhp tài
            </span>
            <span className="text-figma-18 font-normal font-paragraph leading-figma-20 text-[#c8ccd1] mt-[4px]">
              khoan
            </span>
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/74f5ffc7c_b8c194e8a_81b76887f0b3a6cdc8ef9d82cc7d45ecb3637feb.png"
              className="absolute -bottom-[28px] -left-[11px] w-[128px] h-1 object-cover"
              alt=""
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col px-[clamp(16px,7.5vw,33px)] mt-[clamp(20px,18vw,79px)] w-full">

          {/* Field 1: Username */}
          <div className="flex flex-col mb-[18px]">
            <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#c2c2c5] min-h-[49px] w-full flex items-center px-6 gap-[19px]">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/bd0d05615_19ec634e4_10dd3f879bc68fcba43205803eb74f624a7771d6.png" className="w-[17px] h-[21px] shrink-0 object-cover" alt="" />
              <span className="text-figma-17 font-normal font-paragraph leading-figma-22 text-figma-text-9-6 truncate">
                Nhập tên tài khoản
              </span>
            </div>
            <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-[#71717a] mt-[11px] pl-[19px]">
              Vui lòng nhập 6~20 chữ cái, số hoặc tổ hợp
            </p>
          </div>

          {/* Field 2: Password */}
          <div className="flex flex-col mb-[19px]">
            <div className="bg-figma-primary-2 rounded-[21px] shadow-[inset_0_0_0_1px_#ababaf] min-h-[50px] w-full flex items-center px-6 gap-[19px]">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f0fa59815_8be341e11_d264746a50a0e82bd6a52a16eb98210a250e9a58.png" className="w-[19px] h-5 shrink-0 object-cover" alt="" />
              <span className="text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-8-6 truncate">
                Nhâp mât khâu
              </span>
            </div>
            <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-[#716f79] mt-[10px] pl-[19px]">
              Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ<br />
              <span className="text-figma-13 leading-figma-20 text-[#747379]">SÔ</span>
            </p>
          </div>

          {/* Field 3: Confirm Password */}
          <div className="flex flex-col mb-[20px]">
            <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#ababaf] min-h-[49px] w-full flex items-center px-6 gap-[19px]">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a4f709b6d_52e2c5c5f_3a7042d0ce17dbf03d1843c797050c8ca5dce172.png" className="w-[19px] h-5 shrink-0 object-cover" alt="" />
              <span className="text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-7-6 truncate">
                Vui lòng nhập lại mật khẩu
              </span>
            </div>
            <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-figma-text-1-6 mt-[11px] pl-[19px]">
              Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ<br />
              <span className="text-figma-13 leading-figma-20 text-[#75747b]">SÓ</span>
            </p>
          </div>

          {/* Field 4: Payment Password */}
          <div className="flex flex-col mb-[20px]">
            <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#adadb1] min-h-[49px] w-full flex items-center px-6 gap-[19px]">
              <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/296a3d6e5_bca9ac3f0_82409f63f89088c5588f898d6f179068f4fb603e.png" className="w-[19px] h-[21px] shrink-0 object-cover" alt="" />
              <span className="text-figma-17 font-normal font-paragraph leading-figma-23 text-[#b9a59f] truncate">
                Đặt mật khẩu thanh toán
              </span>
            </div>
            <p className="text-figma-15 font-normal font-paragraph leading-figma-22 text-figma-text-1-6 mt-[10px] pl-[19px]">
              Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ<br />
              SÓ
            </p>
          </div>

          {/* Field 5: CAPTCHA */}
          <div className="flex flex-col mb-[clamp(16px,9.8vw,43px)]">
            <div className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#b3b3b6] min-h-[49px] w-full flex items-center px-6 justify-between">
              <div className="flex items-center gap-[19px] overflow-clip">
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/4de2b698f_e80098454_2e25d5e0b55110b470b3fd40e10d1bb0a63bff43.png" className="w-[19px] h-[21px] shrink-0 object-cover" alt="" />
                <span className="text-figma-17 font-normal font-paragraph leading-figma-23 text-figma-text-4-6 truncate">
                  Vui lòng nhâp CAPTCHA
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/1bca82432_283f3749d_9f04de342a730fb8d48567438d56a491b199b2d6.png" className="w-3.5 h-[15px] object-cover" alt="Captcha digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5de34bf72_e3156f055_266f9c9b158ff78d164185f3b32557ecbced5182.png" className="w-3.5 h-[15px] object-cover" alt="Captcha digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/6ba12bec4_8e7822b03_ab30516bd849fecad19ffff9187e45087a5b3e72.png" className="w-[15px] h-[15px] object-cover" alt="Captcha digit" />
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b7b1c17b3_3d35bd4ef_4735721fe4b67bd47d583b1f20e278a327a3b189.png" className="w-[13px] h-[15px] object-cover" alt="Captcha digit" />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-[5px] pl-[1px]">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8d0bb3dc0_a0ba13ab3_c7cd2396282bda381bef6ecf77e2a33806737eec.png" className="w-[17px] h-[17px] mt-1 shrink-0 object-cover" alt="Checkbox" />
            <p className="text-figma-15 font-normal font-paragraph leading-figma-23 text-[#625e67]">
              Tôi trên 18 tuổi và đồng ý chấp nhận{" "}
              <span className="font-figma-hanken-grotesk leading-figma-21 text-[#154eaa]">
                Điều khoản
              </span>
              <br />
              <span className="leading-figma-21 text-[#164ea7]">đăng ký</span>
            </p>
          </div>
        </div>

        {/* Submit Section */}
        <div className="mt-[clamp(16px,10.7vw,47px)] px-[clamp(16px,7.3vw,32px)] pb-[26px] flex flex-col w-full">
          <div className="bg-figma-accent-3 w-full h-px mb-[21px]" />
          <button className="bg-figma-muted-2 rounded-[3px] shadow-[inset_0_0_0_1px_#d74747] w-full h-11 flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-100">
            <span className="text-figma-18 font-normal font-paragraph leading-figma-24 text-figma-text-3-6">
              Đăng ký ngay
            </span>
          </button>
        </div>

        {/* Floating Support Button */}
        <button className="absolute top-[784px] right-[3px] w-[52px] h-[52px] z-30 transition-transform hover:scale-105 active:scale-95">
          <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/829e7816f_9ff818d66_3b7c538037a47e9a7f343efb8dad7f8d51746177.png" className="w-full h-full object-cover" alt="Customer Support" />
        </button>

      </div>
    </main>
  );
}

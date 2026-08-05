import React from "react";

export default function ContainerAug4CodiaStudio4() {
  return (
    <main className="max-w-[619px] w-full mx-auto relative min-h-screen bg-figma-primary flex flex-col font-figma-inter overflow-x-clip">
      {/* Global Background Layer */}
      <div className="absolute top-[65px] left-0 w-full h-[calc(100%-65px)] z-0 pointer-events-none">
        <img
          className="w-full h-full object-cover object-top"
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b3ec45952_2ef298ae8_90a4a2b8bed20f3db0913ebfe258e757b44c736a.png"
          alt="Background"
        />
      </div>

      {/* Header */}
      <header className="relative w-full min-h-[65px] flex items-center justify-between px-[22px] shrink-0 z-50">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-center"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e3eaf9faa_2874b56c2_263359f6c74925fbcefa670078a0b451d7d72a11.png"
            alt="Header Background"
          />
        </div>
        <button className="relative z-10 w-5 h-[34px] flex items-center justify-center hover:opacity-80 transition-opacity">
          <img
            className="w-full h-full object-cover"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5c870e816_38dcc79e8_39a38dff9551e27df7096a2afc179e228aa8d3ea.png"
            alt="Back"
          />
        </button>
        <h1 className="text-[clamp(14px,3.88vw,24px)] font-bold font-figma-noto-sans leading-[1.5] text-[#d4d6d9] relative z-10 text-center flex-1">
          Hàn Quốc may mắn 28
        </h1>
        <div className="flex items-center gap-[22px] relative z-10">
          <button className="w-[39px] h-8 hover:opacity-80 transition-opacity">
            <img
              className="w-full h-full object-cover"
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/819c74f21_d1a0a2b0f_934f6b596e126e4d47613f2bd6f1f71304214bc1.png"
              alt="Search"
            />
          </button>
          <button className="w-[34px] h-9 hover:opacity-80 transition-opacity">
            <img
              className="w-full h-full object-cover"
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f7f97ef99_64575a3ad_2cd2789a9866297502c7fc439338c6a87782daa7.png"
              alt="User Menu"
            />
          </button>
        </div>
      </header>

      {/* Previous Draw Info */}
      <section className="relative z-10 w-full px-[7px] pt-[15px] pb-[10px] flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <p className="text-figma-22 font-normal font-figma-inter leading-figma-27 text-[#b45258]">
            1897429Giai đoạn
          </p>
          <div className="flex flex-col items-end pr-2">
            <img
              className="w-[38px] h-[39px] object-cover"
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/61bd41edb_16534cf22_4090fb356802fb395fda9d50716e30c847944e93.png"
              alt="Coins"
            />
            <p className="text-figma-23 font-normal font-figma-inter leading-figma-23 text-[#bd5e63] mt-1">
              0.00
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[7px] pl-[4px] -mt-6">
          <img
            className="w-9 h-9 object-cover rounded-full shadow-sm"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/53b1f657a_889a88edc_1437c8eefde32b73e6e92aafa58944afb935b90f.png"
            alt="Ball 1"
          />
          <img
            className="w-9 h-9 object-cover rounded-full shadow-sm"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/65dd0b064_91d4355da_c94396ed04c5a4c76af537a3edfd93866aae41ce.png"
            alt="Ball 4"
          />
          <img
            className="w-[37px] h-9 object-cover rounded-full shadow-sm"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2387a8276_2e24ebd25_fb5f4f8d7a33a0b56daa0b304f5e85b794cd17bc.png"
            alt="Ball 5"
          />
        </div>

        <div className="flex items-center pl-[2px] mt-1">
          <p className="text-figma-21 font-normal font-figma-roboto-flex leading-figma-29 text-figma-text-6-5 mr-2">
            Tổng
          </p>
          <div className="bg-[#e4b060] rounded-[15px] shadow-[inset_0_0_0_1px_#e9b063] w-[31px] min-h-[31px] flex items-center justify-center">
            <p className="text-figma-23 font-normal font-figma-istok-web leading-figma-20 text-[#c04a2d]">
              10
            </p>
          </div>
          <p className="text-figma-21 font-normal font-figma-inter leading-figma-23 text-[#e39662] ml-[9px]">
            Nhỏ
          </p>
          <p className="text-figma-23 font-normal font-figma-inter leading-figma-23 text-[#e29561] ml-[14px]">
            Đôi
          </p>
        </div>
      </section>

      {/* Current Draw Bar */}
      <section className="relative z-20 w-full min-h-[60px] flex items-center px-2.5 mt-2">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3d894f8cc_36538ee6e_8632b15db8afba0b38df5ed344a581181d097203.png"
            alt="Bar Background"
          />
        </div>
        <div className="relative z-10 flex items-center w-full">
          <p className="text-figma-23 font-normal font-figma-roboto-flex leading-figma-27 text-[#bd5c60]">
            1897430
          </p>
          <p className="text-[clamp(14px,3.88vw,24px)] font-normal font-figma-inter leading-[1.1667] text-[#514f4e] ml-1">
            Giai doan
          </p>
          <div className="bg-[#ca0a1b] rounded-[7px] shadow-[inset_0_0_0_1px_#c50b0e] w-[70px] min-h-[35px] flex items-center justify-center ml-[7px]">
            <p className="text-[clamp(15px,4.52vw,28px)] font-normal font-figma-beiruti leading-[0.8214] text-[#dfa7ab]">
              0:18
            </p>
          </div>
          <p className="text-figma-22 font-normal font-figma-inter leading-figma-26 text-[#434243] ml-[18px]">
            Đặt cược
          </p>
          <button className="ml-auto flex items-center gap-1.5 hover:opacity-80 transition-opacity pr-1">
            <p className="text-[clamp(14px,4.04vw,25px)] font-normal font-figma-pt-sans leading-[1.04] text-[#e38541]">
              Historical draw
            </p>
            <img
              className="w-[27px] h-4 object-contain"
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/339f80d1a_b42ffb5e1_18d6533ea1cd8dbba3aa0e2bb02e924670e9ccfa.png"
              alt="Dropdown Arrow"
            />
          </button>
        </div>
      </section>

      {/* Main Betting Area */}
      <section className="relative z-10 w-full flex-1 flex bg-[#f4f4f4]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c5278c3cc_3e6bad3c7_a79699bbeeb6c2ab5109427e961fd4289d5189fb.png"
            alt="Grid Background"
          />
        </div>

        {/* Sidebar Navigation */}
        <aside className="relative z-10 w-[122px] shrink-0 flex flex-col bg-[#f0f0f0] border-r border-[#e0e0e0]">
          <button className="bg-[#fe6400] shadow-[inset_0_0_0_1px_#f06a14] w-full h-[75px] flex items-center justify-center relative">
            <p className="text-[clamp(14px,4.04vw,25px)] font-normal font-figma-instrument-sans leading-[1.16] text-[#f4d5b2]">
              Trôn
            </p>
          </button>
          <button className="w-full h-[75px] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors">
            <p className="text-[clamp(14px,4.2vw,26px)] font-normal font-figma-inter leading-[1.1923] text-[#8c8c8b]">
              Mã đặc
            </p>
          </button>
          <button className="w-full h-[75px] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors">
            <p className="text-[clamp(15px,4.36vw,27px)] font-normal font-figma-roboto-flex leading-[1.1111] text-[#868686]">
              biêt
            </p>
          </button>
        </aside>

        {/* Grid Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Grid Header */}
          <div className="w-full min-h-[46px] flex items-center justify-center border-b border-[#dcdcdc] bg-[#e8e8e8]">
            <p className="text-figma-23 font-bold font-paragraph leading-figma-27 text-[#b62d34]">
              Trôn
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 w-full">
            {[
              { title: "Lớn", odds: "1.98", titleClass: "text-figma-21 font-figma-arimo text-figma-text-1-5" },
              { title: "Nho", odds: "1.98", titleClass: "text-[clamp(14px,3.88vw,24px)] font-figma-ibm-plex-sans text-[#2d2b2b]" },
              { title: "Don", odds: "1.98", titleClass: "text-[clamp(14px,4.04vw,25px)] font-figma-inter text-[#515151]" },
              { title: "Đôi", odds: "1.98", titleClass: "text-[clamp(14px,4.2vw,26px)] font-figma-inter text-figma-text-1-5" },
              { title: "Đơn hàng lớn", odds: "3.98", titleClass: "text-[clamp(14px,3.88vw,24px)] font-figma-inter text-[#2f2e2f]" },
              { title: "Đôi Lớn", odds: "3.98", titleClass: "text-[clamp(14px,3.88vw,24px)] font-figma-inter text-figma-text-6-5" },
              { title: "Danh sách nhỏ", odds: "3.98", titleClass: "text-[clamp(14px,4.2vw,26px)] font-figma-mukta text-[#2b2b2b]" },
              { title: "Đôi nhỏ", odds: "3.98", titleClass: "text-[clamp(14px,4.04vw,25px)] font-figma-atkinson-hyperlegible text-[#333334]" },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex flex-col items-center justify-center h-[109px] bg-white hover:bg-gray-50 transition-colors border-b border-[#e5e5e5] ${
                  i % 2 === 0 ? "border-r" : ""
                }`}
              >
                <p className={`${item.titleClass} font-normal mb-3`}>{item.title}</p>
                <p className="text-figma-19 font-normal font-figma-inter leading-figma-22 text-figma-text-4-5">
                  {item.odds}
                </p>
              </button>
            ))}
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-3 w-full relative">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                className="w-full h-full object-cover"
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2d5850126_fe7eb93dd_b7e6a18e52d47fda3aacfc9c5d7bb77822344702.png"
                alt="Grid Background 2"
              />
            </div>
            {[
              { title: "Lớn", odds: "13", titleClass: "text-figma-22 font-figma-arimo text-[#4d4d4e]" },
              { title: "Cuc nho", odds: "13", titleClass: "text-[clamp(14px,4.04vw,25px)] font-figma-murecho text-[#434242]" },
              { title: "Báo", odds: "60", titleClass: "text-figma-23 font-figma-inter text-[#4a4a4a]" },
              { title: "Sóng đỏ", odds: "2.9", titleClass: "text-[clamp(14px,3.88vw,24px)] font-figma-schibsted-grotesk text-figma-text-6-5" },
              { title: "GreenWave", odds: "2.9", titleClass: "text-[clamp(14px,3.88vw,24px)] font-figma-spline-sans text-figma-text-1-5" },
              { title: "BlueWave", odds: "2.9", titleClass: "text-figma-23 font-figma-inter text-figma-text-9-5" },
            ].map((item, i) => (
              <button
                key={i}
                className={`relative z-10 flex flex-col items-center justify-center h-[110px] bg-white/90 hover:bg-white transition-colors border-b border-[#e5e5e5] ${
                  (i + 1) % 3 !== 0 ? "border-r" : ""
                }`}
              >
                <p className={`${item.titleClass} font-normal mb-3`}>{item.title}</p>
                <p className="text-figma-20 font-normal font-figma-inter leading-figma-22 text-figma-text-3-5">
                  {item.odds}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Controls (Sticky Footer) */}
      <section className="sticky bottom-0 w-full z-50 flex flex-col mt-auto">
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-end">
          <img
            className="w-full h-[256px] object-cover absolute bottom-[70px]"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c34a216e7_8532854d1_1df8f73191a40277e2c4044f14ec80e3d5d4e3a1.png"
            alt="Footer Background Top"
          />
          <img
            className="w-full h-[185px] object-cover absolute bottom-[70px]"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/adc1da8dd_64c469046_bcb1eb015c9df954855d3abc8b77414052fc81c2.png"
            alt="Footer Background Bottom"
          />
        </div>

        <div className="relative z-10 flex flex-col pt-6 pb-4 px-2.5 gap-5">
          {/* Floating Pill */}
          <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-figma-color-14 rounded-[16px] shadow-[inset_0_0_0_1px_#c83727] w-full max-w-[267px] min-h-[37px] flex items-center justify-center z-20">
            <p className="text-figma-23 font-normal font-figma-inter leading-figma-25 text-[#e1aaab]">
              Vui lòng chọn cách chơi
            </p>
          </div>

          {/* Quick Bet Header */}
          <div className="flex justify-between items-center px-1 mt-2">
            <p className="text-figma-22 font-normal font-figma-inter leading-figma-25 text-[#f1c195]">
              Đặt cược nhanh
            </p>
            <button className="hover:opacity-80 transition-opacity">
              <img
                className="w-[25px] h-[15px] object-cover"
                src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/89372b1ed_c5b2bc861_9875723c7cae08fd719ba2f4f2b573669564b708.png"
                alt="Expand"
              />
            </button>
          </div>

          {/* Coin Selection Row */}
          <div className="flex justify-between items-center px-4">
            {[
              { val: "10", bg: "bg-figma-primary-3", shadow: "shadow-[inset_0_0_0_1px_#b06c03]", textClass: "text-[clamp(14px,3.88vw,24px)] font-bold font-figma-pontano-sans text-[#dad1a5]" },
              { val: "50", bg: "bg-figma-primary-3", shadow: "shadow-[inset_0_0_0_1px_#af6c02]", textClass: "text-figma-20 font-normal font-figma-tauri text-[#d8cfa7]" },
              { val: "100", bg: "bg-figma-primary-3", shadow: "shadow-[inset_0_0_0_1px_#b56c02]", textClass: "text-figma-23 font-bold font-figma-arimo text-[#ddd4ad]" },
              { val: "200", bg: "bg-figma-primary-3", shadow: "shadow-[inset_0_0_0_1px_#b56c02]", textClass: "text-figma-21 font-bold font-figma-pontano-sans text-[#dad1ab]" },
              { val: "500", bg: "bg-figma-primary-3", shadow: "shadow-[inset_0_0_0_1px_#b56c03]", textClass: "text-figma-20 font-normal font-figma-tauri text-[#ddd5af]" },
              { val: "1000", bg: "bg-[#906f01]", shadow: "shadow-[inset_0_0_0_1px_#ba6b03]", textClass: "text-figma-22 font-bold font-figma-pontano-sans text-[#ddd5ae]" },
            ].map((coin, i) => (
              <button
                key={i}
                className="relative w-[60px] h-[61px] flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <div className={`absolute inset-0 rounded-[30px] ${coin.bg} ${coin.shadow}`}></div>
                <p className={`relative z-10 leading-none ${coin.textClass}`}>
                  {coin.val}
                </p>
              </button>
            ))}
          </div>

          {/* Input & Action Buttons */}
          <div className="flex items-center justify-between mt-1">
            <p className="text-figma-21 font-normal font-figma-roboto-flex leading-figma-27 text-[#f3cda5] shrink-0 ml-1">
              Số tiền cược:
            </p>
            <input
              type="text"
              className="bg-figma-primary-2 rounded-[22px] shadow-[inset_0_0_0_1px_#f7dfc6] w-[145px] h-[46px] mx-2 px-4 text-center outline-none focus:ring-2 focus:ring-[#f7dfc6]/50"
            />
            <button className="bg-[#4a097f] rounded-[22px] shadow-[inset_0_0_0_1px_#6a145b] w-[176px] h-[46px] flex items-center justify-center shrink-0 hover:bg-[#5a109a] transition-colors">
              <p className="text-[clamp(14px,4.2vw,26px)] font-semibold font-figma-inter leading-[1.1923] text-[#ddcee4]">
                Mua hàng
              </p>
            </button>
            <button className="bg-[#c9101b] rounded-[22px] shadow-[inset_0_0_0_1px_#d92812] w-[109px] h-[47px] flex items-center justify-center shrink-0 ml-2 hover:bg-[#e01522] transition-colors">
              <p className="text-[clamp(18px,5.17vw,32px)] font-normal font-figma-gabarito leading-[0.875] text-[#e7bbbc]">
                Dt lai
              </p>
            </button>
          </div>
        </div>

        {/* Bottom-most Action Bar */}
        <div className="relative z-20 w-full min-h-[70px] bg-figma-surface flex items-center justify-center pb-2">
          <button className="bg-figma-border rounded-[28px] shadow-[inset_0_0_0_1px_#c73213] w-[505px] max-w-[90%] h-[60px] flex items-center justify-center hover:brightness-110 transition-all active:scale-[0.98]">
            <p className="text-figma-22 font-normal font-figma-gabarito leading-figma-27 text-figma-text-7-5">
              Đặt cược
            </p>
          </button>
        </div>
      </section>
    </main>
  );
}

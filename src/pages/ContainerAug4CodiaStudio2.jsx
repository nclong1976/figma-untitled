import React from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

export default function ContainerAug4CodiaStudio2() {
  return (
    <main className="max-w-[503px] w-full mx-auto relative overflow-clip" style={{ fontFamily: "Roboto, sans-serif" }}>
      {/* Background */}
      <div className="relative w-full">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/61e389800_9bfeffd96_07a3de8dd600878de86f2c73376a64fa24558e67.png"
          alt="background"
          className="w-full object-cover object-center absolute inset-0 h-full"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 flex flex-col w-full pb-24">

          {/* ── User Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-[17px] mt-[clamp(16px,10.9vw,55px)] rounded-[18px] shadow-[inset_0_0_0_1px_#323b51] overflow-clip"
            style={{ background: "rgba(30,24,50,0.82)", minHeight: 155 }}
          >
            <div className="flex flex-row items-center px-4 py-4 gap-3 relative">
              {/* Avatar */}
              <div className="shrink-0 w-[63px] min-h-[87px] flex items-center justify-center">
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/1cec4ca21_d9792f60d_44ea36443d96080bcf8c902ed27ff8150a287082.png" alt="avatar" className="w-full h-full object-cover object-center" />
              </div>
              {/* User info */}
              <div className="flex flex-col justify-center flex-1 gap-1">
                <p
                  className="text-[#bd9c59] leading-[1.55]"
                  style={{ fontFamily: "Roboto, sans-serif", fontSize: 20, fontWeight: 400 }}
                >
                  Người dùng: nguyenha<br />ID:103626
                </p>
                <p
                  className="text-[#947e96]"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 400, lineHeight: "26px" }}
                >
                  Tổng tài khoản: 0.00
                </p>
                <p
                  className="text-[#d3d6da]"
                  style={{ fontFamily: "Epilogue, sans-serif", fontSize: 21, fontWeight: 700, lineHeight: "30px" }}
                >
                  Lợi nhuận hôm nay: 0.00
                </p>
              </div>
              {/* Settings icon */}
              <div className="absolute top-4 right-4 w-[31px] min-h-[31px]">
                <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/48526e657_f8534feb2_48313d915c3ffd96882eb9905a24d32016970851.png" alt="settings" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </motion.div>

          {/* ── Games Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mx-[17px] mt-[18px] rounded-[18px] overflow-clip relative"
            style={{ minHeight: 283 }}
          >
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d5f335296_8e184a500_31827890682bf99ef242db9726252475e5e0a261.png"
              alt="games background"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="relative z-10 px-[18px] pt-[29px] pb-[24px] flex flex-col gap-3">
              {/* May man label */}
              <p
                className="text-[#8f60db]"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "18px" }}
              >
                May man 28
              </p>

              {/* Trò chơi row */}
              <div className="flex flex-row items-center gap-2 flex-wrap">
                <p
                  className="text-[#d1bde4] mr-1"
                  style={{ fontFamily: "Mulish, sans-serif", fontSize: 19, fontWeight: 700, lineHeight: "22px" }}
                >
                  Trò chơi
                </p>
                {/* Game icons row */}
                <div className="flex flex-row items-center gap-[2px]">
                  <div className="relative w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/1b76daf08_46c9d2402_fd2fe92ebca7894c9e92126a9f7006a173549832.png" alt="icon" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center text-[#addbcb] text-[10px]" style={{ fontFamily: "Englebert, sans-serif" }}>T</span>
                  </div>
                  <div className="relative w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/d2e330924_8484088a1_c60105468d61e04da7593a04056b12faaabe62e4.png" alt="icon" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center text-[#f4d9ab] text-[13px] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>β</span>
                  </div>
                  <div className="relative w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/7b84716a6_ae1350da7_637dbc3ef6b6b8cbf50134a0c3c6ba7ec8810bc3.png" alt="icon" className="w-full h-full object-cover" />
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b1c195807_c26327315_86f48c5744acf5e7eb033f63fbe4a02b17619f1a.png" alt="icon-inner" className="absolute inset-0 m-auto w-[9px] h-3 object-cover" />
                  </div>
                  <div className="relative w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/1ba5350ea_0a7d50065_727ffcfb0809f8fc3ad0adfc661488f5d9aa6b86.png" alt="icon" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center text-[#f5e68e] text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>^*</span>
                  </div>
                  <div className="w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3f5ab1c39_f0b10e2b3_82519e3c8ae7d7ad3f7c199c9ff261fe44fe3368.png" alt="icon" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[18px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/763b01837_f015ef52a_a614098d37f9e14a312501d24af6e0dba9c3cca0.png" alt="icon" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative w-[18px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a111a7ebc_745fabdad_3a58aaa65722566acc80205738725a088c538c2b.png" alt="icon" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center text-[#a29570] text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>D</span>
                  </div>
                  <div className="relative w-[19px] min-h-[19px]">
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8576aea5a_3b51a0e95_cbac7b2557b21c1ae66ed3d82a96dee7cd9f2cd0.png" alt="icon" className="w-full h-full object-cover" />
                    <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/4d097b4f4_7c86d9c38_9c5ec82eba1042929e3fd4c483e419d4c715d882.png" alt="icon-inner" className="absolute inset-0 m-auto w-[11px] h-3 object-cover" />
                  </div>
                </div>
              </div>

              {/* Button grid row 1 */}
              <div className="grid grid-cols-3 gap-[7px] mt-1">
                <button
                  className="rounded-[8px] shadow-[inset_0_0_0_1px_#e9dff2] py-[15px] flex items-center justify-center"
                  style={{ background: "rgba(40,28,60,0.7)" }}
                >
                  <span className="text-[#777b84] text-[14px]" style={{ fontFamily: "Roboto, sans-serif" }}>Lịch sử đặt cược</span>
                </button>
                <button
                  className="rounded-[8px] shadow-[inset_0_0_0_1px_#ebe2f1] py-[15px] flex items-center justify-center"
                  style={{ background: "rgba(40,28,60,0.7)" }}
                >
                  <span className="text-[14px]" style={{ fontFamily: "Roboto, sans-serif", color: "#777b84" }}>Hồ sơ nạp tiền</span>
                </button>
                <button
                  className="rounded-[8px] shadow-[inset_0_0_0_1px_#e8e1ed] py-[15px] flex items-center justify-center"
                  style={{ background: "rgba(40,28,60,0.7)" }}
                >
                  <span className="text-[14px]" style={{ fontFamily: "Roboto, sans-serif", color: "#777b84" }}>Hồ sơ rút tiền</span>
                </button>
              </div>

              {/* Button grid row 2 */}
              <div className="grid grid-cols-3 gap-[7px]">
                <button
                  className="rounded-[7px] shadow-[inset_0_0_0_1px_#e8ddf0] py-[15px] flex items-center justify-center"
                  style={{ background: "rgba(40,28,60,0.7)" }}
                >
                  <span className="text-[14px]" style={{ fontFamily: "Roboto, sans-serif", color: "#777b84" }}>Hồ sơ nạp rút</span>
                </button>
                <button
                  className="rounded-[6px] shadow-[inset_0_0_0_1px_#e9dfef] py-[15px] flex items-center justify-center"
                  style={{ background: "rgba(40,28,60,0.7)" }}
                >
                  <span className="text-[14px]" style={{ fontFamily: "Roboto, sans-serif", color: "#777b85" }}>Liên kết tài khoản</span>
                </button>
                <div />
              </div>
            </div>
          </motion.div>

          {/* ── Hỗ trợ trực tuyến Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mx-[17px] mt-[18px] rounded-[18px_18px_6px_18px] shadow-[inset_0_0_0_1px_#205467] overflow-clip relative"
            style={{ minHeight: 163, background: "rgba(20,90,90,0.85)" }}
          >
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f654b7df8_9f1154d04_f4b858677542e7f8f34582a6f37b703125b14b67.png"
              alt="support bg"
              className="absolute right-0 top-0 h-full object-cover object-center"
              style={{ width: "60%" }}
            />
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f12b698f3_483299c31_d3286deb65aa30d4095971f3ea218a26758561fb.png"
              alt="support figure"
              className="absolute right-0 top-0 h-full object-cover object-right"
              style={{ width: "37%" }}
            />
            <div className="relative z-10 px-[16px] py-[14px]">
              <p
                className="text-white font-bold"
                style={{ fontFamily: "Mulish, sans-serif", fontSize: "clamp(14px,4.77vw,24px)", lineHeight: 1.375 }}
              >
                Hỗ trợ trực tuyến
              </p>
            </div>
          </motion.div>

          {/* ── Nạp tiền Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mx-[17px] mt-[18px] rounded-[18px] overflow-clip relative"
            style={{ minHeight: 164 }}
          >
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/0f56d0d71_288b4204d_93df9e8ccba8ac6a6d7742b54bc83688650ff008.png"
              alt="deposit bg"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/0289d46f5_ec0ae3e66_c0a890063a305a0ade91d27b45714c2e0c5254f5.png"
              alt="deposit figure"
              className="absolute right-0 top-0 h-full object-cover object-right"
              style={{ width: "45%" }}
            />
            <div className="relative z-10 px-[16px] py-[16px]">
              <p
                className="text-white font-bold"
                style={{ fontFamily: "Oxygen, sans-serif", fontSize: "clamp(14px,4.97vw,25px)", lineHeight: 1.36 }}
              >
                Nap tiên
              </p>
            </div>
          </motion.div>

          {/* ── Rút tiền mặt Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-[13px] mt-[18px] rounded-[18px] overflow-clip relative"
            style={{ minHeight: 171 }}
          >
            <img
              src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/87daee7e9_2e101cf56_614b177e0e8cd74d7326bb2b8156b41bc149fd3c.png"
              alt="withdraw bg"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="relative z-10 px-[20px] py-[19px]">
              <p
                className="text-white font-bold"
                style={{ fontFamily: "Mulish, sans-serif", fontSize: "clamp(14px,4.77vw,24px)", lineHeight: 1.375 }}
              >
                Rút tiền mặt
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Navigation Bar ── */}
        <BottomNav />
      </div>
    </main>
  );
}
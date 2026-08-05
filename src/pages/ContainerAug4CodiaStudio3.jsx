import React from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const GameCard = ({ title, titleClass, bgImg, personImg, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="grid grid-cols-[341fr_131fr] w-full h-[163px] rounded-[16px] overflow-clip cursor-pointer shadow-lg"
    >
      <div className="relative h-full w-full">
        <img
          src={bgImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center pl-[15px]">
          <p className={titleClass}>{title}</p>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={personImg}
          alt="Character"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </motion.div>
  );
};

export default function ContainerAug4CodiaStudio3() {
  return (
    <main className="w-full max-w-[508px] mx-auto h-[100dvh] relative overflow-clip bg-figma-primary">
      {/* Fixed Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/cee6dce40_a4b3ae555_6427908b764171071c7981263549fddb03fc6980.png"
          alt="App Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 h-full overflow-y-auto pb-28 px-[15px] pt-[clamp(16px,9.3vw,47px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Section 1: May mắn 28 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-[26px] ml-[-4px]"
        >
          <h1 className="text-figma-22 font-bold font-figma-geist leading-figma-32 text-[#dadcdf]">
            May mắn 28
          </h1>
        </motion.div>

        <div className="flex flex-col gap-[18px]">
          <GameCard
            title="Sơ cấp"
            titleClass="text-[clamp(20px,7.28vw,37px)] font-bold font-figma-cabin leading-[1.3243] text-figma-text-5-4"
            bgImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/35d75f258_27622e03b_24fe742b36d41a0ab8244a2849bdc2eaac973997.png"
            personImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3f865c9d1_1c9bffcd2_b21b242b7fb447f9afd102c3e352440ffc6f887e.png"
            delay={0.1}
          />
          <GameCard
            title="Trung cấp"
            titleClass="text-[clamp(20px,7.28vw,37px)] font-bold font-figma-inter leading-[1.3784] text-figma-text-8-4"
            bgImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/84be3000d_3fe1c8a8e_9a80bceae743a0f8f25bb33bb2fd0eb6f27b7e03.png"
            personImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/6578036d1_72b27fd3f_5eca3b06761b285d4b4b974f266ae497f0cbad3e.png"
            delay={0.2}
          />
          <GameCard
            title="Cao câp"
            titleClass="text-[clamp(23px,8.27vw,42px)] font-bold font-figma-cabin leading-[1.1429] text-figma-text-7-4"
            bgImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/bda108e1a_8a0747d7f_aa2e6b09a0e80d5dd3f89d7584a9e3db730a7c50.png"
            personImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/bea6ca4d2_df09738b7_84fd01e288ffd621400eb82413313e923239fcf3.png"
            delay={0.3}
          />
          <GameCard
            title="Phòng VIP"
            titleClass="text-[clamp(21px,7.48vw,38px)] font-bold font-figma-arimo leading-[1.3421] text-[#f9f6da]"
            bgImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f2972426b_a7a04eab7_2b3a61abc7e6e289cf4ceb88d29f60326f813712.png"
            personImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5ed051474_2218680b1_a20ab58a7ee13f63f0d368322483e20cf6df097a.png"
            delay={0.4}
          />
        </div>

        {/* Section 2: New Zealand may mǎn 28 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-[clamp(16px,8.5vw,43px)] mb-[23px] ml-[-4px]"
        >
          <h2 className="text-[clamp(14px,4.72vw,24px)] font-bold font-figma-roboto leading-[1.2917] text-figma-text-10-4">
            New Zealand may mǎn 28
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[18px]">
          <GameCard
            title="Sơ cấp"
            titleClass="text-[clamp(20px,7.28vw,37px)] font-bold font-figma-cabin leading-[1.3514] text-figma-text-5-4"
            bgImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/08830bbf7_69fe64468_8d7a07caf0413d32022514b012f168e128d5334b.png"
            personImg="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/63be4af78_6feaf2b01_5657881e2807340439dd6ceb2b69211cdc13a644.png"
            delay={0.1}
          />
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
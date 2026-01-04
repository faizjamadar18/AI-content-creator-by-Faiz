"use client";

import React from "react";
import HeroSection from "@/components/sections/hero-section";
import FeatureSection from "@/components/sections/feature-section";
import ProcessSection from "@/components/sections/process-section";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";
import {  DM_Sans } from "next/font/google";
import Testimonials from "@/components/sections/testomonials";

const dm_Sans = DM_Sans({ subsets: ["latin"] });
export default function Home() {

  return (
    <div className={`${dm_Sans.className}`}>
      {/* Hero Section */}
      <div className="relative">
      <HeroSection/>
      </div>
      <FeatureSection/>
      <ProcessSection/>
      <Testimonials/>
      <CtaSection/>
      <Footer/>
    </div>

  );
}




"use client";

import React from "react";
import HeroSection from "@/components/sections/hero-section";
import FeatureSection from "@/components/sections/feature-section";
import ProcessSection from "@/components/sections/process-section";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";

export default function Home() {


  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection/>
      <FeatureSection/>
      <ProcessSection/>
      <CtaSection/>
      <Footer/>
    </div>

  );
}




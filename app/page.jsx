"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  features,
  platformTabs,
  socialProofStats,
  testimonials,
} from "@/lib/data";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const gradientText =
  "bg-gradient-to-r from-[#FAD961] via-[#F76B1C] to-[#845EF3] bg-clip-text text-transparent";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000] text-white">
      <div className="relative z-10 px-4 sm:px-8 lg:px-16">
        {/* HERO */}
        <header id="home" className="relative flex min-h-[85vh] flex-col items-center justify-center py-20 text-center mt-12">
          <div className="absolute inset-x-0 top-0 mx-auto h-[500px] max-w-6xl rounded-full bg-gradient-to-b from-transparent via-[#1B1130]/40 to-transparent blur-3xl" />
          <div className="relative z-10 mx-auto max-w-6xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-200">
              <Sparkles className="h-4 w-4 text-pink-200" />
              AI-Powered Social media Platform
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                A Social Platform
                <span className={`block text-5xl sm:text-6xl lg:text-7xl font-black ${gradientText}`}>
                  for Effortless Content Creation
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Generate stunning posts, AI-optimized descriptions, and enhance your photos with background removal and professional shadow generation All with the help of AI
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full bg-black hover:bg-[#191919] px-8 py-6 text-base font-semibold text-white border-2">
                  Start Creating for free
                </Button>
              </Link>

              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full  bg-gradient-to-br from-[#FFC371]/30 to-[#8A6CFF]/30 px-8 py-6 text-base font-semibold text-white hover:bg-[#191919]">
                  Explore The feed
                </Button>
              </Link>

            </div>
          </div>
        </header>

        {/* BRAND STORY */}
        <section
          id="vision"
          className="relative overflow-hidden rounded-[44px] border border-white/10 bg-gradient-to-br from-[#050518] via-[#09031C] to-[#1A0F2B] px-8 py-12 lg:px-28 lg:py-16 shadow-[0_35px_120px_rgba(2,1,9,0.6)]"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#FFC371]/30 to-[#8A6CFF]/30 blur-3xl" />
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="">
              {/* <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FFC371] to-[#845EF3]" />
                <div className="text-xs uppercase tracking-[0.5em] text-gray-400">
                  Faiz Jamadar
                </div>
              </div> */}
              <h2 className={`text-4xl font-semibold ${gradientText} text-center`}>
                Your Content Supercharged by AI
              </h2>
              {/* <div className="flex gap-10 text-sm text-gray-400">
                <div>
                  <p className="text-white">Version 2.0</p>
                  <p>Released: Nov 2025</p>
                </div>
                <div>
                  <p className="text-white">Status: Live</p>
                  <p>Theme: Dark</p>
                </div>
              </div> */}
            </div>
            <p className="text-gray-400 leading-relaxed text-center">
              Stop juggling multiple tools to create one post. Your new AI-based social media platform integrates powerful, one-click AI tools directly into the posting workflow. From crafting the perfect caption and generating image-ready photos, everything you need to connect with your audience is in one space
            </p>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section id="suite" className="my-36">
          <div className="flex flex-col gap-4 text-center">
            {/* <Badge className="mx-auto rounded-full border border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-gray-200">
              Faizbook.ai toolkit
            </Badge> */}
            <h3 className="text-3xl sm:text-4xl font-black">
               Toolkit preview
            </h3>
            <p className="mb-3.5 text-xs uppercase tracking-[0.5em] text-gray-500 text-center">
              What all features we provide 
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,2,12,0.4)] transition hover:-translate-y-1 hover:border-white/30"
              >
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold">{feature.title}</p>
                <p className="mt-2 text-base text-gray-300">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center justify-center">
            <div>
              <h3 className="mt-3 text-4xl font-black items-center text-center">
                How It works
              </h3>
              <p className=" my-3 text-xs uppercase tracking-[0.5em] text-gray-500 text-center">
                Tap a stage to preview how Faizbook.ai automates.
              </p>
            </div>
          </div>
          <div className="mt-12">

            <div className="">
              <div className="flex flex-wrap gap-3 justify-center mb-5 ">
                {platformTabs.map((tab, index) => (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(index)}
                    className={`rounded-full border px-6 py-2 text-sm transition ${activeTab === index
                      ? "border-white/50 bg-white/10 text-white"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[36px] border border-white/15 bg-gradient-to-br from-[#03040d] via-[#0f0b27] to-[#1c0f2f] p-10 shadow-[0_30px_90px_rgba(1,0,5,0.7)] xl:w-5xl text-center mx-auto">
              <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
                {platformTabs[activeTab].title}
              </p>
              <h4 className={`mt-3 text-3xl font-semibold ${gradientText}`}>
                {platformTabs[activeTab].description}
              </h4>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {platformTabs[activeTab].features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <p className="text-gray-100">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF & TESTIMONIALS */}
        <section id="proof" className="py-16">
          <div className="rounded-[40px] border border-white/10 bg-[#06071B]/90 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center justify-center">
              <div>
                <h3 className="mt-3 text-4xl font-black items-center text-center">
                  Proofs
                </h3>
                <p className=" mt-3 text-xs uppercase tracking-[0.5em] text-gray-500 text-center">
                  Creators worldwide trust on  Faizbook.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="rounded-3xl border-white/10 bg-white/5 p-6 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-200">“{testimonial.content}”</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=96&h=96&fit=crop&crop=face`}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border border-white/20 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <Badge className="mt-1 border-white/30 bg-white/10 text-white">
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="create" className="py-16">
          <div className="rounded-[40px] border border-white/15 bg-gradient-to-r from-[#1E0A4C] via-[#4B0F54] to-[#F76B1C] p-10 text-center shadow-[0_30px_120px_rgba(11,4,25,0.9)]">
            <p className="text-xs uppercase tracking-[0.5em] text-white/70">
              Ready to create
            </p>
            <h3 className="mt-4 text-4xl font-semibold">
              Ready to Transform Your Social Presence?
            </h3>
            <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">
              Start generating perfect content, professionally enhancing your images, and connecting with your audience on the platform built for the future of social media.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button className="rounded-full bg-white px-10 py-6 text-lg font-semibold text-black hover:bg-white/90">
                  Start your journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/feed">
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 px-10 py-6 text-lg text-white hover:bg-white/10"
                >
                  Explore the feed
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-10 text-sm text-gray-400">
          <div className="flex flex-wrap items-center gap-4">
            {/* <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#FFC371] to-[#845EF3]" />
              <div>
                <p className="font-semibold text-white">Faizbook.ai</p>
                <p className="text-xs uppercase tracking-[0.3em]">Faiz Jamadar</p>
              </div>
            </div>
            <div className="flex-1" /> */}
            {/* <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em]">
              <Link href="#vision" className="hover:text-white">Brand</Link>
              <Link href="#suite" className="hover:text-white">Toolkit</Link>
              <Link href="#workflow" className="hover:text-white">Flow</Link>
              <Link href="#proof" className="hover:text-white">Proof</Link>
            </div> */}
            <p className="text-xs text-gray-500 w-full text-center">
              Copyright © 2025 by Faiz | All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

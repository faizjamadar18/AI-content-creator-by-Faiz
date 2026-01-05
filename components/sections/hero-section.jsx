"use client"
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";
import AnimationContainer from "@/components/global/animate-conatiner";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";


const HeroSection = () => {
  return (
    <section className=
      "h-full mx-auto w-full max-w-full md:max-w-screen-xl px-4 md:px-12 lg:px-20 md:pt-34 pt-34">

        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] dark:bg-neutral-950"></div>
      <div className="flex flex-col items-center justify-center w-full text-center bg-gradient-to-t from-background ">

        <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">

          <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
            <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/20"></span>
            <span className="z-10 py-0.5 text-xs md:text-sm text-neutral-100 flex items-center justify-center gap-1">
              ✨ AI-Powered Social Media Platform
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </span>
          </button>
          <h1 className="text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance md:text-8xl !leading-[1.15] w-full font-heading z-50">
            Create Content <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-bloc">
              Effortlessly
            </span>
          </h1>
          <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance z-50">
            Generate stunning posts, AI-optimized caption and enhance your posts with precise
            <br className="hidden md:block" />
            <span className="hidden md:block">background removal and professional shadow generation using AI</span>
          </p>
          <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
            <Button asChild>
              <Link href={"/dashboard"} className="flex items-center">
                Start creating for free
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </AnimationContainer>


        <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-20 px-2 bg-transparent w-full">
          <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
          <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
            <BorderBeam
              size={250}
              duration={12}
              delay={9}
            />
            <img
              src="/hero-image.png"
              alt="Dashboard"
              // width={1200}
              // height={1200}
              // quality={100}
              className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
            />
            <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
            <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
          </div>
        </AnimationContainer>
      </div>
    </section>
  )
}

export default HeroSection

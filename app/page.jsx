"use client";
import {
  IconAdjustmentsBolt,
  IconAnalyze,
  IconArrowAutofitContent,
  IconCalendar,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconImageInPicture,
  IconPencil,
  IconRouteAltLeft,
  IconTerminal2,
  IconTrendingUp,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";


const Feature = ({
  title,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default function Home() {
  const featurescard = [
    {
      title: "AI Writing Assistant",
      description:
        "Get smart suggestions for titles, content, and SEO optimization",
      icon: <IconPencil />,
    },
    {
      title: "Community Building",
      description: "Grow your audience with followers, comments, and engagement tools",
      icon: <IconCloud />,
    },
    {
      title: "Analytics & Insights",
      description: "Track performance with detailed view counts and engagement metrics",
      icon: <IconAnalyze />,
    },
    {
      title: "Content Scheduling",
      description:
        "Plan and schedule your content with real-time updates",
      icon: <IconCalendar />,
    },
    {
      title: "AI Image Transformations",
      description:
        "Transform images with background removal, smart crop, and text overlays",
      icon: <IconImageInPicture />,
    },
    {
      title: "Content Discovery",
      description: "Explore trending content and discover new creators in your feed",
      icon: <IconTrendingUp />,
    },
        {
      title: "Built for Everyone",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <IconHeart />,
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />, 
    },
  ];


  return (
    <div>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative mx-auto mt-50 md:mt-40 flex max-w-7xl flex-col items-center justify-center">
        <div className="px-4 py-10 md:py-20">
          <div >
            <h1
              className="relative z-10 mx-auto max-w-6xl text-center text-3xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">

              {"A Social Platform for Effortless Content Creation"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block">
                    {word}
                  </motion.span>
                ))}
            </h1>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
              className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
              Generate stunning posts, AI-optimized descriptions, and enhance your photos with background removal and professional shadow generation All with the help of AI
            </motion.p>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 1,
              }}
              className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="/dashboard">
                <button
                  className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Start Creatng for free
                </button>
              </a>
              <a href="/feed">
                <button
                  className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                  Explore Feed
                </button>
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className="relative z-10 md:mt-40 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div
              className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <img
                src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                alt="Landing page preview"
                className="aspect-[16/9] h-auto w-full object-cover"
                height={1000}
                width={1000} />
            </div>
          </motion.div>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
          {featurescard.map((featurescard, index) => (
            <Feature key={featurescard.title} {...featurescard} index={index} />
          ))}
        </div>

        <div className="w-full">
          <div className="mx-auto max-w-7xl">
            <div className="relative isolate overflow-hidden px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-black sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              >
                <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                  <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#FFFFFF" />
                    <stop offset={1} stopColor="#FFFFFF" />
                  </radialGradient>
                </defs>
              </svg>
              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
                  A platform that turns your ideas into engaging content 
                </h2>
                <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                 Join thousands of creators who are already building their audience and growing their business with our AI-powered platform.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="/dashboard"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black inset-ring inset-ring-white/5 hover:bg-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {' '}
                    Get started{' '}
                  </a>
                  <a href="/feed" className="text-sm/6 font-semibold text-white hover:text-gray-100">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="relative mt-16 h-80 lg:mt-8">
                <img
                  alt="App screenshot"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                  width={1824}
                  height={1080}
                  className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      <footer className="text-sm text-gray-400">
        <div className="flex flex-wrap items-center my-8">
          <p className="text-sm text-gray-300 w-full text-center">
            Design & Developed by <strong className="font-black text-white">Faiz</strong>
          </p>
          <p className="text-xs text-gray-500 w-full text-center">
            © 2025. All rights reserved.
          </p>

        </div>
      </footer>
    </div>

  );
}




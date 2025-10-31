"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { features, socialProofStats, testimonials, platformTabs } from "@/lib/data";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [mousePosition, setmousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const handleMouseMovement = (e) => {
      setmousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMovement)
    return () => {
      window.removeEventListener("mousemove", handleMouseMovement)
      // When your component disappears from the screen (unmounts), React runs the function you return from useEffect.
      // This cleanup removes the "mousemove" listener so that your function doesn’t keep running even after the component is gone.
    }
  }, [])


  return (
    <div className="bg-black text-white overflow-hidden relative min-h-screen">
      {/* Dynamic cursor effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse"></div>
      {/*fixed inset-0 → This div sticks to the whole screen, no matter where you scroll.  */}
      {/* animate-pulse → Makes the colors pulse slowly, like glowing. */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
        // pointer-event-none: This means the element does not respond to any mouse or touch interactions
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: "all 0.3s ease-out",
        }}
      // | Thing        | Meaning                        |
      // | ------------ | ------------------------------ |
      // | Circle size  | 384px (w-96 / h-96)            |
      // | Half size    | 192px                          |
      // | Subtract 192 | Center the circle on the mouse |


      ></div>
      {/* Hero Section */}
      <section className="relative z-10 mt-48 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 statss-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight">
                {/* leading-none means no extra space between lines */}
                {/* tracking-tight makes the letters closer together */}
                <span className="block font-black text-white">Create.</span>
                <span className="block font-light italic text-purple-300">
                  Publish.
                </span>
                <span className="block font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Grow.
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl md:max-w-none">
                {/* leading-relaxed = “slightly more spaced lines” */}
                The AI-powered platform that turns your ideas into{" "}
                <span className="text-purple-300 font-semibold">
                  engaging content
                </span>{" "}
                and helps you build a thriving creator business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 statss-center lg:statss-start  justify-center lg:justify-start">
              <Link href={"/dashboard"}>
                <Button variant={"primary"} size={"xl"} className="rounded-full w-full sm:w-auto text-white">Start Creating for Free</Button>
              </Link>
              <Link href={"/feed"}>
                <Button variant={"outline"} size={"xl"} className="rounded-full w-full sm:w-auto">Explore the Feed</Button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/banner.png"
              alt="Platform Banner"
              width={500}
              height={700}
              className="w-full h-auto object-contain"
              // object-containL: content fits inside its container without being cropped.
              priority
            />
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="relative mt-14 z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 ">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 lg:py-4">
              <h2 className="gradient-text-primary p-1">Everything you need</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">From AI-powered writing assistance to advanced analytics, we've built the complete toolkit for modern creators.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-6 ">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105 card-glass"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4 text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 ">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-1 lg:py-4">
              <h2 className="gradient-text-primary p-1">How it works</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">Three powerful modules working together to supercharge your content creation.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="space-y-4">
                {platformTabs.map((tab, index) => (
                  <Button
                    key={index}
                    variant={activeTab === index ? "outline" : "ghost"}
                    onClick={() => setActiveTab(index)}
                    className="w-full justify-start h-auto p-6 "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === index
                          ? "bg-gradient-to-br from-purple-500 to-blue-500"
                          : "bg-muted"
                          }`}
                      >
                        <tab.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{tab.title}</h3>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {platformTabs[activeTab].title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-400">
                    {platformTabs[activeTab].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {platformTabs[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex statss-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SocialProofStats:  */}
      <section className="relative mt-14 z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 ">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 lg:py-4">
              <h2 className="gradient-text-primary p-1">Loved by creators worldwide</h2>
            </div>
          </div>
          <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 sm:gap-6">
            {socialProofStats.map((stats, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stats.icon />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 gradient-text-accent">{stats.metric}</div>
                <div className="text-gray-400 text-base sm:text-lg">{stats.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*testomonials */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 ">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-1 lg:py-4">
              <h2 className="gradient-text-primary p-1">What creators say</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glass">
                <CardContent>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="mb-6 leading-relaxed text-gray-300">
                    &quot; Creatr transformed how I create content. The AI writing assistant saves me hours every week.&quot;
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        fill
                        className="rounded-full border-2 border-gray-700 object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>

      {/* LastSEcton  */}
      <section className="relative mt-14 z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 ">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 lg:py-4">
              <h2 className="gradient-text-primary p-1">Ready to create?</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">Join thousands of creators who are already building their audience and growing their business with our AI-powered platform.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button
                size="xl"
                variant="primary"
                className="rounded-full text-white w-full"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/feed">
              <Button
                variant="outline"
                size="xl"
                className="rounded-full w-full"
              >
                Explore the Feed
              </Button>
            </Link>

          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Made with ❤️ by{" "}
            <span className="text-foreground font-semibold">Faiz</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

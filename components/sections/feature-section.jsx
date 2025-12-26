import React from 'react'
import AnimationContainer from '../global/animate-conatiner'
import { BentoCard, BentoGrid, CARDS } from '../ui/bento-grid'
import MagicBadge from '../ui/magic-badge'

const FeatureSection = () => {
    return (
        <div className="pt-10 h-full mx-auto w-full max-w-full md:max-w-screen-xl px-4 md:px-12 lg:px-20">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
                    <MagicBadge title="Features" />
                    <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                        Create and Upload Posts Like a Pro
                    </h2>
                    <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                        Explore trending content, Grow your audience with followers, comments, and discover new creators in your feed
                    </p>
                </div>
            </AnimationContainer>
            <AnimationContainer delay={0.2}>
                <BentoGrid className="py-8">
                    {CARDS.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid>
            </AnimationContainer>
        </div>
    )
}

export default FeatureSection

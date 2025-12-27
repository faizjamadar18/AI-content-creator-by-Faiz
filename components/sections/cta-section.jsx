import React from 'react'
import { LampContainer } from '../ui/lamp'
import AnimationContainer from '../global/animate-conatiner'
import { Button } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const CtaSection = () => {
    return (

        <div className="mx-auto w-full md:max-w-screen-xl px-4 md:px-12 lg:px-20 max-w-[100vw] overflow-x-hidden scrollbar-hide">
            <AnimationContainer delay={0.1}>
                <LampContainer className="mt-20">
                    <div className="flex flex-col items-center justify-center relative w-full text-center">
                        <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-400 py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight text-transparent">
                            Ready to create?
                        </h2>
                        <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                            Join thousands of creators who are already building their audience and growing their business with our AI-powered platform.
                        </p>
                        <Link className="mt-6" href={"/dashboard"}>
                            <Button >
                                Get started for free
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </LampContainer>
            </AnimationContainer>
        </div>

    )
}

export default CtaSection

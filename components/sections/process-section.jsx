import AnimationContainer from '../global/animate-conatiner'
import MagicBadge from '../ui/magic-badge'
import { PROCESS } from '../ui/bento-grid'
import { MagicCard } from '../ui/magic-card'

const ProcessSection = () => {
    return (
        <div id='process'>
            <div className="py-10 mt-32 h-full mx-auto w-full max-w-full md:max-w-screen-xl px-4 md:px-12 lg:px-20">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                        <MagicBadge title="The Process" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Simple Steps Powerful Results.
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                            From creation to optimization and analytics, our AI handles the heavy lifting so you can grow faster.
                        </p>
                    </div>
                </AnimationContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-8 gap-4 md:gap-8 ">
                    {PROCESS.map((process, id) => (
                        <AnimationContainer delay={0.2 * id} key={id}  >
                            <MagicCard className="group p-10 rounded-2xl">
                                <div className="flex flex-col items-start justify-center w-full">
                                    <process.icon strokeWidth={1.5} className="w-10 h-10 text-foreground" />
                                    <div className="flex flex-col relative items-start">
                                        <span className="absolute -top-6 right-0 border-2 border-border text-foreground font-medium text-2xl rounded-full w-12 h-12 flex items-center justify-center pt-0.5">
                                            {id + 1}
                                        </span>
                                        <h3 className="text-base mt-6 font-medium text-foreground">
                                            {process.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {process.description}
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        </AnimationContainer>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProcessSection

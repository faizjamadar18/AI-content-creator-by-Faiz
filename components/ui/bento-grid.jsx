// import { ArrowRightIcon } from "@radix-ui/react-icons"
// import { buttonVariants } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { cn } from "@/utils";
import { ArrowRightIcon, BarChart3Icon, CalendarIcon, FolderOpenIcon, Image, Link2Icon, PenToolIcon, SearchIcon, Share2Icon, WandSparklesIcon, WaypointsIcon } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
// import { Input } from "./input";
// import { Integrations } from "./integrations";
// import { Label } from "./label";
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"



import { Calendar } from "./calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Command } from "./command";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Integrations } from "./integration";

export const CARDS = [
  {
    
    Icon: PenToolIcon,
    name: "AI-powered writing tools",
    description: "that help you create engaging content faster than ever before.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105 border border-border border-r-0">
        <CardHeader>
          <CardTitle>
            AI Writing Assistant
          </CardTitle>
          <CardDescription>
            Get smart Captions for your post based on the Title and Image.
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-4">
          <Label>
            Upload Image and give the title 
          </Label>
          <Input
            type="text"
            placeholder="Boom...Your Caption is ready"
            className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </CardContent>
      </Card>
    ),
  },
  {
    Icon: SearchIcon,
    name: "Search for Creators",
    description: "Explore trending content and discover new creators in your feed",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-to translate-x-0 border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10 p-2">
        <Input placeholder="Type to search..." />
        <div className="mt-1 cursor-pointer">
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user1</div>
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user2</div>
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user3</div>
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user4</div>
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user5</div>
          <div className="px-4 py-2 hover:bg-muted rounded-md">faizbook.ai/user6</div>
        </div>
      </Command>
    ),
  },
  {
    Icon: WaypointsIcon,
    name: "AI-Powered Content Workflow",
    description: "The Efficient and prominant use of AI",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
    background: (
      <Integrations className="absolute right-2 pl-28 md:pl-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 bg-black" />
    ),
  },
  {
    Icon: BarChart3Icon,
    name: "Analytics & Insights",
    description: "Track performance of your posts and content every single day.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

const BentoGrid = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}
      {...props}>
      {children}
    </div>
  );
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      // "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-black transform-gpu dark:[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}>
    <div>{background}</div>
    <div className="p-4">
      <div
        className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon
          className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}>
        <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}>
      <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div
      className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
)
export const PROCESS = [
  {
    title: "Create",
    description: "Generate stunning posts with AI, including background removal and professional shadows",
    icon: Image,
  },
  {
    title: "Optimize",
    description: "Get AI-powered captions and rich text editor to enhance your designed to boost engagement.",
    icon: WandSparklesIcon,
  },
  {
    title: "Share",
    description: "Publish your content effortlessly and Track performance with smarter analytics",
    icon: Share2Icon,
  },
];

export { BentoCard, BentoGrid }

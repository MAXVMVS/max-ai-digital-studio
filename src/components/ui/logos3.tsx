"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
  isCustomSvg?: boolean;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
  isDark?: boolean;
}

const Logos3 = ({
  isDark = true,
  logos = [
    {
      id: "n8n",
      description: "n8n",
      image: "https://cdn.simpleicons.org/n8n",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "google-ai-studio",
      description: "Google AI Studio",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/google-color.svg",
      className: "h-7 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "gemini",
      description: "Gemini",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "chatgpt",
      description: "ChatGPT",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg",
      className: "h-8 w-auto text-zinc-500 dark:text-zinc-600 hover:text-[#10a37f] dark:hover:text-[#10a37f] opacity-60 dark:opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105",
      isCustomSvg: true,
    },
    {
      id: "python",
      description: "Python",
      image: "https://cdn.simpleicons.org/python",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "supabase",
      description: "Supabase",
      image: "https://cdn.simpleicons.org/supabase",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "firebase",
      description: "Firebase",
      image: "https://cdn.simpleicons.org/firebase",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "vercel",
      description: "Vercel",
      image: "https://cdn.simpleicons.org/vercel",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:invert transition-all duration-300 hover:scale-105",
    },
    {
      id: "hostinger",
      description: "Hostinger",
      image: "https://cdn.simpleicons.org/hostinger",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "nextjs",
      description: "Next.js",
      image: "https://cdn.simpleicons.org/nextdotjs",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:invert transition-all duration-300 hover:scale-105",
    },
    {
      id: "react",
      description: "React",
      image: "https://cdn.simpleicons.org/react",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "tailwindcss",
      description: "Tailwind CSS",
      image: "https://cdn.simpleicons.org/tailwindcss",
      className: "h-5 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "antigravity",
      description: "Antigravity",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/antigravity.svg",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
    {
      id: "linux",
      description: "Linux",
      image: "https://cdn.simpleicons.org/linux",
      className: "h-8 w-auto grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105",
    },
  ],
}: Logos3Props) => {
  return (
    <div className="w-full mt-6 pt-6 border-t border-white/5">
      <div className="relative mx-auto flex items-center justify-center max-w-lg overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.2 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0 flex items-center">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4"
              >
                <div className="mx-4 flex shrink-0 items-center justify-center">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className={`absolute inset-y-0 left-0 w-10 bg-gradient-to-r ${isDark ? 'from-[#020813]' : 'from-[#D6CFBE]'} to-transparent z-10 pointer-events-none`}></div>
        <div className={`absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${isDark ? 'from-[#020813]' : 'from-[#D6CFBE]'} to-transparent z-10 pointer-events-none`}></div>
      </div>
    </div>
  );
};

export { Logos3 };

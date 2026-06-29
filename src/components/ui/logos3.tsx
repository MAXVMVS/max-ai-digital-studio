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
      image: `https://cdn.simpleicons.org/n8n/${isDark ? 'FF6C37' : 'c2410c'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "google-ai-studio",
      description: "Google AI Studio",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/google-color.svg",
      className: "h-10 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "gemini",
      description: "Gemini",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "chatgpt",
      description: "ChatGPT",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg",
      className: `h-11 w-auto ${isDark ? 'text-[#10a37f]' : 'text-zinc-900'} hover:scale-105 transition-all duration-300`,
      isCustomSvg: true,
    },
    {
      id: "python",
      description: "Python",
      image: "https://svgl.app/library/python.svg",
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "supabase",
      description: "Supabase",
      image: `https://cdn.simpleicons.org/supabase/${isDark ? '3ECF8E' : '047857'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "firebase",
      description: "Firebase",
      image: `https://cdn.simpleicons.org/firebase/${isDark ? 'FFCA28' : 'b45309'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "vercel",
      description: "Vercel",
      image: `https://cdn.simpleicons.org/vercel/${isDark ? 'FFF' : '000'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "hostinger",
      description: "Hostinger",
      image: `https://cdn.simpleicons.org/hostinger/${isDark ? '673DE6' : '4f46e5'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "nextjs",
      description: "Next.js",
      image: `https://cdn.simpleicons.org/nextdotjs/${isDark ? 'FFF' : '000'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "react",
      description: "React",
      image: `https://cdn.simpleicons.org/react/${isDark ? '61DAFB' : '0369a1'}`,
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "tailwindcss",
      description: "Tailwind CSS",
      image: "https://svgl.app/library/tailwindcss.svg",
      className: "h-7 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "antigravity",
      description: "Antigravity",
      image: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/antigravity-color.svg",
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
    {
      id: "linux",
      description: "Linux",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
      className: "h-11 w-auto hover:scale-105 transition-all duration-300",
    },
  ],
}: Logos3Props) => {
  return (
    <div className="w-full mt-6 pt-6 border-t border-white/5">
      <div className="relative mx-auto flex items-center justify-center max-w-2xl overflow-hidden">
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

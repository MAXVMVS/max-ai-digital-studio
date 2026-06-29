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
  invertInDark?: boolean;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
  isDark?: boolean;
}

const Logos3 = ({
  heading = "Ecosistema de Herramientas",
  isDark = true,
  logos = [
    {
      id: "logo-1",
      description: "Astro",
      image: "https://www.shadcnblocks.com/images/block/logos/astro.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
    },
    {
      id: "logo-2",
      description: "Figma",
      image: "https://www.shadcnblocks.com/images/block/logos/figma.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
    },
    {
      id: "logo-3",
      description: "Next.js",
      image: "https://www.shadcnblocks.com/images/block/logos/nextjs.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
      invertInDark: true,
    },
    {
      id: "logo-4",
      description: "React",
      image: "https://www.shadcnblocks.com/images/block/logos/react.png",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
    },
    {
      id: "logo-5",
      description: "shadcn/ui",
      image: "https://www.shadcnblocks.com/images/block/logos/shadcn-ui.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
      invertInDark: true,
    },
    {
      id: "logo-6",
      description: "Supabase",
      image: "https://www.shadcnblocks.com/images/block/logos/supabase.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
    },
    {
      id: "logo-7",
      description: "Tailwind CSS",
      image: "https://www.shadcnblocks.com/images/block/logos/tailwind.svg",
      className: "h-5 w-auto opacity-75 hover:opacity-100 transition-opacity",
    },
    {
      id: "logo-8",
      description: "Vercel",
      image: "https://www.shadcnblocks.com/images/block/logos/vercel.svg",
      className: "h-8 w-auto opacity-75 hover:opacity-100 transition-opacity",
      invertInDark: true,
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
                    className={`${logo.className} ${logo.invertInDark && isDark ? "invert" : ""}`}
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

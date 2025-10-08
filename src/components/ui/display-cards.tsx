"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  borderColor?: string;
  animateY?: number[];
  zIndex?: number;
  animationDelay?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  imageSrc,
  imageAlt = "Card image",
  borderColor,
  animateY,
  zIndex = 0,
  animationDelay = 0,
}: DisplayCardProps) {
  const shadowIntensity = (zIndex + 1) * 10;
  
  return (
    <motion.div
      className={cn(
        "relative h-[14rem] w-[22rem] select-none rounded-xl border-2 bg-white overflow-hidden",
        borderColor ? "" : "border-gray-200",
        className
      )}
      style={{
        ...(borderColor ? { borderColor } : {}),
        zIndex: zIndex,
        boxShadow: `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0, 0, 0, ${0.08 + zIndex * 0.04})`,
      }}
      initial={{
        skewY: -8,
      }}
      animate={{
        y: animateY || 0,
        skewY: -8,
      }}
      transition={animateY ? {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
        delay: animationDelay,
      } : undefined}
    >
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
    </motion.div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}


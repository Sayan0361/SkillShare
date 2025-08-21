"use client";

import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";

export function ConfettiSideCannons() {
  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative">
      <Button onClick={handleClick} className={"bg-[#fac638] text-[#1c1b0d] hover:bg-[#fbbf24] cursor-pointer px-6 py-2 rounded-full text-base font-semibold"}>Useless Skills Leaderboard</Button>
    </div>
  );
}

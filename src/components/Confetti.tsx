'use client'

import { useConfettiContext } from "@/context/ConfettiContext";
import { FC } from "react";
import Confetti from "react-confetti-boom";

const ConfettiOverlay: FC = () => {
  const { showConfetti } = useConfettiContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {showConfetti && 
        <Confetti mode="boom" particleCount={150} colors={[
          '#ff577f', '#ff884b', '#ffd384', '#fff9b0'
        ]} />
      }
    </div>
  )
};

export default ConfettiOverlay;

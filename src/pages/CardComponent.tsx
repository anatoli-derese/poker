import React from "react";
import { Card } from "@/interfaces/card";

interface CardProps {
  card: Card;
}

const CardComponent = ({ card }: { card: { suit: string; rank: string } }) => {
    const suitEmojis: Record<string, string> = {
      c: "♣️", // Clubs
      d: "♦️", // Diamonds
      h: "♥️", // Hearts
      s: "♠️", // Spades
    };
  
    // Conditional class based on the suit
    const textColor =
      card.suit === "h" || card.suit === "d" ? "text-red-700" : "text-black";
  
    return (
        <div className="flex flex-row items-center justify-center border rounded p-2 w-16 h-16 text-lg bg-white gap-1">
        <span className={`font-bold ${textColor}`}>{card.rank}</span>
        <span className={`font-bold ${textColor}`}>{suitEmojis[card.suit]}</span>
      </div>
    );
  };
  

export default CardComponent;

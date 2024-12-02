"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Snowfall = () => {
  const [isClient, setIsClient] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialiser la hauteur au chargement

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return null;

  const snowflakes = new Array(50).fill(0); // Nombre de flocons

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {snowflakes.map((_, index) => {
        const delay = Math.random() * 5; // Retard initial aléatoire (0 à 5s)
        const duration = Math.random() * 10 + 5; // Durée aléatoire (5 à 15s)

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`, // Position horizontale aléatoire
              width: `${Math.random() * 10 + 10}px`, // Taille aléatoire (10 à 20px)
              height: `${Math.random() * 10 + 10}px`,
            }}
            initial={{
              y: -50, // Flocon commence au-dessus de l'écran
              opacity: 0, // Transparence au début
            }}
            animate={{
              y: pageHeight, // Descend sur toute la hauteur de la page
              x: `${Math.random() * 20 - 10}%`, // Variation horizontale (vent)
              opacity: [0.5, 0.9, 0.9, 0.5], // Transparence progressive
            }}
            transition={{
              duration, // Durée de la chute
              delay, // Décalage initial
              repeat: Infinity, // Répétition infinie
              ease: "easeInOut", // Mouvement fluide
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Snowfall;

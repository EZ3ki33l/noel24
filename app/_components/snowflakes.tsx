"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Snowfall = () => {
  const [isClient, setIsClient] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);

  // Charge côté client uniquement
  useEffect(() => {
    setIsClient(true);
    // Met à jour la hauteur de la page dès que le composant est monté
    const handleResize = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };

    // Écouteur d'événements pour ajuster la hauteur de la page lors du redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);

    // Initialiser la hauteur au chargement de la page
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return null;

  const snowflakes = new Array(50).fill(0); // Nombre de flocons

  return (
    <div className="absolute top-1/2 left-1/2 w-[80%] h-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2">
      {snowflakes.map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`, // Position horizontale aléatoire
            width: "20px", // Taille des flocons
            height: "20px", // Taille des flocons
          }}
          initial={{
            y: -50, // Flocon commence au-dessus de l'écran
            opacity: 0.5, // Départ transparent
          }}
          animate={{
            y: pageHeight, // Utilisation de la hauteur totale de la page
            x: `${Math.random() * 10 - 5}%`, // Variation horizontale légère
            opacity: 0.9, // Flocon devient plus visible
          }}
          transition={{
            duration: Math.random() * 5 + 5, // Durée aléatoire entre 5 et 10 secondes
            repeat: Infinity, // Répétition infinie
            ease: "easeInOut", // Transition fluide
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
      ))}
    </div>
  );
};

export default Snowfall;

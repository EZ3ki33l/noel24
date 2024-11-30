import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react"; // Icône ArrowDown de Lucide

const AnimatedArrow = () => {
  return (
    <motion.div
      className="flex justify-center items-center"
      animate={{
        opacity: [1, 0, 1], // Cycle : 1 → 0 → 1 pour un clignotement
      }}
      transition={{
        opacity: {
          duration: 2, // Durée de l'animation pour un clignotement lent
          repeat: Infinity, // Animation en boucle infinie
          repeatType: "loop", // Type de répétition pour que l'animation boucle
          ease: "easeInOut", // Rendre l'animation fluide
        },
      }}
    >
      <ArrowDown size={32} color="#FFD700" /> {/* Flèche dorée */}
    </motion.div>
  );
};

export default AnimatedArrow;

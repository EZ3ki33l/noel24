"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Importation de framer-motion
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HoverEffect } from "./card";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import AnimatedArrow from "./arrow"; // Flèche animée

export type GiftData = {
  category: { id: number; name: string };
  id: number;
  title: string;
  url: string;
  price: number;
  content: JSONContent;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
};

export function ShowGifts({
  gifts = [],
  categories = [],
}: {
  gifts: GiftData[];
  categories: Category[];
}) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false); // État pour contrôler si la div est visible

  // Filtrage des cadeaux
  const filteredGifts =
    selectedGenre === null
      ? gifts
      : gifts.filter((gift) => gift.category.name === selectedGenre);

  // Validation des catégories
  const validCategories = categories.filter(
    (category) => category && category.name
  );

  // Référence de la div globale à observer
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true); // Si la div est visible, on active l'animation
          }
        });
      },
      { threshold: 0.5 } // Observer dès que 50% de la div est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // On observe la référence de la div globale
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Arrêter l'observation lors du démontage
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center my-8 sm:my-16 px-6 sm:px-14 text-gold relative">
      <div className="h-[90vh] sm:h-[100svh]">
        <h1 className="text-5xl sm:text-7xl text-center font-bodoni">
          Merry Xmas 24
        </h1>
        <div className="flex flex-col justify-center items-center space-y-8 sm:space-y-10">
          <Image
            src="/images/pnoel.png"
            width={200} // Moins large pour mobile
            height={200}
            alt="Père Noël"
            className="object-contain rounded-full"
          />
          <div className="text-center text-base sm:text-lg space-y-4 sm:space-y-5">
            <p className="text-2xl sm:text-3xl font-semibold">
              Ho ho ho… Salut toi !
            </p>
            <p>
              Bienvenue dans ma super lente liste de Noël ! <br />
              C'est moi, le Père Noël paresseux, prêt à t'aider à trouver tes
              cadeaux sans te presser. 🎅 <br />
              Pas besoin de courir dans tous les sens, je suis là pour te guider
              à mon rythme… très… lentement. 🦥 <br />
              Si tu cherches des idées, t'inquiète, tout est sous les cartes
              cliquables juste en dessous. Prends ton temps, il n'y a pas de
              rush ! Pendant ce temps, je vais m'octroyer une petite sieste bien
              méritée. 🎄 <br />
              Bonne recherche et joyeux Noël !
            </p>
          </div>
        </div>
      </div>

      {/* Flèche animée */}
      <div className="absolute top-[75vh] sm:top-[95svh] left-0 w-full flex justify-evenly pointer-events-none z-10">
        <AnimatedArrow />
        <AnimatedArrow />
        <AnimatedArrow />
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center space-y-8 w-full"
      >
        {/* Sélecteur de catégorie */}
        <div className="flex gap-3 sm:gap-5 pt-8 sm:pt-16 w-full sm:w-[80%] mx-auto">
          <Select
            onValueChange={(value) =>
              setSelectedGenre(value === "all-genres" ? null : value)
            }
            value={selectedGenre || "all-genres"}
          >
            <SelectTrigger className="w-full text-sm sm:text-base">
              <SelectValue placeholder="Tous les genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-genres" className="text-sm sm:text-base">
                Tous les genres
              </SelectItem>
              {validCategories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.name}
                  className="text-sm sm:text-base"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cartes cadeaux */}
        <div className="flex gap-6 sm:gap-8 justify-center items-center min-h-[15svh]">
          {filteredGifts.length === 0 ? (
            <p>Pas de cadeaux actuellement</p>
          ) : (
            <HoverEffect
              items={filteredGifts.map((gift) => ({
                title: gift.title,
                price: gift.price,
                content: gift.content,
                images: [gift.images[0]],
                link: gift.url,
              }))}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

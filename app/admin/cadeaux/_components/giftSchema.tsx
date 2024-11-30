import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  categories: z.number().int().min(1, "Vous devez choisir une catégorie."),
  url: z.string().min(1, "L'url est requise").url("L'url est invalide"),
  price: z.number().min(1, "Le prix est requis"),
  content: z
    .object({
      type: z.string(), // Tiptap génère des contenus avec "type" comme "doc"
      content: z.array(z.any()).optional(),
    })
    .refine((value) => value.type === "doc", {
      message: "Le contenu doit être un document valide",
    }),
  images: z.array(z.string().url()).min(1, "Au moins une image est requise"),
});

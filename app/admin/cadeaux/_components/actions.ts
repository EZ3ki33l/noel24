"use server";

import { UTApi } from "uploadthing/server";
import { NewsSchema } from "./giftSchema";
import { z } from "zod";
import { prisma } from "@/app/db/db";
import { Gifts } from "@prisma/client";

export async function deleteNewsWithImage(id: number) {
  try {
    // Étape 1 : Récupérer le film à supprimer, incluant ses images
    const news = await prisma.gifts.findUnique({
      where: { id: id },
      select: { images: true }, // Récupère uniquement les images
    });

    if (!news) {
      throw new Error("Cadeau introuvable");
    }

    console.log("Images à supprimer:", news.images);

    // Étape 2 : Supprimer les images via Uploadthing
    if (news.images && news.images.length > 0) {
      const utapi = new UTApi(); // Instance Uploadthing

      for (const image of news.images) {
        const fileId = image.substring(image.lastIndexOf("/") + 1); // Extraire l'identifiant
        console.log("Suppression du fichier :", fileId);
        await utapi.deleteFiles(fileId); // Supprimer le fichier
      }
    } else {
      console.log("Aucune image à supprimer pour ce cadeau.");
    }

    // Étape 3 : Supprimer le film de la base de données
    await prisma.gifts.delete({
      where: { id: id },
    });

    return { success: true, message: "Cadeau et images supprimés avec succès" };
  } catch (error: unknown) {
    const errorAsError = error as Error;
    console.error("Erreur lors de la suppression du cadeau :", errorAsError);
    throw new Error(errorAsError.message || "Erreur serveur");
  }
}

export async function CreateNews(data: Gifts) {
  try {
    // Validation with Zod
    const validatedData = NewsSchema.parse(data);

    // Create the movie and add the relations (genres)
    const news = await prisma.gifts.create({
      data: {
        title: validatedData.title,
        category: {
          connect: {
            id: validatedData.categories,
          },
        },
        url: validatedData.url,
        price: validatedData.price,
        content: validatedData.content,
        images: validatedData.images,
      },
    });

    return { success: true, news };
  } catch (error) {
    console.error("Error during gift creation:", error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    } else {
      return { success: false, message: "Internal server error" };
    }
  }
}

export async function getAllGifts() {
  return prisma.gifts.findMany({
    include: {
      category: true,
    },
  });
}

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllcategories } from "../../categories/_components/actions";
import { NewsSchema } from "./giftSchema";
import { CreateNews } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { TipTapEditor } from "@/app/_components/editor";
import { useRouter } from "next/navigation";
import { revalidatePath } from "@/hooks/revalidePath";

export function GiftsForm() {
  const form = useForm({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: "",
      categories: undefined,
      url: "",
      price: 0,
      content: null, // Initialisé comme contenu JSON
      images: [],
    },
  });

  const router = useRouter();

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await getAllcategories();
        setCategories(categories);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    }
    loadCategories();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);

      const result = await CreateNews({
        ...values,
        images: Array.isArray(values.images) ? values.images : [values.images],
      });

      if (result?.success) {
        toast("Article créé avec succès !");
        form.reset(); // Reset le formulaire
        router.push("/admin/cadeaux"); // Redirige vers /admin/cadeaux
        revalidatePath("/admin/cadeaux");
        revalidatePath("/");
      } else {
        toast.error(
          result?.message || "Erreur lors de la création de l'article."
        );
      }
    } catch (error) {
      toast.error("Erreur lors de la soumission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-44">
        <div className="flex flex-col gap-y-5 justify-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du cadeau :</FormLabel>
                <FormControl>
                  <Input required placeholder="Nom du cadeau" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie :</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL :</FormLabel>
                <FormControl>
                  <Input required placeholder="Lien du cadeau" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({}) => (
              <FormItem>
                <FormLabel>Prix :</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...form.register("price", { valueAsNumber: true })}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description :</FormLabel>
                <FormControl>
                  <TipTapEditor
                    setJson={field.onChange} // Relier à react-hook-form
                    json={form.watch("content")} // Récupérer l'état actuel
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images :</FormLabel>
                <UploadDropzone
                  className="h-[50svh]"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const uploadedUrls = res.map((file) => file.url);
                    field.onChange([
                      ...(field.value as string[]),
                      ...uploadedUrls,
                    ]);
                    toast.success("Téléchargement réussi !");
                  }}
                  onUploadError={() => {
                    toast.error("Erreur lors du téléchargement.");
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between pt-10">
          <Button variant="secondary" type="submit" disabled={loading}>
            Valider
          </Button>
        </div>
      </form>
    </Form>
  );
}

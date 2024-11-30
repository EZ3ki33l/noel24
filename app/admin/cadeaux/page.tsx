"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DeleteDropdownItem } from "./_components/deleteDropItems";
import { Button } from "@/components/ui/button";
import { getAllGifts } from "./_components/actions";
import { Navbar } from "../_components/navBar";

export default function NewsPage() {
  const [news, setNews] = useState<
    | {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: { name: string }[];
        url: string;
        content: string;
        images: string[];
      }[]
    | undefined
  >();

  // Fonction de suppression d'un film
  const handleDelete = (id: number) => {
    setNews((prevGifts) => prevGifts?.filter((gift) => gift.id !== id));
  };

  // Chargement des films
  useEffect(() => {
    async function loadNews() {
      try {
        const gifts = await getAllGifts();
        console.log(news); // Inspecte la structure de tes films
        const transformedNews = gifts.map((gift) => ({
          ...gift,
          category: [{ name: gift.categoryId.toString() }],
          content: String(gift.content), // Convert content to a string
        }));
        setNews(transformedNews);
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="space-y-5 mt-44">
      <Navbar />
      <div className="flex justify-between">
        <h1>Liste des cadeaux :</h1>
        <Link href={"/admin/cadeaux/nouveau"}>
          <Button>Créer un cadeaux</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Créé le</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news &&
            news.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.title}</TableCell>
                <TableCell>
                  {news.createdAt.getDate()}/{news.createdAt.getMonth()}/
                  {news.createdAt.getFullYear()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Action</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/cadeaux/${news.id}/edit`}>
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DeleteDropdownItem
                        id={news.id}
                        onDelete={handleDelete}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

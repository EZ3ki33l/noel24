"use client";

import React, { useEffect, useState } from "react";
import { EquipementForm } from "./_components/categoriesForm";
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
import { DeleteDropdownItem } from "./_components/deleteDropItem";
import { getAllcategories } from "./_components/actions";
import { Navbar } from "../_components/navBar";

export default function EquipementPage() {
  const [categories, setcategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const handleDelete = (id: number) => {
    setcategories((prevcategories) =>
      prevcategories.filter((category) => category.id !== id)
    );
  };

  useEffect(() => {
    async function loadcategories() {
      try {
        const categories = await getAllcategories();
        setcategories(categories);
      } catch (error) {
        console.error("Erreur lors du chargement des equipements :", error);
      }
    }
    loadcategories();
  }, []);

  return (
    <div className="space-y-16 mt-44">
      <Navbar />
      <div>
        <h1>Créer une catégorie :</h1>
        <EquipementForm />
      </div>
      <div>
        <h1>Liste des catégories :</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} className="my-auto">
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name} </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Action</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild></DropdownMenuItem>
                      <DeleteDropdownItem
                        id={category.id}
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
    </div>
  );
}

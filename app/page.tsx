import { ShowGifts } from "./_components/showGifts";
import { getAllGifts } from "./admin/cadeaux/_components/actions";
import { getAllcategories } from "./admin/categories/_components/actions";
import { GiftData } from "./_components/showGifts";
import { JSONContent } from '@tiptap/react';

export default async function Home() {
  const gifts: GiftData[] = (await getAllGifts()).map((gift) => ({
    ...gift,
    content: gift.content as JSONContent ?? ({ type: 'doc', content: [] } as JSONContent),
  }));
  const categories = await getAllcategories();


  return (
    <div>
      <ShowGifts gifts={gifts} categories={categories} />
    </div>
  );
}

import { ShowGifts } from "./_components/showGifts";
import { getAllGifts } from "./admin/cadeaux/_components/actions";
import { getAllcategories } from "./admin/categories/_components/actions";

export default async function Home() {
  const gifts = await getAllGifts();
  const categories = await getAllcategories();
  

  return (
    <div>
      <ShowGifts gifts={gifts} categories={categories} />
    </div>
  );
}

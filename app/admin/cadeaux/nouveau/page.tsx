import { Navbar } from "../../_components/navBar";
import { GiftsForm } from "../_components/giftForm";

export default function page() {
  return (
    <>
      <Navbar />
      <div>
        <GiftsForm />
      </div>
    </>
  );
}

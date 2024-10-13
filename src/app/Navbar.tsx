import logo from "@/assets/shirt.svg";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const cart = await getCart();

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Eazy Shirt logo" width={30} height={30} />
          <span className="text-xl font-bold">Eazy Shirt</span>
        </Link>
      </div>
    </header>
  );
}

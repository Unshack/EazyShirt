import logo from "@/assets/shirt.svg";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const cart = await getCart(getWixServerClient());

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Eazy Shirt logo" width={30} height={30} />
          <span className="text-xl font-bold">Eazy Shirt</span>
        </Link>
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}

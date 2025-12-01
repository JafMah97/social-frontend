import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href={"/"} className="h-full flex items-center">
        <span className="bg-primary inline-block max-h-10 px-2 rounded-lg font-black sm:text-4xl text-2xl">
          <span className="text-white">K</span>
        </span>
        <span className="font-black text-4xl text-primary flex">
          onekta
        </span>
      </Link>
    </>
  );
}

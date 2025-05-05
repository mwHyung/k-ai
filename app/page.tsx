import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/images/gate.png" alt="logo" width={1920} height={1080} />
      <div className="absolute top-0 left-0 w-full h-full">
        <Link
          href="/pc"
          className="w-[670px] h-[386px] absolute top-1/2 left-1/2 -translate-x-[70%] -translate-y-[45%]"
        />
        <Link
          href="/mobile"
          className="w-[200px] h-[398px] absolute top-1/2 left-1/2 translate-x-[134%] -translate-y-[45%]"
        />
      </div>
    </div>
  );
}

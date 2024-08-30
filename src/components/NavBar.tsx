"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const NavBar: React.FC = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <nav className="bg-slate-900 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href={userId ? "/garantia" : "/"}>
            
            <Image src={"/Logo.png"} alt="" width={300} height={50} className="flex w-fit h-fit" />

          </Link>
        </div>
        <div>
          {userId ? (
            <UserButton />
          ) : (
            <Button
              variant="default"
              onClick={() => router.push("/garantia")}
              className="bg-slate-800 text-white hover:bg-slate-700"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

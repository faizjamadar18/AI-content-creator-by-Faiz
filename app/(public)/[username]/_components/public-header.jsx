import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const gradientText =
  "bg-gradient-to-r from-[#FAD961] via-[#F76B1C] to-[#845EF3] bg-clip-text text-transparent"

const PublicHeader = ({ link, title }) => {
  return (
    <header className="border-b border-slate-800 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={link}>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {title}
          </Button>
        </Link>
        <Link href={"/"} className='flex items-center gap-3 flex-shrink-0 mt-4'>
          <span className={`block sm:text-2xl text-lg font-black pb-4 sm:pb-1 ${gradientText}`}>
            Faizbook.ai
          </span>
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
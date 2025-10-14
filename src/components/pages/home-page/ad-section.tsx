import { Button } from "@/components/ui/button";
import React from "react";

export default function AdSection(){
  return (
    <section className="flex items-center justify-center gap-2.5 p-2.5 bg-[#ffa500]">
      <div className="flex w-full items-end max-w-[450px] justify-between">
        <h2 className="font-extrabold text-black text-2xl tracking-[0] leading-9 whitespace-nowrap">
          ƯU ĐÃI TẶNG BẠN MỚI
        </h2>

        <Button className="h-10 px-[19px] py-0 bg-[#191919] rounded-[5px] hover:bg-[#191919]/90">
          <span className=" font-medium text-[#ffffff] text-base tracking-[0] leading-6 whitespace-nowrap">
            Học ngay
          </span>
        </Button>
      </div>
    </section>
  );
}
import React from 'react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import {useTranslations} from 'next-intl';

const SearchSection = () => {
  const categories = ["Toán học", "Vật lý", "Hóa học", "Sinh học", "Ngữ văn"];
  const t = useTranslations('HomePage');
  return (
    <div className='py-10'>
      <h1 className='text-primary font-bold text-3xl text-center mb-5'>{t('title')}</h1>
      <div className='flex w-full h-[60px] items-center justify-between pl-6 pr-0 py-0 relative bg-white rounded-[15px] overflow-hidden border border-solid border-[#c1c1c1]'>
        <Input type="email" className='h-full w-full border-none my-3' placeholder="Search" />

        <div className='flex items-center justify-between relative'>
          <div className='flex items-center relative'>
            <div className='flex items-center gap-2 relative'>
              <Menu className='w-6 h-6' />
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1 focus:outline-none'>
                  <span className='font-normal text-base-content text-sm'>categories</span>
                  <ChevronDown className='w-2.5 h-2.5' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category, index) => (
                    <DropdownMenuItem key={index}>{category}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className='flex items-center relative'>
            <div className='flex items-center px-2.5 py-0 relative'>
              <Button className='w-[100px] h-[44px]'>
                <SearchIcon className='w-10 h-10' />
                <span className=''>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSection;
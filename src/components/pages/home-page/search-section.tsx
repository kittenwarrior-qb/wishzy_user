import React from 'react'
import { Input } from "@/components/ui/input"
import {useTranslations} from 'next-intl';
const SearchSection = () => {
  const t = useTranslations('HomePage');
  return (
    <div className='pt-4'>
      <h1 className='text-center'>{t('title')}</h1>
      <Input type="email" placeholder="Search" />

    </div>
  )
}

export default SearchSection
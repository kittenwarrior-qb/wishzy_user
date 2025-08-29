import { genPageMetadata } from '@/app/seo'
import {useTranslations} from 'next-intl';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  return genPageMetadata(locale, 'AboutPage')
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <div>
      <p>title: {`${t("title")}`}</p>
      <p>description: {`${t("description")}`}</p>
    </div>
  )
}

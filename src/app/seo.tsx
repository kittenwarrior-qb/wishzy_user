import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getTranslations } from 'next-intl/server'

interface PageSEOProps {
  title?: string
  description?: string
  images?: string[]
  keywords?: string[]
  [key: string]: any
}

export async function genPageMetadata(
  locale: string,
  pageKey: string,
  props: PageSEOProps = {}
): Promise<Metadata> {
  const t = await getTranslations({ locale })

  const title = props.title || t(`${pageKey}.title`)
  const description = props.description || t(`${pageKey}.description`)
  const images = props.images?.length
    ? props.images
    : [siteMetadata.socialBanner]

  return {
    title,
    description,
    keywords: props.keywords || [t(`${pageKey}.title`), 'Wishzy'],
    openGraph: {
      title,
      description,
      url: siteMetadata.siteUrl,
      siteName: t(`${pageKey}.title`),
      images: images.map((img) => ({ url: img })), 
      locale,
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [images[0]],
    },
    ...props,
  }
}

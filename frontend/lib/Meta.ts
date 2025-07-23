// import type { Metadata } from 'next'
// import useWindowLocation from '@hooks/useWindowLocation'

// type Props = {
//   title: string
//   description: string
//   previewImage?: string
//   keywords?: string
//   suffix?: string
// }

// export async function generateMetadata(): Promise<Metadata> {
//   const { currentURL } = useWindowLocation()

//   const pageTitle = suffix ? `${title} - ${suffix}` : title
//   const pageDescription = description ? description : "Mark Santiago's Portfolio Web Application"

//   const pagePreviewImage = previewImage ? previewImage : '/images/numan.png'

//   const defaultKeywords = [
//     'Numan',
//     'Mark Santiago',
//     'numanibnmazid',
//     'nmn',
//     'marksantiago0929',
//     'mark-santiago.vercel.app',
//     'numan blog',
//     'blog application',
//     'portfolio application',
//     'portfolio template',
//     'programming blog',
//     'web development blog',
//     'web development',
//     'web development portfolio',
//     'web development portfolio template',
//     'portfolio application',
//     'portfolio website',
//     'portfolio website template',
//     'Noman',
//     'Noman Ibne Mojid',
//     'Noman Blog',
//     'Numan Ibne Mojid',
//     'Noman Ibne Mazid',
//     'Numan Ibne Mazid',
//     'Numan Ibn Majid',
//     'Mazid Blog',
//     'Mazid Portfolio',
//   ]
//   const keywordArray = keywords ? keywords.split(',').map((keyword) => keyword.trim()) : []
//   const keywordList = defaultKeywords.concat(keywordArray.filter((keyword) => !defaultKeywords.includes(keyword)))

//   return {
//     // Main
//     title: pageTitle,
//     description: pageDescription,
//     keywords: keywordList,
//     // Icons
//     icons: {
//       icon: '/favicon.ico',
//       shortcut: '/favicon-dark.ico',
//       apple: '/icons/icon-192x192.png',
//     },
//     // Others
//     generator: 'Next.js',
//     applicationName: 'marksantiago0929',
//     authors: [{ name: 'Mark Santiago', url: 'https://www.linkedin.com/in/mark-santiago-147926367/' }],
//     referrer: 'origin-when-cross-origin',
//     viewport: {
//       width: 'device-width',
//       initialScale: 1,
//       maximumScale: 1,
//     },
//     themeColor: 'black',
//     manifest: '/manifest.json',
//     robots: {
//       index: true,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         noimageindex: false,
//         'max-video-preview': -1,
//         'max-image-preview': 'large',
//         'max-snippet': -1,
//       },
//     },
//     // Open Graph
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//       url: currentURL,
//       siteName: 'marksantiago0929',
//       authors: ['Mark Santiago'],
//       images: [
//         {
//           url: pagePreviewImage,
//           alt: pageTitle ? pageTitle : 'mark-santiago.vercel.app || Mark Santiago',
//           // width: 800,
//           // height: 600,
//         },
//       ],
//     },
//     // Twitter
//     twitter: {
//       card: 'summary_large_image',
//       title: pageTitle,
//       description: pageDescription,
//       creator: '@NumanIbnMazid',
//       images: [
//         {
//           url: pagePreviewImage,
//           alt: pageTitle ? pageTitle : 'mark-santiago.vercel.app || Mark Santiago',
//           // width: 800,
//           // height: 600,
//         },
//       ],
//     },
//   }
// }

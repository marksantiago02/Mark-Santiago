import Image from 'next/image'
import ShareOnSocialMedia from '../components/ShareOnSocialMedia'
import { FiPrinter } from 'react-icons/fi'
import useWindowLocation from '@hooks/useWindowLocation'
import ScrollProgressBar from '@components/ScrollProgressBar'
import { useState, useEffect } from 'react'
import { opacityVariant, popUp } from '@content/FramerMotionVariants'
import AnimatedDiv from '@components/FramerMotion/AnimatedDiv'
import { getFormattedDate } from '@utils/date'
import { DevToArticleType, ProfileType } from '@lib/types'
import Prism from '../prismSetup'
import { motion } from 'framer-motion'
import { AiFillEye, AiFillLike } from 'react-icons/ai'
import useWindowSize from '@hooks/useWindowSize'

export default function BlogLayout({
  blog,
  profileInfo
}: {
  blog: DevToArticleType
  profileInfo: ProfileType
}) {


  const { currentURL } = useWindowLocation()
  // const hasCode = blog && blog.content.includes('<code>')
  const size = useWindowSize()
  const [blogInfoFull, setBlogInfoFull] = useState(false)

  function adjustContentForPrint() {
    // Table of Contents
    const tocComponent = document.querySelector('.hide-on-print')
    // Hide the TOC
    tocComponent!.classList.add('hide-on-print')

    // Store the original classes of the author section
    const authorSection = document.querySelector('.author')
    const authorOriginalClasses: string = authorSection !== null ? authorSection.classList.value : ''
    // Remove all classes of the author section
    authorSection?.setAttribute('class', '')

    const style = document.createElement('style')
    style.textContent = `
    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        overflow: visible !important;
        white-space: pre-wrap;
      }
    }
  `
    document.head.appendChild(style)

    // Find all code and pre elements that need adjustments
    const codeElements = document.querySelectorAll('code[class*="language-"]')
    const preElements = document.querySelectorAll('pre[class*="language-"]')

    // Apply the CSS class for printing adjustments
    codeElements.forEach((codeElement) => {
      codeElement.classList.add('print-adjusted')
    })

    preElements.forEach((preElement) => {
      preElement.classList.add('print-adjusted')
    })

    // Call the print function
    window.print()

    // Show the TOC
    tocComponent!.classList.remove('hide-on-print')

    // Set back the original classes of auther section
    authorSection?.setAttribute('class', authorOriginalClasses)

    // Remove the CSS class and clean up the added style tag
    codeElements.forEach((codeElement) => {
      codeElement.classList.remove('print-adjusted')
    })

    preElements.forEach((preElement) => {
      preElement.classList.remove('print-adjusted')
    })

    document.head.removeChild(style)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
    if (size.width > 1600) {
      setBlogInfoFull(true)
    } else {
      setBlogInfoFull(false)
    }
  }, [size])


  return (
    <section className="mt-[44px] md:mt-[60px] relative !overflow-hidden">
      {/* Blog Content */}
      <section
        className="p-5 sm:pt-10 relative font-barlow prose dark:prose-invert mx-auto print:!mx-auto bg-darkWhitePrimary dark:bg-darkPrimary"
        style={{
          maxWidth: '900px',
          opacity: "1",
        }}
      >
        <ScrollProgressBar />
        {/* Blog Cover Image */}
        <div className="flex items-center justify-center mb-4">
          <Image
            alt={blog.title}
            width={1000}
            height={1000}
            quality={50}
            style={{ width: 'auto', height: 'auto' }}
            src={blog.cover_image}
            className="rounded-xl shadow filter !m-0"
          />
        </div>
        {/* Blog Title */}
        <h1 className="text-center text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white mt-10">
          {blog.title}
        </h1>

        <div className="!w-full text-gray-700 dark:text-gray-300">
          <div className="w-full">
            <div className={`${blogInfoFull ? 'fixed right-0 px-10 opacity-100 top-[50px] md:top-[80px] author' : ''}`}>
              {blog.user.name === 'Mark Santiago' && profileInfo.image !== null && (
                <motion.div
                  variants={popUp}
                  className="relative flex items-center justify-center p-3 rounded-full overflow-hidden w-44 h-44 xs:w-30 xs:h-30 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
                >
                  <Image
                    src={profileInfo.image}
                    className="rounded-full shadow filter"
                    width={933}
                    height={933}
                    alt="cover Profile Image"
                    quality={100}
                  />
                </motion.div>
              )}
              <div className="mt-2">
                <span className="text-base text-gray-500">Author: </span>
                <span className="font-bold text-base text-gray-600 dark:text-gray-400">{blog.user.name}</span>
              </div>

              <div className="mt-2 text-base text-gray-500">
                <span>Created at: </span>
                <span className="font-bold">{getFormattedDate(new Date(blog.published_at))}</span>
              </div>

              {blog.type_Of && (
                <div className="text-base text-gray-500 mb-2">
                  <span>Category: </span>
                  <span className="font-bold">{blog.type_Of}</span>
                </div>
              )}

              {blog.reading_time_minutes && (
                <div className="text-base text-gray-500">
                  <span>Reading Time: </span>
                  <span className="font-bold">{`${blog.reading_time_minutes} minutes read`}</span>
                </div>
              )}

              {/* Total Views and Likes */}
              <div className="flex flex-wrap items-center gap-4 w-fit print:hidden">
                <div className="flex flex-wrap items-center gap-2">
                  <AiFillEye className="w-4 h-4" />
                  <span className="text-base text-gray-500">{blog.comments_count}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <AiFillLike className="w-4 h-4" />
                  <span className="text-base text-gray-500">{blog.positive_reactions_count}</span>
                </div>
              </div>
            </div>

            {blog.description && (
              <div className="text-lg my-4" dangerouslySetInnerHTML={{ __html: blog.description || '' }}></div>
            )}

            {blog.tags && (
              <div className="flex flex-wrap items-center gap-1 hide-on-print">
                <span className="text-base text-gray-500">Tags: </span>
                {(blog.tags as unknown as string[]).map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-2 py-1 text-xs rounded bg-teal-800 text-gray-50"
                  >
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <AnimatedDiv
          variants={opacityVariant}
          className="my-16 max-w-full prose-sm blog-container sm:prose-base prose-pre:bg-white prose-img:mx-auto prose-img:rounded-md dark:prose-pre:bg-darkSecondary prose-pre:saturate-150 dark:prose-pre:saturate-100 marker:text-black dark:marker:text-white"
        >
          <div
            dangerouslySetInnerHTML={{ __html: cleanBlogHtml(blog.body_html, blog.title) || '' }}
          />
        </AnimatedDiv>

        {/* Social Media */}
        <div className="flex flex-col items-center w-full gap-4 my-10 print:hidden">
          <h3 style={{ margin: '0' }} className="text-xl font-semibold dark:text-white">
            Share
          </h3>
          <ShareOnSocialMedia
            className="flex flex-wrap items-center gap-2 w-fit"
            title={blog.title}
            url={currentURL}
            summary={blog.description || blog.title}
            cover_image={blog.cover_image}
          >
            <div className="p-2 text-white bg-gray-700 rounded-full cursor-pointer hover:bg-cyan-700">
              <FiPrinter className="w-4 h-4" onClick={() => adjustContentForPrint()} />
            </div>
          </ShareOnSocialMedia>
        </div>
      </section>
    </section>
  )
}

function cleanBlogHtml(html: string, title: string) {
  // Escape special characters in the title for regex
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Remove the title dynamically
  const withoutTitle = html.replace(new RegExp(`<p>${escapedTitle}</p>`), '');
  
  const cleanedHtml = withoutTitle
    .replace(/<div class="highlight__panel js-actions-panel">[\s\S]*?<\/div><\/div>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '');

  return cleanedHtml;
}



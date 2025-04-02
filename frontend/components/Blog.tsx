import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineComment, AiFillLike } from 'react-icons/ai'
import { getFormattedDate } from '@utils/date'
import { DevToArticleType } from '@lib/types'
import { BlogCardAnimation } from '@content/FramerMotionVariants'

export default function Blog({ blog, animate = false }: { blog: DevToArticleType; animate?: boolean }) {
  const readingTime = blog.reading_time_minutes

  return (
    <div>
      <Link href={`blogs/${blog?.slug}`} title="View Blog Details">
        <motion.article
          variants={BlogCardAnimation}
          initial={animate && 'hidden'}
          whileInView={animate ? 'visible' : ''}
          viewport={{ once: true }}
          className="bg-white dark:bg-darkSecondary hover:bg-darkWhite dark:hover:bg-darkFourth ring-1 dark:hover:ring-[#555] ring-gray-300 hover:ring-gray-400 dark:ring-[#444] rounded-2xl p-2 flex flex-col sm:flex-row items-center w-ull sm:w-[95%] mx-auto gap-2 md:gap-7 shadow-md md:shadow-lg"
        >
          <div className="">
            <Image
              title={blog.title}
              alt={blog.title}
              src={blog.cover_image}
              width={1200}
              height={600}
              quality={50}
              priority={false}
              className="my-auto transition-all duration-300 backdrop-blur-xl rounded-xl w-full"
            />
          </div>

          <div className="flex flex-col w-full h-full px-2 pb-2 mt-2 sm:mt-0 sm:p-1 lg:py-5 md:pr-5">
            <h2 className="font-bold text-neutral-900 md:text-xl dark:text-neutral-200">{blog.title}</h2>

            {blog.description && (
              <div
                className="mt-3 text-sm sm:text-xs md:text-sm text-gray-600 dark:text-[#b5b7ba] line-clamp-3 sm:line-clamp-2 md:line-clamp-4 mb-2"
                dangerouslySetInnerHTML={{ __html: blog.description || '' }}
              ></div>
            )}

            {blog.type_Of && (
              <div className="flex">
                <div className="px-2 py-1 text-xs font-bold rounded bg-sky-800 text-gray-50 mb-2 italic">
                  {blog.type_Of}
                </div>
              </div>
            )}

            {blog.tags && (
              <div className="flex flex-wrap items-center gap-1 mb-2">
                {blog.tags.split(',').map((tag, index) => {
                  return (
                    <span key={`${tag}-${index}`} className="px-2 py-1 text-xs rounded bg-teal-800 text-gray-50">
                      {tag.toLowerCase()}
                    </span>
                  )
                })}
              </div>
            )}

            <div className="flex items-center justify-between mt-auto">
              <div className="z-10 flex items-center gap-3 font-barlow">
                <div className="flex flex-col">
                  <div className="text-sm font-bold">{blog.user.name}</div>
                  <span className="text-xs">{getFormattedDate(new Date(blog.published_at))}</span>
                </div>
              </div>
              { readingTime && (
                <p className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-dark-3 md:text-sm">
                  <span className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-50">{`${readingTime} minutes read`}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 w-fit pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <AiOutlineComment className="w-4 h-4" />
                <span className="text-sm text-gray-500">{blog.comments_count}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <AiFillLike className="w-4 h-4" />
                <span className="text-sm text-gray-500">{blog.positive_reactions_count}</span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </div>
  )
}

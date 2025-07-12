import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeContainer, popUpFromBottomForText, searchBarSlideAnimation } from '@content/FramerMotionVariants'
import Metadata from '@components/MetaData'
import { RiCloseCircleLine } from 'react-icons/ri'
import AnimatedDiv from '@components/FramerMotion/AnimatedDiv'
import PageTop from '@components/PageTop'
import pageMeta from '@content/meta'
import { CgSearch } from 'react-icons/cg'
import Loader from '@components/Loader'
import NoData from '@components/NoData'
import dynamic from 'next/dynamic'
import { profileInfo } from '@utils/data/profileInfo'
import { DevToArticleType } from '@lib/types'

const Blog = dynamic(() => import('@components/Blog'), {
  loading: () => <Loader />,
})

export default function Blogs() {
  const [mounted, setMounted] = useState(false);
  const [blogsData, setBlogsData] = useState<DevToArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState<DevToArticleType[]>([]);
  const searchRef = useRef<HTMLInputElement>(null!);

  // Fetch blogs data
  useEffect(() => {
    setMounted(true);

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${profileInfo.devUsername}`);
        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        const sortedData = Array.isArray(data) ?
          data.sort((b, a) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
          : [];

        setBlogsData(sortedData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filteredPosts = blogsData.filter(post =>
      post.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    setFilteredBlogs(filteredPosts);
  }, [searchValue, blogsData]);

  useEffect(() => {
    const handleAutoSearch = (e: KeyboardEvent) => {
      if (e.code === 'Slash' && e.ctrlKey) {
        searchRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleAutoSearch);
    return () => document.removeEventListener('keydown', handleAutoSearch);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Metadata
        title={pageMeta.blogs.title}
        description={pageMeta.blogs.description}
        previewImage={pageMeta.blogs.image}
        keywords={pageMeta.blogs.keywords}
      />

      {isLoading ? (
        <Loader />
      ) : blogsData.length > 0 ? (
        <section className="pageTop flex flex-col gap-2 bg-darkWhitePrimary dark:bg-darkPrimary">
          <PageTop pageTitle="Blogs">
            Welcome to my blog page! Here, you will find a collection of insightful and informative articles that I
            have written on various topics. As a passionate writer and avid learner, I believe in the power of sharing
            knowledge and experiences through the written word. Till now, I've written {blogsData.length} articles.
          </PageTop>

          <AnimatedDiv
            className="relative group w-0 mx-auto text-slate-400 dark:text-gray-300 bg-white dark:bg-darkSecondary rounded-md"
            variants={searchBarSlideAnimation}
          >
            <CgSearch className="ml-3 w-5 h-5 absolute top-[50%] -translate-y-1/2 z-10" />
            <input
              ref={searchRef}
              className="px-12  py-3 w-full  outline-none transition duration-200 bg-transparent font-medium font-inter lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm hover:ring-slate-400  dark:highlight-white/5 dark:hover:bg-darkSecondary/90 mx-auto flex relative  group focus:ring-slate-400"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Press (CTRL + /) to search... "
            />
            <button
              type="button"
              onClick={() => setSearchValue('')}
              className="hidden group-focus-within:inline-flex right-3 absolute top-[50%] -translate-y-1/2"
            >
              <RiCloseCircleLine className="w-5 h-5 mr-3" />
            </button>
          </AnimatedDiv>

          <section className="relative py-5  flex flex-col gap-2 min-h-[50vh]">
            <AnimatePresence>
              {filteredBlogs.length != 0 ? (
                <>
                  <AnimatedDiv variants={FadeContainer} className="flex items-center justify-between">
                    <motion.h3
                      variants={popUpFromBottomForText}
                      className="text-left font-bold text-2xl sm:text-3xl my-5"
                    >
                      All Posts ({filteredBlogs.length})
                    </motion.h3>
                  </AnimatedDiv>

                  {/* Blog Section */}
                  <AnimatedDiv variants={FadeContainer} className="grid grid-cols-1 gap-4">
                    {filteredBlogs.map((blog, index) => {
                      return <Blog key={index} blog={blog} />
                    })}
                  </AnimatedDiv>
                </>
              ) : (
                <div className="font-inter text-center font-medium dark:text-gray-400">No Result Found</div>
              )}
            </AnimatePresence>
          </section>
        </section>
      ) : (
        <NoData />
      )}
    </>
  )
}

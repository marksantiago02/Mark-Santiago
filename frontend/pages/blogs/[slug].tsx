import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { DevToArticleType } from '@lib/types'
import Loader from "@components/Loader"
import NoData from "@components/NoData"
import MetaData from '@components/MetaData'
import pageMeta from '@content/meta'
import { profileInfo } from '@utils/data/profileInfo'

const BlogLayout = dynamic(() => import('@layout/BlogLayout'), {
  loading: () => <Loader />,
})

export default function BlogDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [blogData, setBlogData] = useState<DevToArticleType | null>(null);
  
  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
  
    // Fetch specific article using the slug
    fetch(`https://dev.to/api/articles/${profileInfo.devUsername}/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not so good');
        }
        return res.json();
      })
      .then(data => {
        setBlogData(data);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setBlogData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);
  
  if (!mounted) return null;
    
  function stripHtml(html: string) {
    const strippedText = html.replace(/<[^>]*>/g, '') // Removes all HTML tags
    return strippedText
  }

  const blogOverview = blogData?.description ? stripHtml(blogData.description) : undefined;

  return (
    <>
      <MetaData
        title={blogData?.title || pageMeta.blogs.title}
        description={blogOverview || pageMeta.blogs.description}
        previewImage={blogData?.cover_image || pageMeta.blogs.image}
        keywords={blogData?.tags || pageMeta.blogs.keywords}
      />

      {isLoading ? (
        <Loader />
      ) : blogData && profileInfo.devUsername ? (
        <BlogLayout blog={blogData} profileInfo={profileInfo}></BlogLayout>
      ) : (
        <NoData allowSpacing={true} />
      )}
    </>
  )
}

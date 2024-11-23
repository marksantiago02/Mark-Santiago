import { DevToArticleType } from '@lib/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from "@components/Loader"
import NoData from "@components/NoData"
import MetaData from '@components/MetaData'
import pageMeta from '@content/meta'
import dynamic from 'next/dynamic'
// import BlogsData from '@content/Blogs'
// import MyProfile from '@content/MyProfile'
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
  console.log("slug--->", slug)
  
  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
  
    // Fetch specific article using the slug
    fetch(`https://dev.to/api/articles/${profileInfo.devUsername}/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
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
  console.log("blogData------->", blogData);


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

// export async function getServerSideProps(context: any) {
//   const { slug } = context.params
//   const blogData: BlogType = await getBlogDetails('1', slug)
//   let blogData:BlogType = {
//     id: 0,
//     slug: '',
//     title: '',
//     image: '',
//     content: '',
//     author: '',
//     status: '',
//     order: 0,
//     total_views: 0,
//     total_likes: 0,
//     user_liked: false,
//     created_at: '',
//     updated_at: ''
//   };
//   const tmp = BlogsData.find((blog: BlogType) => blog.slug === slug)
//   if (tmp !== undefined) {
//     blogData = tmp; 
//   }
  
//   return {
//     props: {
//       slug,
//       blogData
//     }
//   }
// }

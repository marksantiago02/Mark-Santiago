import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { FadeContainer } from "@content/FramerMotionVariants"
import fetcher from "@lib/fetcher"
import MetaData from "@components/MetaData"
import StatsCard from "@components/Stats/StatsCard"
import pageMeta from "@content/meta"
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv"
import { HomeHeading } from '../pages'

type Stats = {
  title: string
  value: string
};

export default function Stats() {
  const [mounted, setMounted] = useState(false);
  const { data: github } = useSWR("/api/stats/github", fetcher)

  const stats: Stats[] = [
    {
      title: "Github Repos",
      value: github?.repos,
    },
    {
      title: "Github Followers",
      value: github?.followers,
    },
    {
      title: "Github Stars",
      value: github?.githubStars,
    },
    {
      title: "Repositories Forked",
      value: github?.forks,
    }
  ]

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="pageTop font-inter bg-darkWhitePrimary dark:bg-darkPrimary">
        <HomeHeading title="Statistics" />
      </section>
    );
  }

  return (
    <>
      <MetaData
        title={pageMeta.stats.title}
        description={pageMeta.stats.description}
        previewImage={pageMeta.stats.image}
        keywords={pageMeta.stats.keywords}
      />

      <section className="pageTop font-inter bg-darkWhitePrimary dark:bg-darkPrimary">
        <HomeHeading title="Statistics" />

        <p>Here are some statistics about my personal github.</p>

        <AnimatedDiv
          className="my-10"
          variants={FadeContainer}
        >
          <div className="grid xs:grid-cols-2 sm:!grid-cols-3 xl:!grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <StatsCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
        </AnimatedDiv>

        <div className="flex justify-center w-full my-2">
          <Link href="https://github.com/BTC415?tab=repositories">
            <img
              src="https://github-readme-stats-one-bice.vercel.app/api?username=BTC415&theme=gotham&show_icons=true&count_private=true&hide_border=true&role=OWNER,ORGANIZATION_MEMBER,COLLABORATOR"
              className="w-full p-2"
              alt="@BTC415's github-readme-stats"
              width={495}
              height={195}
            />
          </Link>

          <Link href="https://github.com/BTC415?tab=stars">
            <Image
              src="https://github-readme-streak-stats.herokuapp.com?user=BTC415&theme=gotham&hide_border=true&date_format=M%20j%5B%2C%20Y%5D"
              className="w-full p-2"
              alt="@BTC415's github-readme-streak-stats"
              width={495}
              height={195}
            />
          </Link>
        </div>
      </section>
    </>
  )
}

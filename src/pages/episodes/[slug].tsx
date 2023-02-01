import { PlayerContext } from '@/contexts/PlayerContext';
import GetEpisodesData from '@/services/parse-podcast-data';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

type Episode = {
  itunes_image: any;
  itunes_author: string;
  itunes_duration: string;
  enclosures: any;
  id: string;
  title: string;
  members: string;
  published: string;
  thumbnail: string;
  publishedAt: string;
  convertedDuration: string;
  duration: number;
  url: string;
  description: string;
  href: string;
  0: any;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  const { play } = useContext(PlayerContext);

  return (
    <div className="max-w-[45rem] px-8 py-12 mx-auto my-0">
      <Head>
        <title>{episode[0].title} | Podcastr</title>
      </Head>
      <div className="relative">
        <Link href="/">
          <button className="w-12 h-12 absolute z-[5] text-[0] transition-[filter] duration-[0.2s] rounded-xl border-0 hover:brightness-90 -translate-x-2/4 -translate-y-2/4 left-0 top-2/4 bg-rocketPurple-500">
            <img
              className="rounded-2xl mx-auto"
              src="/arrow-left.svg"
              alt="Go Back"
            />
          </button>
        </Link>
        <Image
          className="rounded-2xl h-96"
          width={700}
          height={160}
          src={episode[0].thumbnail}
          alt={episode[0].title}
          style={{ objectFit: 'cover' }}
        />
        <button
          onClick={() => play(episode[0])}
          className="w-12 h-12 absolute z-[5] text-[0] transition-[filter] duration-[0.2s] rounded-xl border-0 hover:brightness-90 translate-x-2/4 -translate-y-2/4 right-0 top-2/4 bg-rocketGreen-500"
        >
          <img className="rounded-2xl mx-auto" src="/play.svg" alt="Play" />
        </button>
      </div>
      <header className="border-b-rocketGray-100 pb-4 border-b border-solid">
        <h1 className="mt-8 mb-6">{episode[0].title}</h1>
        <span className="inline-block text-[0.876rem]">
          {episode[0].members}
        </span>
        <span className="inline-block text-[0.876rem] relative ml-4 pl-4 before:content-[''] before:w-1 before:h-1 before:absolute before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-sm before:left-0 before:top-2/4 before:bg-rocketGray-100">
          {episode[0].publishedAt}
        </span>
        <span className="inline-block text-[0.876rem] relative ml-4 pl-4 before:content-[''] before:w-1 before:h-1 before:absolute before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-sm before:left-0 before:top-2/4 before:bg-rocketGray-100">
          {episode[0].convertedDuration}
        </span>
      </header>
      <div
        className="mt-8 leading-[1.675rem] text-rocketGray-800 mx-0 my-6"
        dangerouslySetInnerHTML={{
          __html: episode[0].description,
        }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params!;

  const data = await GetEpisodesData();

  const episode = data
    .filter(
      (episode: Episode) =>
        episode.title.replace(/[^\w]/g, '').toLowerCase() == slug,
    )
    .map((episode: Episode) => {
      return {
        title: episode.title,
        thumbnail: episode.itunes_image?.href ?? '/cover.png',
        members: episode.itunes_author,
        description: episode.description,
        publishedAt: dayjs(episode.published)
          .locale('pt-br')
          .format('DD MMM YY'),
        duration: episode?.itunes_duration ?? '00:00:00',
        convertedDuration: episode?.itunes_duration ?? '00:00:00',
        url: episode.enclosures[0].url,
      };
    });

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 8, // 2 hours
  };
};

/* eslint-disable @next/next/no-img-element */
import { PlayerContext } from '@/contexts/PlayerContext';
import GetEpisodesData from '@/services/parse-podcast-data';
import { convertTitleToId } from '@/utils/convertTitleToId';
import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
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
};

type HomeProps = {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = useContext(PlayerContext);

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className="h-[calc(100vh_-_8rem)] overflow-y-scroll px-16 py-0 ">
      <Head>
        <title>Home | À Deriva</title>
      </Head>

      <section className="items-center text-center">
        <h2 className="mt-12 mb-6 font-bold font-sans">⚠️ Atenção ⚠️</h2>
        <p>
          Este projeto foi feito com fins educacionais, apoie o À Deriva
          assinando a{' '}
          <a
            className="font-semibold hover:text-rocketGray-500"
            href="https://www.sacocheio.tv"
            target="_blank"
            rel="noreferrer"
          >
            Saco Cheio TV.
          </a>
        </p>
      </section>

      <section className="latest episodes">
        <h2 className="mt-12 mb-6 font-bold font-sans">Últimas entrevistas</h2>

        <ul className="grid grid-cols-[repeat(2,1fr)] gap-6">
          {latestEpisodes.map((episode, index) => {
            return (
              <li
                className="border border-rocketGray-100 relative flex items-center p-5 rounded-3xl border-solid"
                key={episode.id}
              >
                <Image
                  className="w-24 h-24 rounded-2xl"
                  src={episode.thumbnail}
                  alt={episode.title}
                  width={192}
                  height={192}
                  style={{ objectFit: 'cover' }}
                />

                <div className="flex-1 ml-4 ">
                  <Link
                    className="block text-rocketGray-800 font-heading font-semibold no-underline leading-snug hover:underline"
                    href={`/episodes/${episode.id}`}
                  >
                    {episode.title}
                  </Link>
                  <p className="text-sm mt-2 max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {episode.description}
                  </p>
                  <span className="inline-block mt-2 text-sm">
                    {episode.publishedAt}
                  </span>
                  <span className="inline-block mt-2 text-sm  ml-2 pl-2 relative before:content-[''] before:w-1 before:h-1 before:rounded-sm before:bg-[#ddd] before:absolute before:left-0 before:top-2/4 before:-translate-x-1/2 before:-translate-y-1/2">
                    {episode.convertedDuration}
                  </span>
                </div>

                <button
                  type="button"
                  className="absolute w-10 h-10 border border-[color:var(--gray-100)] text-[0] transition-[filter] duration-[0.2s] rounded-[0.675rem] border-solid right-8 bottom-8 hover:brightness-95"
                >
                  <img
                    className="w-8 h-8 mx-auto hover:brightness-95"
                    src="/play-green.svg"
                    alt="Play"
                    onClick={() => playList(episodeList, index)}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="allEpisodes">
        <h2 className="mt-12 mb-6 font-bold font-sans">Todas as entrevistas</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Convidado</th>
              <th>Host</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td className="text-center">{episode.convertedDuration}</td>
                <td>
                  <button type="button">
                    <img
                      className="mx-auto"
                      src="/play-green.svg"
                      alt="Play"
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await GetEpisodesData();

  const episodes = data.map((episode: Episode) => {
    return {
      id: convertTitleToId(episode.title),
      title: episode.title,
      thumbnail: episode.itunes_image?.href ?? '/cover.png',
      members: episode.itunes_author,
      description: episode.description,
      publishedAt: dayjs(episode.published).locale('pt-br').format('DD MMM YY'),
      duration: episode?.itunes_duration ?? '00:00:00',
      convertedDuration: episode?.itunes_duration ?? '00:00:00',
      url: episode.enclosures[0].url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};

import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../services/api';

type Episode = {
  file: any;
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  publishedAt: string;
  convertedDuration: string;
};

type HomeProps = {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className="h-[calc(100vh_-_6.5rem)] overflow-y-scroll px-16 py-0">
      <section className="latest episodes">
        <h2 className="mt-12 mb-6 font-bold font-sans">Latest episodes</h2>

        <ul className="grid grid-cols-[repeat(2,1fr)] gap-6">
          {latestEpisodes.map((episode: Episode) => {
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
                    {episode.members}
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
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="allEpisodes">
        <h2 className="mt-12 mb-6 font-bold font-sans">All episodes</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode) => (
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
                <td>{episode.convertedDuration}</td>
                <td>
                  <button type="button">
                    <img className="mx-auto" src="/play-green.svg" alt="Play" />
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
  const { data } = await api('episodes', {
    params: {
      _limit: 12,
    },
  });

  const episodes = data.map((episode: Episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: '21 jan 20',
      duration: Number(episode.file.duration),
      convertedDuration: convertDurationToTimeString(
        Number(episode.file.duration),
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
  };
};

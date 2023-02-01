import { parse } from 'rss-to-json';

export default async function GetEpisodesData() {
  try {
    const feedURL = 'https://www.arthurpetry.com/deriva/feed.xml';
    const data = await parse(feedURL);
    return data.items;
  } catch (e: any) {
    return e.message;
  }
}

import dayjs from 'dayjs';
import Image from 'next/image';

export default function Header() {
  const currentDate = dayjs().format('ddd, DD MMM');

  return (
    <header className="background-color: bg-white h-24 flex items-center py-8 px-16 border-solid border-b border-b-gray-100 p:margin">
      <Image src="./logo.svg" alt="Logo" width="163" height="40" />

      <p className="ml-8 border-l border-solid border-gray-100 pt-1 pl-8 pr-8 ">
        O melhor para você ouvir, sempre
      </p>

      <span className="ml-auto capitalize">{currentDate}</span>
    </header>
  );
}

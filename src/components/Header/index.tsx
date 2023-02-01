import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Image from 'next/image';

export default function Header() {
  const currentDate = dayjs().locale('pt-br').format('ddd, DD MMM');

  return (
    <header className="background-color: bg-white h-24 flex items-center py-8 px-16 border-solid border-b border-b-gray-100 p:margin">
      <Image src="/logo.svg" alt="Logo" width="163" height="40" />

      <p className="ml-8 border-l border-solid border-gray-100 pt-1 pl-8 pr-8 "></p>

      <span className="ml-auto capitalize">{currentDate}</span>
    </header>
  );
}

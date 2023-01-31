import Image from 'next/image';
import Buttons from './buttons';
import styles from './styles.module.scss';

export default function Player() {
  return (
    <div className="py-12 px-16 w-[26.5rem] h-screen bg-rocketPurple-500 text-rocketGray-50 flex flex-col items-center justify-between">
      <header className="flex items-center gap-4">
        <Image src="/playing.svg" alt="Playing now" width={32} height={32} />
        <strong className="font-semibold font-heading">Playing now</strong>
      </header>

      <div className="w-full h-80 p-16 text-center flex items-center justify-center rounded-3xl border border-dashed border-rocketPurple-300 bg-rocketPurple-400">
        <strong className="font-semibold">Select something to play.</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <Buttons />
      </footer>
    </div>
  );
}

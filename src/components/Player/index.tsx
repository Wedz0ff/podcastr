import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { PlayerContext } from '@/contexts/PlayerContext';
import { convertDurationToSeconds } from '@/utils/convertDurationToSeconds';
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString';
import styles from './styles.module.scss';

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function progressListener() {
    if (audioRef.current != null) {
      audioRef.current.currentTime = 0;

      audioRef.current?.addEventListener('timeupdate', () => {
        setProgress(Math.floor(audioRef!.current!.currentTime));
      });
    }
  }

  function moveBar(amount: any) {
    audioRef!.current!.currentTime = amount;
    setProgress(amount);
  }

  function handleEndedEpisode() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing now" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt={episode.title}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)} </span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={convertDurationToSeconds(episode.duration)}
                value={progress}
                onChange={moveBar}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#78757d' }}
                handleStyle={{ borderBlockColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{episode?.duration ?? '00:00:00'}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            loop={isLooping}
            onLoadedMetadata={progressListener}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEndedEpisode}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Shuffle" />
          </button>
          <button
            type="button"
            onClick={playPrevious}
            disabled={!episode || !hasPrevious}
          >
            <img src="/play-previous.svg" alt="Play previous" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pause" />
            ) : (
              <img src="/play.svg" alt="Play" />
            )}
          </button>
          <button
            type="button"
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <img src="/play-next.svg" alt="Play next" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
}

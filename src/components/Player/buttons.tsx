export default function Buttons() {
  return (
    <div className="flex items-center justify-center mt-10 rounded-2xl">
      <button type="button">
        <img src="/shuffle.svg" alt="Shuffle" />
      </button>

      <button type="button">
        <img src="/play-previous.svg" alt="Play previous" />
      </button>

      <button type="button">
        <img
          className="w-16 h-16 rounded-2xl bg-rocketPurple-400"
          src="/play.svg"
          alt="Play"
        />
      </button>

      <button type="button">
        <img src="/play-next.svg" alt="Play" />
      </button>

      <button type="button">
        <img src="/repeat.svg" alt="Repeat" />
      </button>
    </div>
  );
}

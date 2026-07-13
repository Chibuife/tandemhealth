/**
 * Demo waveform.
 *
 * Heights are a hardcoded constant array, not computed at render time.
 * Any per-render computation -- Math.random(), Date.now(), even a "seeded"
 * function -- risks diverging between the server render and the client
 * hydration render (different JS engine, different call order, stale
 * bundle cache, etc). A literal array removes the possibility entirely:
 * server and client read the exact same values because there's no
 * calculation to disagree on.
 *
 * Swap this for real audio-level data in production (e.g. driven by
 * useState + a WebAudio analyser, updated client-side after mount).
 */
const BAR_HEIGHTS = [
  23, 7, 13, 12, 25, 24, 29, 8, 17, 7, 12, 19, 7, 11, 23, 20, 12, 21, 27, 6, 27, 24, 15, 10, 31,
  15, 8, 9, 28, 22, 27, 25, 20, 31, 16, 20, 28, 22, 28, 21, 24, 7, 12, 14, 8, 12, 9, 13, 23, 15,
  16, 11, 13, 30, 23, 22, 10, 25, 10, 16, 32, 23, 20, 24,
];

export function AudioWaveform() {
  return (
    <div className="flex h-10 items-center overflow-hidden">
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="mx-[2px] w-[3px] shrink-0 rounded-sm bg-lime-dark"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default AudioWaveform;
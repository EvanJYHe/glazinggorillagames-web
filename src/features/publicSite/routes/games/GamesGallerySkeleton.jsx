export const GAMES_GALLERY_GRID_CLASS =
  "grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:gap-3.5 max-[480px]:gap-2.5";

const SKELETON_COUNT = 12;

export default function GamesGallerySkeleton() {
  return (
    <div className={GAMES_GALLERY_GRID_CLASS}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index}>
          <div className="aspect-square animate-pulse rounded-ggg-md bg-white/[0.06]" />
          <div className="mt-3 h-3 w-2/3 animate-pulse rounded-full bg-white/[0.08]" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

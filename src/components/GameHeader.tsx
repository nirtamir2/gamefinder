export function GameHeader(props: { name: string; rating: number }) {
  const { name, rating } = props;
  const formattedRating = Math.round(rating * 20);

  return (
    <div>
      <span className="inline pb-4 pr-4 text-xl font-semibold text-white">
        {name}
      </span>
      <span className="inline rounded-md bg-green-500 px-2.5 py-1 align-text-top text-sm font-bold text-black">
        {formattedRating}
      </span>
    </div>
  );
}

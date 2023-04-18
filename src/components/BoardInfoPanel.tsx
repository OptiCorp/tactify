import { champions } from '~/champions';

export function BoardInfoPanel(props: { tileMapValue: any | undefined }) {
  const traitCount: Record<string, number> = {};
  const countedChampion: Record<string, boolean> = {};

  for (const tile of Object.values(props.tileMapValue)) {
    if (tile) {
      const champion = champions.find((champ) => champ.name === tile);
      /* console.table(champion); */
      for (const trait of champion?.traits || []) {
        if (traitCount[trait]) {
          /* if (!countedChampion) { */
          traitCount[trait]++;
          /* countedChampion[tile] = true; */
          /* } */
        } else {
          traitCount[trait] = 1;
          /* countedChampion[tile] = true; */
        }
      }
    }
  }

  const sortedTraitsByCount = Object.entries(traitCount)
    .map(([trait, count]) => ({ trait, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="ml-4 h-20  w-full overflow-y-scroll  p-2 md:h-72  md:w-24 md:min-w-[165px]">
      {/* {Object.entries(traitCount)
        .sort((a: number, b: number) => a - b)
        .map(([trait, count]) => (
          <div key={trait} className="flex gap-1">
            <p>{count}</p>
            <p>{trait}</p>
          </div>
        ))} */}
      {sortedTraitsByCount.map(({ trait, count }, idx) => (
        <div
          key={idx}
          className="mb-2 flex items-center gap-1 border bg-orange-300 p-2 text-xs"
        >
          <img
            className="h-4 w-4 invert"
            src={`traits/${trait.replace(/[\s:]/g, '')}.png`}
          />

          <span className="bg-orange-400 p-1">{count}</span>
          <span>{trait}</span>
        </div>
      ))}
    </div>
  );
}

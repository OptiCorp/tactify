import { CharacterType } from '../types';

function BoardInfoPanelApi({
  characterData,
  tileMapValue,
}: {
  tileMapValue: object;
  characterData: CharacterType[];
}) {
  const uniqueSpecies: Record<string, Set<string>> = {};

  for (const tile of Object.values(tileMapValue)) {
    if (tile) {
      const character = characterData.find((char) => char.image === tile);
      if (character) {
        const { species, image } = character;
        if (!uniqueSpecies[species]) {
          uniqueSpecies[species] = new Set();
        }
        uniqueSpecies[species]?.add(image);
      }
    }
  }

  const sortedSpeciesByCount = Object.entries(uniqueSpecies)
    .map(([species, characters]) => ({ species, count: characters.size }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className=" h-20 w-44 overflow-y-auto  p-2 md:h-72  md:w-24 md:min-w-[165px]">
      {sortedSpeciesByCount.length !== 0 ? (
        sortedSpeciesByCount?.map(({ species, count }, idx) => (
          <div
            key={idx}
            className=" mb-2 flex items-center gap-1  border border-amber-500 bg-orange-300 bg-opacity-20 p-2 text-xs font-bold text-amber-500"
          >
            <span>{count}</span>
            <span className="w-[120px] truncate capitalize">{species}</span>
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-center text-xs  text-amber-500">
          <p>Place characters on the board to see synergies</p>
        </div>
      )}
    </div>
  );
}

export default BoardInfoPanelApi;

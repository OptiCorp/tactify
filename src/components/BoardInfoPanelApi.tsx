import { CharacterType } from '../types';

function BoardInfoPanelApi({
  characterData,
  tileMapValue,
}: {
  tileMapValue: object;
  characterData: CharacterType[];
}) {
  const speciesCount: Record<string, number> = {};

  //! Bug: duplicate characters on the board increments trait count
  for (const tile of Object.values(tileMapValue)) {
    if (tile) {
      const characters = characterData.find(
        (character) => character.image === tile
      );
      if (characters) {
        const { species } = characters;
        if (speciesCount[species]) {
          speciesCount[species]++;
        } else {
          speciesCount[species] = 1;
        }
      }
    }
  }

  const sortedSpeciesByCount = Object.entries(speciesCount)
    .map(([species, count]) => ({ species, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="z-50 h-20 w-44 overflow-y-auto  p-2 md:h-72  md:w-24 md:min-w-[165px]">
      {sortedSpeciesByCount?.map(({ species, count }, idx) => (
        <div
          key={idx}
          className="z-50 mb-2 flex items-center gap-1  border border-amber-500 bg-orange-300 bg-opacity-20 p-2 text-xs font-bold text-amber-500"
        >
          <span>{count}</span>
          <span className="w-[120px] truncate">{species}</span>
        </div>
      ))}
    </div>
  );
}

export default BoardInfoPanelApi;

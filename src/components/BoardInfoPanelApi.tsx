import { SetStateAction, useState } from 'react';
import { CharacterType } from '../types';
import Portal from './Portal';

type SpecieBonusTypes = {
  [key: string]: {
    stat: string;
    amount: number;
    threshold: number;
  };
};
type SpecieType = {
  species: string;
  image: string;
};

function BoardInfoPanelApi({
  characterData,
  tileMapValue,
}: {
  tileMapValue: object;
  characterData: CharacterType[];
}) {
  const [hoveredSpecie, setHoveredSpecie] =
    useState<SetStateAction<null | string>>('');
  const uniqueSpecies: Record<
    string,
    { count: number; characters: Set<string> }
  > = {};

  for (const tile of Object.values(tileMapValue)) {
    if (tile) {
      const character = characterData.find((char) => char.image === tile);
      if (character) {
        const { species, image }: SpecieType = character;
        if (!uniqueSpecies[species]) {
          uniqueSpecies[species] = { count: 0, characters: new Set() };
        }
        if (!uniqueSpecies[species]?.characters.has(image)) {
          if (uniqueSpecies[species] != undefined) {
            uniqueSpecies[species].count += 1;
          }
          uniqueSpecies[species]?.characters.add(image);
        }
      }
    }
  }

  const sortedSpeciesByCount = Object.entries(uniqueSpecies)
    .map(([species, { count, characters }]) => ({ species, count, characters }))
    .sort((a, b) => b.count - a.count);
  const specieBonus: SpecieBonusTypes = {
    Human: { stat: 'HP', amount: 100, threshold: 3 },
    Humanoid: { stat: 'HP', amount: 100, threshold: 2 },
    Alien: { stat: 'Attack Speed', amount: 20, threshold: 2 },
    unknown: { stat: 'Armor', amount: 50, threshold: 1 },
    Animal: { stat: 'Movement Speed', amount: 10, threshold: 2 },
    Robot: { stat: 'Intellect', amount: 5, threshold: 1 },
    'Mythological Creature': {
      stat: 'Magic',
      amount: 10,
      threshold: 1,
    },
  };

  return (
    <div className=" h-20 w-44 overflow-y-auto  p-2 md:h-72  md:w-24 md:min-w-[165px]">
      {sortedSpeciesByCount.length !== 0 ? (
        sortedSpeciesByCount?.map(({ species, count }, idx) => {
          const bonus = specieBonus[species];
          const bonusAmount = bonus.amount;
          console.log(specieBonus[species]);
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredSpecie(species)}
              onMouseLeave={() => setHoveredSpecie(null)}
              className="mb-2 flex items-center gap-1  border border-amber-500 bg-orange-300 bg-opacity-20 p-2 text-xs font-bold text-amber-500"
            >
              <img src={`${species}.png`} />
              <span>{count}</span>
              <span className="w-[120px] truncate capitalize">{species}</span>
              <Portal>
                {hoveredSpecie === species && (
                  <div className="hidden max-w-[250px] border  border-amber-500 bg-[#22272e] p-2 text-white md:block">
                    <div className="mb-4">
                      <span className="capitalize">{species}</span>
                    </div>
                    <div className={`flex flex-col`}>
                      <p className="capitalize">
                        {species} gives additional {bonus.stat}
                      </p>
                      <div
                        className={`ml-2 mt-2 flex items-center ${
                          bonus.threshold <= count
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        <p
                          className={`border p-2 ${
                            bonus.threshold <= count
                              ? 'border-white'
                              : 'border-gray-400'
                          }`}
                        >
                          {bonus.threshold}
                        </p>
                        <p className="ml-2 text-xs">
                          +{bonusAmount} {bonus.stat}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Portal>
            </div>
          );
        })
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center text-xs  text-amber-500">
          <p className="shadow-amber-700 text-shadow-sm">
            Place characters on the board to see synergies
          </p>
          <img className="h-10 w-10 opacity-60 invert" src="synergy.png" />
        </div>
      )}
    </div>
  );
}

export default BoardInfoPanelApi;

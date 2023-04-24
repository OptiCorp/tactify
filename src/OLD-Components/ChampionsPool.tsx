import { Dispatch, SetStateAction, useState } from 'react';
import { champions } from '~/champions';
import ChampionInfoCard from './ChampionInfoCard';
import { TChampion } from '~/types';
/* import { useFloating, useHover, useInteractions } from '@floating-ui/react'; */
import DeleteIcon from '@mui/icons-material/Delete';
import Portal from './Portal';

export type SelectedType = 'cost' | 'search' | 'name';

function ChampionsPool(props: {
  selectedChampion: string;
  setSelectedChampion: Dispatch<SetStateAction<string>>;
  tileMapValue: object;
  setTileMapValue: Dispatch<
    SetStateAction<{
      a1: null;
      a2: null;
      a3: null;
      a4: null;
      a5: null;
      a6: null;
      a7: null;
      b1: null;
      b2: null;
      b3: null;
      b4: null;
      b5: null;
      b6: null;
      b7: null;
      c1: null;
      c2: null;
      c3: null;
      c4: null;
      c5: null;
      c6: null;
      c7: null;
      d1: null;
      d2: null;
      d3: null;
      d4: null;
      d5: null;
      d6: null;
      d7: null;
    }> //TODO change this
  >;
}) {
  const [hoveredChamp, setHoveredChamp] = useState<TChampion | undefined>();
  const [selectedSorting, setSelectedSorting] = useState<SelectedType>('cost');
  const [search, setSearch] = useState('');

  const uniqueCosts = [
    ...new Set(champions.map((champion) => champion.cost)),
  ].sort();

  function clearBoard() {
    props.setTileMapValue({
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      a5: null,
      a6: null,
      a7: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      b6: null,
      b7: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      c7: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
      d5: null,
      d6: null,
      d7: null,
    });
  }
  function handleHovering(champion: TChampion) {
    setHoveredChamp(champion);
  }

  function handleNotHovering() {
    setHoveredChamp(undefined);
  }

  function handleSortByName() {
    setSelectedSorting('name');
  }

  function handleSortByCost() {
    setSelectedSorting('cost');
  }

  const sortedByName = [...champions].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const sortedByCost = [...champions].sort((a, b) => a.cost - b.cost);
  const sortedBySearch = [...champions].filter((champ) =>
    champ.name.toLowerCase().includes(search.toLowerCase())
  );
  let sortedChampions = champions;

  if (selectedSorting === 'name') {
    sortedChampions = sortedByName;
  } else if (selectedSorting === 'cost') {
    sortedChampions = sortedByCost;
  } else if (selectedSorting === 'search') {
    sortedChampions = sortedBySearch;
  }

  return (
    <div className="w-[375px] md:min-w-[750px]">
      <div className="flex  border-2 md:mb-10">
        <div className="w-full">
          <div className="relative z-10 flex justify-between border-b-2 p-2 md:justify-normal">
            <div className="mr-2 flex">
              <form
                onSubmit={(e) => e.preventDefault()}
                className={`flex items-center`}
              >
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedSorting('search');
                      if (e.target.value.trim().length > 0) {
                        setSelectedSorting('search');
                      }
                      /* setSelectedSorting("cost") */
                    }}
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search by Name"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="mb-4 mt-2">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex gap-2">
                  <input
                    id="cost"
                    type={'radio'}
                    name="sorting"
                    value={`cost`}
                    checked={selectedSorting === 'cost'}
                    onChange={() => handleSortByCost()}
                  />
                  <label className="flex" htmlFor="cost">
                    Cost
                  </label>
                </div>
                <div>
                  <input
                    id="name"
                    type={'radio'}
                    value={`name`}
                    checked={selectedSorting === 'name'}
                    name="sorting"
                    onChange={() => handleSortByName()}
                  />
                  <label className="ml-2" htmlFor="name">
                    A-Z
                  </label>
                </div>

                <button
                  disabled={Object.values(props.tileMapValue).every(
                    (value) => value === null
                  )}
                  className="ml-2 hidden rounded text-blue-500 disabled:cursor-not-allowed disabled:text-gray-700  md:block"
                  onClick={clearBoard}
                >
                  <div className="flex">
                    <DeleteIcon />
                  </div>
                </button>

                <div className="absolute right-0 mr-4 hidden gap-2 md:flex">
                  {uniqueCosts.map((cost) => (
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-4 ${
                        cost === 1
                          ? 'border-gray-500'
                          : cost === 2
                          ? 'border-green-500'
                          : cost === 3
                          ? 'border-blue-500'
                          : cost === 4
                          ? 'border-purple-500'
                          : cost === 5
                          ? 'border-orange-500'
                          : ''
                      }`}
                    >
                      <div className="flex text-xs">{cost}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid h-48 grid-cols-5 gap-5 overflow-y-auto p-4 md:h-72 md:grid-cols-12">
            {sortedChampions.map((champ) => {
              return (
                <div className="relative">
                  <div
                    className="flex cursor-pointer flex-col items-center"
                    style={{
                      fontWeight:
                        props.selectedChampion === champ.name
                          ? 'bold'
                          : 'normal',
                    }}
                    onClick={() => props.setSelectedChampion(champ.name)}
                  >
                    <div className="z-50  hidden md:block">
                      {hoveredChamp === champ && (
                        <div>
                          <Portal>
                            <ChampionInfoCard
                              championCost={champ.cost}
                              championName={champ.name}
                              championTraits={champ.traits}
                            />
                          </Portal>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center  text-xs">
                      <div
                        className={`rounded-full border-4 ${
                          champ.cost === 1
                            ? 'border-gray-500'
                            : champ.cost === 2
                            ? 'border-green-500'
                            : champ.cost === 3
                            ? 'border-blue-500'
                            : champ.cost === 4
                            ? 'border-purple-500'
                            : champ.cost === 5
                            ? 'border-orange-500'
                            : ''
                        }`}
                        style={{ padding: '1px' }}
                      >
                        <img
                          style={{
                            opacity:
                              props.selectedChampion === champ.name
                                ? '.20'
                                : '100',
                          }}
                          onMouseOver={() => {
                            handleHovering(champ);
                          }}
                          onMouseOut={handleNotHovering}
                          className={`h-8 w-8 rounded-full`}
                          src={champ.img}
                        />
                      </div>
                      <div className="max-w-[50px] truncate  text-center tracking-wide">
                        {/* show full text on hover, add this to div: hover:max-w-none hover:overflow-visible hover:whitespace-normal */}
                        {champ.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex flex-col gap-1 border-l-2 border-t-2 p-2 md:hidden">
            {uniqueCosts.map((cost) => (
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-4 ${
                  cost === 1
                    ? 'border-gray-500'
                    : cost === 2
                    ? 'border-green-500'
                    : cost === 3
                    ? 'border-blue-500'
                    : cost === 4
                    ? 'border-purple-500'
                    : cost === 5
                    ? 'border-orange-500'
                    : ''
                }`}
              >
                <div className="flex text-xs">{cost}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChampionsPool;

import { Dispatch, SetStateAction, useState } from 'react';
import { champions } from '~/champions';
import ChampionInfoCard from './ChampionInfoCard';
import { TChampion } from '~/types';

type SelectedType = 'cost' | 'search' | 'name';

function ChampionsPool(props: {
  selectedChampion: string;
  setSelectedChampion: Dispatch<SetStateAction<string>>;
}) {
  const [hoveredChamp, setHoveredChamp] = useState<TChampion | undefined>();
  const [selectedSorting, setSelectedSorting] = useState<SelectedType>('cost');
  const [search, setSearch] = useState('');

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
    <div className="min-w-full p-2 md:mb-10">
      <div className="relative z-10 flex border-2 p-2">
        <div className="mr-2">
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
          <div className="flex gap-2">
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
            <div className="absolute right-0 mr-4 hidden gap-2 md:flex">
              <div>
                <label className="text-gray-500" htmlFor="">
                  ●
                </label>
                <span>: 1 cost</span>
              </div>
              <div>
                <label className="text-green-500" htmlFor="">
                  ●
                </label>
                <span>: 2 cost</span>
              </div>
              <div>
                <label className="text-blue-500" htmlFor="">
                  ●
                </label>
                <span>: 3 cost</span>
              </div>
              <div>
                <label className="text-purple-500" htmlFor="">
                  ●
                </label>
                <span>: 4 cost</span>
              </div>
              <div>
                <label className="text-orange-500" htmlFor="">
                  ●
                </label>
                <span>: 5 cost</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid h-48 grid-cols-5 gap-5 overflow-y-auto p-4 md:h-72 md:grid-cols-12">
        {sortedChampions.map((champ) => {
          return (
            <div className="relative">
              <div
                className="flex cursor-pointer flex-col items-center "
                style={{
                  fontWeight:
                    props.selectedChampion === champ.name ? 'bold' : 'normal',
                }}
                onClick={() => props.setSelectedChampion(champ.name)}
              >
                <div className="absolute -top-40 hidden md:block">
                  {hoveredChamp === champ && (
                    <ChampionInfoCard
                      championCost={champ.cost}
                      championName={champ.name}
                      championTraits={champ.traits}
                    />
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
                          props.selectedChampion === champ.name ? '.20' : '100',
                      }}
                      onMouseOver={() => handleHovering(champ)}
                      onMouseOut={handleNotHovering}
                      className={`h-10 w-10 rounded-full`}
                      src={champ.img}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: '70px',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      textAlign: 'center',
                      letterSpacing: '0.025rem',
                    }}
                  >
                    {champ.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChampionsPool;

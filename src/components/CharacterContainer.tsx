import { Dispatch, useEffect, useState } from 'react';

import { getData } from 'api';
import { CharacterType, Cost, Props, SelectedType } from '../types';
import TilesMapForApi from './TilesMapForApi';
import Searchbar from './Searchbar';
import CharacterPool from './CharacterPool';
import Portal from './Portal';
import CharacterInfoCard from './CharacterInfoCard';
import Button from './Button';
import CharacterCost from './CharacterCost';

const URL = 'https://rickandmortyapi.com/api/character?species=';
const imageUrl =
  'https://cdnb.artstation.com/p/assets/images/images/013/464/345/large/aodhan-mc-nicholl-rick-morty-style-background-001-copy.jpg?1539713189';

function getCost(value: string): Cost {
  switch (value) {
    case 'Human':
      return Cost.Human;
    case 'Alien':
      return Cost.Alien;
    case 'unknown':
      return Cost.unknown;
    case 'Animal':
      return Cost.Animal;
    case 'Robot':
      return Cost.Robot;
    case 'Mythological Creature':
      return Cost.Mythological;
    default:
      return Cost.Human;
  }
}
// Make a dynamic board?
/* const obj = {};
function createObject(numKeys: number, numValues: number) {
  for (let i = 0; i < numKeys; i++) {
    obj[`a${i}`] = null;
  }
  return obj;
}
createObject(28, 28); */

function CharacterContainer() {
  const [characterData, setCharacterData] = useState<CharacterType[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<SelectedType>('cost');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Props>([]);
  const [hoveredCharacter, setHoveredCharacter] = useState<null | string>(null);
  const [tileMapValue, setTileMapValue] = useState({
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

  function handleSortByName() {
    setSelectedSorting('name');
  }

  function handleSortByCost() {
    setSelectedSorting('cost');
  }

  function clearBoard() {
    setTileMapValue({
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

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const speciesData = [
          'Human',
          'Alien',
          'unknown',
          'Animal',
          'Robot',
          'Mythological',
        ];
        const promises = speciesData.map((specie) =>
          getData(`${URL}${specie}`)
        );
        const results = await Promise.all(promises);

        const returnedData = results.flatMap((data) => data.results);
        const characters: CharacterType[] = returnedData.map(
          ({ name, image, species, gender, id, origin }) => {
            return {
              name,
              image,
              species,
              origin,
              cost: getCost(species),
              gender,
              id,
            };
          }
        );
        setCharacterData(characters);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  const sortedByName = [...characterData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedByCost = [...characterData].sort((a, b) => a.cost - b.cost);

  const SortedBySearch = [...characterData].filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );
  let sortedCharacters = characterData;
  if (selectedSorting === 'cost') {
    sortedCharacters = sortedByCost;
  } else if (selectedSorting === 'name') {
    sortedCharacters = sortedByName;
  } else if (selectedSorting === 'search') {
    sortedCharacters = SortedBySearch;
  }

  const isDisabled = Object.values(tileMapValue).every((val) => val === null);
  return (
    <div className="flex flex-col items-center justify-center md:mt-10">
      <div
        className="flex gap-4 backdrop-blur-md"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <TilesMapForApi
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setTileMapValue={setTileMapValue}
          tileMapValue={tileMapValue}
          characterData={characterData}
        />
      </div>
      <Portal>
        {hoveredCharacter && (
          <CharacterInfoCard
            characterData={characterData}
            hoveredCharacter={hoveredCharacter}
          />
        )}
      </Portal>
      <div className="mt-8">
        <div className="relative flex border">
          <div className="w-48 p-2">
            <Searchbar
              search={search}
              setSearch={setSearch}
              setSelectedSorting={setSelectedSorting}
            />
          </div>
          <div className="ml-2 flex flex-col items-center gap-2 md:flex-row">
            <div className="flex gap-2">
              <input
                type="radio"
                id="cost"
                name="sorting"
                value={`cost`}
                onChange={() => handleSortByCost()}
              />
              <label htmlFor="cost">Cost</label>
            </div>
            <div className="flex gap-2">
              <input
                id="name"
                type="radio"
                value={'name'}
                checked={selectedSorting === 'name'}
                name="sorting"
                onChange={() => handleSortByName()}
              />
              <label htmlFor="name">A-Z</label>
            </div>
          </div>
          <div className="flex items-center">
            {/* <button
              className={`absolute right-4 top-[10%] hidden rounded-sm border border-amber-500 bg-orange-300 bg-opacity-40 px-4 py-2 text-amber-500 hover:bg-opacity-20  md:block ${
                isDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isDisabled}
              onClick={() => clearBoard()}
            >
              Clear Board
            </button> */}
            <div className="ml-4">
              <CharacterCost characterData={characterData} />
            </div>

            {/* <Button
              className="hidden md:block"
              isDisabled={isDisabled}
              clearBoard={clearBoard}
            /> */}
          </div>
        </div>
        <div>
          {loading ? (
            <div>loading</div>
          ) : (
            <CharacterPool
              onSelectImage={(path: string) => setSelectedImage(path)}
              sortedCharacters={sortedCharacters}
              selectedImage={selectedImage}
              setHoveredCharacter={setHoveredCharacter}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterContainer;

import { useEffect, useState } from 'react';

import { getData } from 'api';
import { CharacterType, Cost, Props, SelectedType } from '../types';
import TilesMapForApi from './TilesMapForApi';
import Searchbar from './Searchbar';
import CharacterPool from './CharacterPool';
import Portal from './Portal';
import CharacterInfoCard from './CharacterInfoCard';
import Button from './Button';
import CharacterCost from './CharacterCost';
import { BarLoader } from 'react-spinners';
import SavedTilesMap from './SavedTilesMap';

const URL = 'https://rickandmortyapi.com/api/character?species=';
const imageUrl =
  'https://cdn.leonardo.ai/users/31ab532b-b9ee-497b-9f7d-674e61cedab3/generations/7e2acbd6-9830-43c0-8a5e-859b1aeb9ce6/Leonardo_Diffusion_A_dark_in_the_ocean_no_lighting_rick_and_mo_1.jpg';

const costCasesMap = {
  human: Cost.Human,
  Alien: Cost.Alien,
  unknown: Cost.unknown,
  Animal: Cost.Animal,
  Robot: Cost.Robot,
  Mythological_Creature: Cost.Mythological,
};
// TODO: Implement this?
/* function getCost(value: string): Cost {
  const cost = costCasesMap[value];

  return cost;
} */

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
  const [sortedCharacters, setSortedCharacters] = useState<CharacterType[]>([]);
  const [sortingType, setSortingType] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [hoveredCharacter, setHoveredCharacter] = useState<null | string>(null);
  const [saveBoard, setSaveBoard] = useState();
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
  const isEmpty = Object.values(tileMapValue).every((val) => val === null);

  const SortedBySearch = [...characterData].filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSort() {
    setSortingType(!sortingType);
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

  function handleSaveBoard() {
    if (!isEmpty) {
      setSaveBoard([{ ...tileMapValue }]);
      console.log(saveBoard);
    }
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

    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    setSortedCharacters(SortedBySearch);
  }, [search, characterData]);

  return (
    <div className="ml-2 mr-2 mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {/* <button
          disabled={isEmpty}
          className={`mb-5 rounded-sm border border-amber-500 bg-orange-300 bg-opacity-40 px-4 py-2 text-amber-500 hover:bg-opacity-20 ${
            isEmpty && 'cursor-not-allowed opacity-50'
          }`}
          onClick={handleSaveBoard}
        >
          Save Board
        </button> */}

        <div
          className="flex gap-4"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
        <Button className="" isDisabled={isEmpty} clearBoard={clearBoard} />
      </div>
      <Portal>
        {hoveredCharacter && (
          <CharacterInfoCard
            characterData={characterData}
            hoveredCharacter={hoveredCharacter}
          />
        )}
      </Portal>
      <div className="mt-2">
        <div className="relative flex gap-1 border border-b-0 border-amber-500 bg-[#22272e] p-2 text-sm text-white md:gap-4">
          <div className="">
            <Searchbar search={search} setSearch={setSearch} />
          </div>
          <div
            onClick={handleSort}
            className="flex cursor-pointer select-none items-center text-xs"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-l-md border  hover:border-amber-400 ${
                sortingType && 'border-r-2 border-amber-500'
              }`}
            >
              <img src="coin.svg" />
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-r-md border  hover:border-amber-400 ${
                !sortingType && 'border-l-2 border-amber-500'
              }`}
            >
              <span>A-Z</span>
            </div>
          </div>
          {/* <div className="flex flex-col items-center gap-2 md:ml-2 md:flex-row">
            <div className="flex gap-2">
              <input
                type="radio"
                id="cost"
                name="sorting"
                checked={sortingType}
                onChange={() => handleSort()}
              />
              <label htmlFor="cost">Cost</label>
            </div>
            <div className="flex gap-2">
              <input
                id="name"
                type="radio"
                checked={!sortingType}
                name="sorting"
                onChange={() => handleSort()}
                className="border-[#0A2342]"
              />
              <label htmlFor="name">A-Z</label>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
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
            <button
              className={`h-10 w-10 rounded-full border md:hidden ${
                isEmpty && 'opacity-20'
              }`}
              onClick={clearBoard}
              disabled={isEmpty}
            >
              X
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex min-h-[208px] min-w-[338px] flex-col items-center justify-center border border-t-0 border-amber-500 bg-[#22272e] md:min-w-[750px] lg:min-w-[978px]">
              <BarLoader color="#F59E0B" />
            </div>
          ) : (
            <CharacterPool
              sortingType={sortingType}
              onSelectImage={(path: string) => setSelectedImage(path)}
              sortedCharacters={sortedCharacters}
              selectedImage={selectedImage}
              setHoveredCharacter={setHoveredCharacter}
              setSortedCharacters={setSortedCharacters}
            />
          )}
          {/* <SavedTilesMap saveBoard={saveBoard} /> */}
        </div>
      </div>
    </div>
  );
}

export default CharacterContainer;

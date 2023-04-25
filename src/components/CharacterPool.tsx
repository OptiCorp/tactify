import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CharacterType } from '../types';

function CharacterPool({
  sortedCharacters,
  onSelectImage,
  selectedImage,
  sortingType,
  setSortedCharacters,
  setHoveredCharacter,
}: {
  sortedCharacters: CharacterType[];
  setSortedCharacters: Dispatch<SetStateAction<CharacterType[]>>;
  onSelectImage: (image: string) => void;
  selectedImage: string[];
  setHoveredCharacter: Dispatch<SetStateAction<null | string>>;
  sortingType: boolean;
}) {
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  const sortedByName = [...sortedCharacters].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedByCost = [...sortedCharacters].sort((a, b) => a.cost - b.cost);

  function handleCharacterHover(character: string) {
    setHoveredCharacter(character);
  }

  function handleCharacterLeave() {
    setHoveredCharacter(null);
  }

  useEffect(() => {
    if (!sortingType) {
      setSortedCharacters(sortedByName);
    } else {
      setSortedCharacters(sortedByCost);
    }
  }, [sortingType]);

  return (
    <div className="">
      <div className="grid max-h-52 min-h-[233px] min-w-[338px] grid-cols-4 gap-4 overflow-auto border border-t-0 border-amber-500 bg-[#22272e] p-4 text-white backdrop-blur-md md:min-h-[250px]  md:min-w-[750px] md:grid-cols-8  md:gap-4 lg:min-h-[250px] lg:min-w-[978px] lg:grid-cols-12">
        {sortedCharacters.map(({ name, image, cost }) => {
          const currentClickedImage =
            clickedCharacter === name && selectedImage.includes(image);

          return (
            <div key={name} className="max-h-[64px] max-w-[64px]">
              <div className="flex h-16 w-16 flex-col items-center">
                <div
                  className={`rounded-full border-4 ${
                    currentClickedImage && 'brightness-150'
                  } ${
                    cost === 1
                      ? 'border-gray-500'
                      : cost === 2
                      ? 'border-green-500'
                      : cost === 3
                      ? 'border-blue-500'
                      : cost === 4
                      ? 'border-purple-500'
                      : cost === 5
                      ? 'border-teal-500'
                      : cost === 6
                      ? 'border-orange-500'
                      : ''
                  } p-[2px] hover:cursor-pointer`}
                >
                  <img
                    onClick={() => {
                      onSelectImage(image);
                      setClickedCharacter(name);
                    }}
                    onMouseEnter={() => handleCharacterHover(name)}
                    onMouseLeave={handleCharacterLeave}
                    className={`h-8 w-8 rounded-full ${
                      currentClickedImage ? 'opacity-40' : ''
                    }`}
                    src={image}
                  />
                </div>
                <div className="max-w-[60px] truncate text-center  text-xs tracking-wide ">
                  <span
                    className={` overflow-hidden ${
                      currentClickedImage ? 'font-bold' : ''
                    }`}
                  >
                    {name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CharacterPool;

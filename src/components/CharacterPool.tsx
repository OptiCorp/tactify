import { Dispatch, SetStateAction, useState } from 'react';
import { CharacterType } from '../types';

function CharacterPool({
  sortedCharacters,
  onSelectImage,
  selectedImage,

  setHoveredCharacter,
}: {
  sortedCharacters: CharacterType[];
  onSelectImage: (image: string) => void;
  selectedImage: string;
  setHoveredCharacter: Dispatch<SetStateAction<null | string>>;
}) {
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  function handleCharacterHover(character: string) {
    setHoveredCharacter(character);
  }

  function handleCharacterLeave() {
    setHoveredCharacter(null);
  }
  return (
    <div>
      <div className="grid max-h-56 grid-cols-4 gap-4 overflow-auto border  p-4  md:max-h-96 md:grid-cols-12 md:gap-4">
        {sortedCharacters.map(({ name, image, cost }) => {
          const currentClickedImage =
            clickedCharacter === name && selectedImage.includes(image);

          return (
            <div key={name} className="max-w-[64px]">
              <div className="flex h-16 w-16 flex-col items-center">
                <div
                  className={`rounded-full border-4 ${
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

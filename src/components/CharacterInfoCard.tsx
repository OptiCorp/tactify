import { CharacterType } from '../types';

function CharacterInfoCard({
  characterData,
  hoveredCharacter,
}: {
  characterData: CharacterType[];
  hoveredCharacter: null | string;
}) {
  const characters: CharacterType | undefined = characterData.find(
    (character) => character.name === hoveredCharacter
  );

  return (
    <>
      {characters && (
        /* 'linear-gradient(to top left, transparent, black)', tried to add some gradient to make white text show better over bg-img
         */
        <div
          style={{
            backgroundImage: `url(${characters.image}) `,
            backgroundSize: 'cover',
            backgroundPosition: 'left calc(100% - 95%)',
            position: 'relative',
          }}
          className={`relative hidden h-36 w-72 flex-col overflow-hidden rounded-t border md:flex ${
            characters.cost === 1
              ? 'border-gray-500 shadow-gray-200'
              : characters.cost === 2
              ? 'border-green-500 shadow-green-200'
              : characters.cost === 3
              ? 'border-blue-500 shadow-blue-200'
              : characters.cost === 4
              ? 'border-purple-500 shadow-purple-200'
              : characters.cost === 5
              ? 'border-teal-500 shadow-teal-200'
              : characters.cost === 6
              ? 'border-orange-500 shadow-orange-200'
              : ''
          } bg-orange-300  text-white shadow-lg  drop-shadow-lg`}
        >
          <div className="absolute right-0 rounded-bl-sm bg-red-500 p-1 font-bold opacity-100  ">
            <span>{characters.id}</span>
          </div>

          <div
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            className="flex h-full flex-col font-bold"
          >
            <div className="flex h-fit flex-col p-2 text-sm text-neutral-900">
              <span>Gender: {characters.gender}</span>
              <span>Specie: {characters.species}</span>
              <span>Origin: {characters.origin.name}</span>
            </div>
            <div
              className="absolute bottom-0 w-full bg-amber-500 p-2"
              style={
                characters.cost === 1
                  ? { backgroundColor: 'rgba(107, 114, 128, .7)' }
                  : characters.cost === 2
                  ? { backgroundColor: 'rgba(34, 197, 94, .7)' }
                  : characters.cost === 3
                  ? { backgroundColor: 'rgba(59, 130, 246, .7)' }
                  : characters.cost === 4
                  ? { backgroundColor: 'rgba(168, 85, 247, .7)' }
                  : characters.cost === 5
                  ? { backgroundColor: 'rgba(20, 184, 166, .7)' }
                  : characters.cost === 6
                  ? { backgroundColor: 'rgba(249, 115, 22, .7)' }
                  : {}
              }
            >
              <span
                /* style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} */
                className="p-2 font-bold text-opacity-80"
              >
                {characters.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterInfoCard;

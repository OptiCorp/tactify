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
        <div
          style={{
            backgroundImage: `url(${characters.image})`,
            backgroundSize: 'cover',
          }}
          className="relative flex h-36 w-72 flex-col overflow-hidden rounded-t border bg-orange-300  text-white shadow-lg drop-shadow-lg"
        >
          <div className="absolute right-0 rounded-bl-sm bg-red-500 p-1 font-bold opacity-70 ">
            <span>{characters.id}</span>
          </div>

          <div
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            className="flex h-full flex-col font-bold"
          >
            <div className="flex flex-col p-2 text-sm text-neutral-900">
              <span>Gender: {characters.gender}</span>
              <span>Specie: {characters.species}</span>
              <span>Origin: {characters.origin.name}</span>
            </div>
            <div
              className="absolute bottom-0 w-full bg-amber-500 p-2"
              style={{ backgroundColor: 'rgba(255, 191, 0, 0.7)' }}
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

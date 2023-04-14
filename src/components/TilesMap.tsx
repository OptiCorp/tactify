import { useState } from 'react';
import ChampionsPool from './ChampionsPool';
import { champions } from '~/champions';
import { BoardInfoPanel } from './BoardInfoPanel';

function TilesMap() {
  const [tileMapValue, setTileMapValue] = useState<{
    a1: string | null;
    a2: string | null;
    a3: string | null;
    a4: string | null;
    a5: string | null;
    a6: string | null;
    a7: string | null;
    b1: string | null;
    b2: string | null;
    b3: string | null;
    b4: string | null;
    b5: string | null;
    b6: string | null;
    b7: string | null;
    c1: string | null;
    c2: string | null;
    c3: string | null;
    c4: string | null;
    c5: string | null;
    c6: string | null;
    c7: string | null;
    d1: string | null;
    d2: string | null;
    d3: string | null;
    d4: string | null;
    d5: string | null;
    d6: string | null;
    d7: string | null;
  }>({
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
  const [selectedChampion, setSelectedChampion] = useState('');
  function getTileValue(key: string) {
    if (selectedChampion) {
      setTileMapValue((prevState) => ({
        ...prevState,
        [key]: selectedChampion,
      }));
      setSelectedChampion('');
    }
  }

  function removeClickedTileImage(key: string) {
    setTileMapValue((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  }

  let championsOnTheBoard: string | null;

  return (
    <>
      <div className="mb-4 grid grid-cols-7 gap-4 p-4">
        {Object.entries(tileMapValue).map(([key, value]) => {
          const valueText = value + '';
          championsOnTheBoard = value;
          const traits: string[] | undefined = champions.find(
            (obj) => obj.name === championsOnTheBoard
          )?.traits;
          const displayImage = valueText.endsWith('.png');

          return (
            <div key={key} className="">
              {/* <div className="relative">
                                <BoardInfoPanel traits={traits} />
                            </div> */}

              <div
                onClick={() => {
                  getTileValue(key);
                }}
                className="relative flex h-10 w-10 items-center justify-center border-4 border-amber-500 bg-orange-300 md:h-20 md:w-20 "
              >
                {value ? (
                  <img
                    className="cursor-pointer"
                    onClick={(e) => {
                      if (e.currentTarget.tagName === 'IMG') {
                        removeClickedTileImage(key);
                      }
                    }}
                    src={`champions/${value.toString().replace(/\s/g, '')}.png`}
                  />
                ) : (
                  <></>
                )}
                <div className="absolute -left-3 -top-4  flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white md:h-10 md:w-10 md:text-base">
                  {key}
                </div>
                {/* {displayImage ? <img src={value} /> : <></>} */}{' '}
                {/* Don't remember why I added this.. */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2">
        <ChampionsPool
          selectedChampion={selectedChampion}
          setSelectedChampion={setSelectedChampion}
          setTileMapValue={setTileMapValue} //! fix
          tileMapValue={tileMapValue}
        />
      </div>
    </>
  );
}

export default TilesMap;

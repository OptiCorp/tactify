import { Dispatch, SetStateAction, useState } from 'react';

import { CharacterType, Props } from '../types';
import BoardInfoPanelApi from './BoardInfoPanelApi';

function TilesMapForApi({
  selectedImage,
  setSelectedImage,
  setTileMapValue,
  tileMapValue,
  characterData,
}: {
  selectedImage: Props;
  setSelectedImage: Dispatch<SetStateAction<string>>;
  setTileMapValue: Dispatch<SetStateAction<object>>;
  tileMapValue: object;
  characterData: CharacterType[];
}) {
  function getTileValue(key: string) {
    if (selectedImage) {
      setTileMapValue((prevState) => ({
        ...prevState,
        [key]: selectedImage,
      }));
      setSelectedImage('');
    }
  }

  function removeClickedTileImage(key: string) {
    setTileMapValue((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  }

  return (
    <>
      <div className="flex flex-col items-center md:flex-row">
        <div className="">
          <BoardInfoPanelApi
            tileMapValue={tileMapValue}
            characterData={characterData}
          />
        </div>
        <div className="grid w-[80%] grid-cols-7 gap-4 p-4">
          {Object.entries(tileMapValue).map(([key, value]) => {
            return (
              <div key={key} className="">
                <div
                  onClick={() => {
                    getTileValue(key);
                  }}
                  className="relative flex h-10 w-10 items-center justify-center border border-amber-500 bg-orange-300 bg-opacity-20  md:h-14 md:w-14 "
                >
                  {value ? (
                    <img
                      className="cursor-pointer"
                      onClick={(e) => {
                        if (e.currentTarget.tagName === 'IMG') {
                          removeClickedTileImage(key);
                        }
                      }}
                      src={value}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TilesMapForApi;

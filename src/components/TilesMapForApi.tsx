import { Dispatch, SetStateAction, useState } from 'react';

import { CharacterType, Props } from '../types';
import BoardInfoPanelApi from './BoardInfoPanelApi';
import TextType from './TextType';

function TilesMapForApi({
  selectedImage,
  setSelectedImage,
  setTileMapValue,
  tileMapValue,
  characterData,
  showText,
}: {
  selectedImage: string | undefined;
  setSelectedImage: Dispatch<SetStateAction<string | undefined>>;
  setTileMapValue: Dispatch<SetStateAction<object>>;
  tileMapValue: object;
  characterData: CharacterType[];
  showText: boolean;
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
      <div className="relative z-10 flex flex-col items-center border border-amber-500 md:flex-row">
        {/* <div className="z-0 hidden select-none opacity-50 md:block">
          {characterData.map(({ name, image }) => {
            if (name === 'Rick Sanchez') {
              return (
                <div key={name}>
                  <img
                    src={image}
                    alt={name}
                    className="absolute left-28  top-36 h-10 w-10  rounded-full border-2 border-blue-500"
                  />

                  <p className="absolute left-40 z-0 text-xl  text-white ">
                    : This isn't Game of Thrones, Morty!
                  </p>
                </div>
              );
            } else if (name === 'Morty Smith') {
              return (
                <div key={name}>
                  <img
                    src={image}
                    alt={name}
                    className="absolute left-28 top-48  h-10 w-10 rounded-full  border-2 border-blue-500"
                  />

                  <p className="absolute left-40 top-48 z-0 text-xl  text-white ">
                    : Aww, gee, you got me there, Rick.
                  </p>
                </div>
              );
            }
          })}
        </div> */}

        {showText && (
          <>
            <TextType />
          </>
        )}
        <div className="z-50">
          <BoardInfoPanelApi
            tileMapValue={tileMapValue}
            characterData={characterData}
          />
        </div>
        <div className="z-50 grid grid-cols-7 gap-4 p-4">
          {Object.entries(tileMapValue).map(([key, value]) => {
            return (
              <div key={key} className="">
                <div
                  onClick={() => {
                    getTileValue(key);
                  }}
                  className="relative flex h-10 w-10 items-center justify-center border border-amber-500 bg-orange-300 bg-opacity-20  md:h-14 md:w-14 md:hover:brightness-125"
                >
                  {value ? (
                    <img
                      className="cursor-pointer "
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

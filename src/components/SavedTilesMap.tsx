import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CharacterType, Props } from '../types';
import BoardInfoPanelApi from './BoardInfoPanelApi';
import TextType from './TextType';

function SavedTilesMap({ saveBoard }) {
  useEffect(() => {
    if (saveBoard) {
      const isEmpty = Object.values(saveBoard).every((val) => val === null);
      console.log(isEmpty);
      console.log('save board: ', saveBoard);
    }
  }, [saveBoard]);

  return (
    <>
      <div className="mt-20 flex flex-col text-center">
        <h1 className="text-5xl text-white">Saved Boards:</h1>
        <div className="relative z-10 mt-10 flex flex-col items-center border border-amber-500 md:flex-row">
          <div className="z-50">
            {/* <BoardInfoPanelApi
            tileMapValue={tileMapValue}
            characterData={characterData}
          /> */}
          </div>
          <div className="z-50 grid grid-cols-7 gap-4 p-4">
            {saveBoard && (
              <>
                {saveBoard.map(({ value }, key) => {
                  console.log('value: ', value);
                  return (
                    <div key={key} className="">
                      <div
                        onClick={() => {
                          /* getTileValue(key); */
                        }}
                        className="relative flex h-10 w-10 items-center justify-center border border-amber-500 bg-orange-300 bg-opacity-20  md:h-14 md:w-14 md:hover:brightness-125"
                      >
                        {value ? (
                          <img className="cursor-pointer " src={value} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedTilesMap;

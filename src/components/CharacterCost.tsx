import { useEffect, useRef, useState } from 'react';
import { CharacterType } from '../types';
import Portal from './Portal';

function CharacterCost({ characterData }: { characterData: CharacterType[] }) {
  const [openModal, setOpenModal] = useState(false);
  const uniqueCost = [...new Set(characterData.map(({ cost }) => cost))].sort();
  const modalRef = useRef(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.target !== modalRef.current) {
        setOpenModal(false);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={modalRef} className="flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal((prevState) => !prevState);
        }}
        className={`flex h-10 w-10 select-none items-center justify-center rounded-full border-4 border-purple-500 hover:scale-105 hover:bg-gray-300 ${
          openModal && 'bg-gray-300 '
        }`}
      >
        ?
      </button>
      {/* backgroundImage: `url(${characters.image}) ` */}
      {openModal && (
        <Portal>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded border-2 border-amber-500 bg-[#1f2937] text-white shadow-lg shadow-slate-950"
          >
            <div className="border-b-2 border-amber-500">
              <div className="flex gap-2 p-2">
                {uniqueCost.map((cost, idx) => (
                  <div
                    key={idx}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
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
                    }`}
                  >
                    {cost}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-2">
              <p>The costs are color coded.</p>
              <p>Gray color means 1 gold cost and so on!</p>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default CharacterCost;

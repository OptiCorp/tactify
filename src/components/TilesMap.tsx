import { MouseEventHandler } from "react"

function TilesMap() {
    const tileMapObject = {
        a1: 1,
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

    }
    function test() {
        
    }
    return (
        <>
            <div className="grid grid-cols-7 gap-4 mb-4" >
                {Object.entries(tileMapObject).map(([key, value], idx) => {
                    return (
                        <div key={key} className="">
                             <div className="relative w-20 h-20 bg-orange-300 border-amber-500 border-4 flex justify-center items-center">
                                {value ? value : null}
                                <div className="absolute -top-4 -left-3 bg-red-400 rounded-full w-10 h-10 items-center justify-center flex text-white">{key}</div>
                             </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TilesMap
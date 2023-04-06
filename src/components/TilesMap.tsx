import { useState } from "react"

function TilesMap() {
    const [tileMapValue, setTileMapValue] = useState({
        a1: "/champions/aatrox.png",
        a2: null,
        a3: "/champions/fiora.png",
        a4: "/champions/fiddlesticks.png",
        a5: "/champions/neeko.png",
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
        d1: "/champions/ashe.png",
        d2: null,
        d3: null,
        d4: null,
        d5: null,
        d6: null,
        d7: null,
    })
    
    console.log(tileMapValue.a4)
   
    return (
        <>
            <div className="grid grid-cols-7 gap-4 mb-4" >
                {Object.entries(tileMapValue).map(([key, value], idx) => {
                    let valueText = value + ""
                    if (valueText.endsWith("l")) {
                        console.log("ok")
                    }
                    let displayImage = valueText.endsWith(".png")
                    return (
                        <div key={key} className="">
                             <div className="relative w-20 h-20 bg-orange-300 border-amber-500 border-4 flex justify-center items-center">
                                
                                
                           
                                <div className="absolute -top-4 -left-3 bg-red-400 rounded-full w-10 h-10 items-center justify-center flex text-white">{key}</div>
                                {displayImage ? <img src={value} /> : <></>}
                             </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TilesMap
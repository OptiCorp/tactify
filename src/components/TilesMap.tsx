import { useState } from "react"
import ChampionsPool from "./ChampionsPool"
import { champions } from "~/champions"
import { BoardInfoPanel } from "./BoardInfoPanel"

const allChampions = champions
const championName = allChampions.map(champ => champ.name)


function TilesMap() {
    const [tileMapValue, setTileMapValue] = useState({
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
    })
    const [selectedChampion, setSelectedChampion] = useState("")
    function getTileValue(key: string) {
        
        if (selectedChampion) {
            setTileMapValue((prevState) => ({
                ...prevState,
                [key]: selectedChampion 
            }))
            setSelectedChampion("") 
        }
    }
        function clearBoard() {
            setTileMapValue({
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
            })
        
    }

    function removeClickedTileImage(key: string) {
        setTileMapValue((prevState => ({
            ...prevState,
            [key]: null
        })))
    }
    
    let championsOnTheBoard: string | null;
    
   
    return (
        <>
            <div className="grid grid-cols-7 gap-4 mb-4 p-4" >
                {Object.entries(tileMapValue).map(([key, value], idx) => {
                    let valueText = value + ""
                    championsOnTheBoard = value
                    const traits: string[] | undefined = champions.find(obj => obj.name === championsOnTheBoard)?.traits
                    let displayImage = valueText.endsWith(".png")
                   


                    return (
                        <div key={key} className="">
                            {/* <div className="relative">
                                <BoardInfoPanel traits={traits} />
                            </div> */}
                            
                             <div onClick={() =>{
                                getTileValue(key)
                             } } className="relative md:w-20 md:h-20 w-10 h-10 bg-orange-300 border-amber-500 border-4 flex justify-center items-center ">
                                
                                {value ? <img className="cursor-pointer" onClick={(e) => {
                                    if (e.currentTarget.tagName === "IMG") {
                                        removeClickedTileImage(key)
                                    }

                                }} src={`champions/${value.toString().replace(/\s/g, "")}.png`} /> : <></> }
                                
                                
                                <div className="absolute -top-4 -left-3  bg-red-400 text-xs md:text-base rounded-full md:w-10 md:h-10 w-5 h-5 items-center justify-center flex text-white">
                                    {key}
                                </div>
                                {/* {displayImage ? <img src={value} /> : <></>} */} {/* Don't remember why I added this.. */}
                                
                             </div>
                        </div>
                    )
                })}
            </div>
            
            <button disabled={Object.values(tileMapValue).every(value => value === null)}  className="bg-orange-400 hover:bg-orange-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-white rounded px-3 py-2 text-orange-900 mb-10" onClick={clearBoard}>Clear board</button>

            
            <ChampionsPool selectedChampion={selectedChampion} setSelectedChampion={setSelectedChampion} />
        </>
    )
}

export default TilesMap
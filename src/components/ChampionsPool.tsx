import { useState } from "react"
import { champions } from "~/champions"
import ChampionInfoCard from "./ChampionInfoCard"
import Searchbar from "./Searchbar"


function ChampionsPool(props) {
    const [hoveredChamp, setHoveredChamp] = useState(null)
    const [sortByName, setSortByName] = useState(false)
    const [sortByCost, setSortByCost] = useState(true)
    const [selected, setSelected] = useState("byCost")
    function handleHovering(champion) {
        setHoveredChamp(champion)
    }



    function handleNotHovering() {
        setHoveredChamp(null)
    }

    function handleSortByName() {
        setSortByCost(false)
        setSortByName(true)
        setSelected("byName")
    }

    function handleSortByCost() {
        setSortByCost(true)
        setSortByName(false)
        setSelected("byCost")
    }
    const sortedByName = [...champions].sort((a, b) => a.name > b.name ? 1 : -1)
    const sortedByCost = [...champions].sort((a, b) => a.cost - b.cost)

    return (
        <div className=" md:mb-10">
            <div className="flex p-2 border-2 relative z-10">
                <div className="mr-2 ">
                    <Searchbar  />
                </div>
                <div className="mb-4 mt-2">
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            <input id="cost" type={"radio"} name="sorting" value={`byCost`} checked={selected === "byCost"} onChange={() => handleSortByCost()} />
                                <label className="flex" htmlFor="cost">Cost</label>
                        </div>
                        <div>
                            <input id="name" type={"radio"} value={`byName`} checked={selected === "byName"} name="sorting" onChange={() => handleSortByName()} />
                            <label className="ml-2" htmlFor="name">A-Z</label>
                        </div>
                        <div className="hidden absolute right-0 md:flex gap-2 mr-4">
                            <div>
                                <label className="text-gray-500" htmlFor="">●</label>
                                <span>: 1 cost</span>
                            </div>
                            <div>
                                <label className="text-green-500" htmlFor="">●</label>
                                <span>: 2 cost</span>
                            </div>
                            <div>
                                <label className="text-blue-500" htmlFor="">●</label>
                                <span>: 3 cost</span>
                            </div>
                            <div>
                                <label className="text-purple-500" htmlFor="">●</label>
                                <span>: 4 cost</span>
                            </div>
                            <div>
                                <label className="text-orange-500" htmlFor="">●</label>
                                <span>: 5 cost</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        {sortByCost && 
            <div className="grid p-4 overflow-y-auto h-72 md:grid-cols-12 grid-cols-5 gap-5">
                {sortedByCost.map((champ) => {

                    return (
                        <div className="relative">                            
                            <div
                                className="flex cursor-pointer flex-col items-center "
                                style={{
                                    fontWeight: props.selectedChampion === champ.name ? "bold" : "normal"
                                }}
                                onClick={() => props.setSelectedChampion(champ.name)}
                                >
                                <div className="absolute -top-40">
                                    { hoveredChamp === champ && (
                                        <ChampionInfoCard  championCost={champ.cost} championName={champ.name} championTraits={champ.traits} />
                                    )}
                                </div>
                                <div className="flex items-center flex-col  text-xs">
                                    <div className={`rounded-full border-4 ${champ.cost === 1 ? "border-gray-500" : champ.cost === 2 ? "border-green-500" : champ.cost === 3 ? "border-blue-500" : champ.cost === 4 ? "border-purple-500" : champ.cost === 5 ? "border-orange-500" : ""}`} style={{padding: "1px"}}>
                                        <img onMouseOver={() => handleHovering(champ)} onMouseOut={handleNotHovering} className={`w-10 h-10 rounded-full`} src={champ.img} /> {/* regex to remove space in names */}
                                    </div>
                                        {/* {checkForSpace ? doubleName?.map(name => <div className="flex">{name}</div>) : champ.name}   */}
                                    {/* {champ.name}  */}
                                    <div style={{maxWidth: "70px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", textAlign: "center", letterSpacing: "0.025rem"}}>
                                            {/* {doubleName ? doubleName : champ.name} */}
                                            {champ.name}
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    )
                })}
            </div>

        }    
        {sortByName && 
            <div className="grid p-4 overflow-y-auto h-72 md:grid-cols-12 grid-cols-5 gap-5"> 
                {sortedByName.map((champ) => {
                    return (
                        <div className="relative">                            
                            <div
                                className="flex cursor-pointer flex-col items-center "
                                style={{
                                    fontWeight: props.selectedChampion === champ.name ? "bold" : "normal"
                                }}
                                onClick={() => props.setSelectedChampion(champ.name)}
                                >
                                <div className="absolute -top-40" style={{zIndex: 9999}}>
                                    { hoveredChamp === champ && (
                                        <ChampionInfoCard  championCost={champ.cost} championName={champ.name} championTraits={champ.traits} />
                                    )}
                                </div>
                                <div className="flex items-center flex-col  text-xs">
                                <div className={`rounded-full border-4 ${champ.cost === 1 ? "border-gray-500" : champ.cost === 2 ? "border-green-500" : champ.cost === 3 ? "border-blue-500" : champ.cost === 4 ? "border-purple-500" : champ.cost === 5 ? "border-orange-500" : ""}`} style={{padding: "1px"}}>
                                        <img onMouseOver={() => handleHovering(champ)} onMouseOut={handleNotHovering} className={`w-10 h-10 rounded-full`} src={champ.img} /> {/* regex to remove space in names */}
                                    </div>{/* regex to remove space in names */}
                                        {/* {checkForSpace ? doubleName?.map(name => <div className="flex">{name}</div>) : champ.name}   */}
                                    {/* {champ.name}  */}
                                    <div style={{maxWidth: "70px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", textAlign: "center", letterSpacing: "0.025rem"}}>
                                            {/* {doubleName ? doubleName : champ.name} */}
                                            {champ.name}
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    )
                })}
            </div>
        }                     
        </div>
    )
}

export default ChampionsPool
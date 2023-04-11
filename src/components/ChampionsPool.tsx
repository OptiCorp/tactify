import { useState } from "react"
import { champions } from "~/champions"
import ChampionInfoCard from "./ChampionInfoCard"
import Searchbar from "./Searchbar"

function ChampionsPool(props) {
    const championNames = Object.values(champions[0]).map(champion => champion)
    const [hoveredChamp, setHoveredChamp] = useState(null)
    function handleHovering(champion) {
        setHoveredChamp(champion)
    }

    function handleNotHovering() {
        setHoveredChamp(null)
    }
    return (
        <div className="border  md:mb-10">
                    <div className="p-5 pb-0">
                        <Searchbar  />
                    <div className="mb-4 mt-2">
                        <div className="flex  items-center mb-2">
                            <input id="casters" type={"radio"} />
                            <label className="ml-2" htmlFor="casters">Casters</label>
                        </div>
                        <div>
                            <input id="tanks" type={"radio"} />
                            <label className="ml-2" htmlFor="tanks">Tanks</label>
                        </div>
                    </div>
                    <div className="grid overflow-y-auto h-60 md:grid-cols-12 grid-cols-5 gap-5">
                
                {championNames.map((champ) => (
                        <div>
                            <div
                                key={champ.name}
                                className="flex cursor-pointer flex-col items-center text-ellipsis relative"
                                style={{
                                    fontWeight: props.selectedChampion === champ.name ? "bold" : "normal"
                                }}
                                onClick={() => props.setSelectedChampion(champ.name)}
                                >
                                <img onMouseOver={() => handleHovering(champ)} onMouseOut={handleNotHovering} className="w-10 h-10 rounded-full" src={champ.img} /> {/* regex to remove space in names */}
                                {champ.name}
                            </div>
                            <div className="absolute z-50 top-96">
                                { hoveredChamp === champ && (
                                    <ChampionInfoCard championCost={champ.cost} championName={champ.name} championTraits={champ.traits} />
                                )}
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            
            
    )
}

export default ChampionsPool
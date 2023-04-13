import { useState } from "react"
import { champions } from "~/champions"
import ChampionInfoCard from "./ChampionInfoCard"
import Searchbar from "./Searchbar"


function ChampionsPool(props) {
    const [hoveredChamp, setHoveredChamp] = useState(null)
    const [sortByName, setSortByName] = useState(false)
    const [sortByCost, setSortByCost] = useState(true)
    const [sortBySearch, setSortBySearch] = useState(false)
    const [searched, setSearched] = useState(false)
    const [selected, setSelected] = useState("byCost")
    const [search, setSearch] = useState("")



    function handleHovering(champion) {
        setHoveredChamp(champion)
    }

    function handleNotHovering() {
        setHoveredChamp(null)
    }

    function handleSortByName() {
        setSortByCost(false)
        setSortBySearch(false)
        setSortByName(true)
        setSelected("byName")
    }

    function handleSortByCost() {
        setSortByName(false)
        setSortBySearch(false)
        setSortByCost(true)
        setSelected("byCost")
    }
    
    



    const sortedByName = [...champions].sort((a, b) => a.name > b.name ? 1 : -1)
    const sortedByCost = [...champions].sort((a, b) => a.cost - b.cost)
    const sortedBySearch = search ? [...champions].filter((champ) => champ.name.toLowerCase().includes(search.toLowerCase())) : champions
    
    return (
        <div className="md:mb-10 min-w-full p-2">
            <div className="flex p-2 border-2 relative z-10">
                <div className="mr-2">
                    {/* <Searchbar search={search} setSearch={setSearch}  /> */}
                    <form onSubmit={e => e.preventDefault()} className={`flex items-center`}>   
                        <label  className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>
                            </div>
                            <input onChange={(e) => {
                                setSearch(e.target.value)
                                if (e.target.value.trim().length > 0) {
                                    setSortByCost(false)
                                    setSortByName(false)
                                    setSortBySearch(true)
                                } 
                                setSortByCost(true)
                              
                            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Name" required/>
                        </div>
                    </form>
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
        {sortByCost && !sortBySearch &&
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
                                        <img 
                                            style={{
                                                opacity: props.selectedChampion === champ.name ?  ".20" : "100"
                                            }} 
                                            onMouseOver={() => handleHovering(champ)}
                                            onMouseOut={handleNotHovering}
                                            className={`w-10 h-10 rounded-full`} src={champ.img} 
                                        /> 
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
        {sortByName && !sortBySearch &&
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
                                <div className="absolute -top-40">
                                    { hoveredChamp === champ && (
                                        <ChampionInfoCard  championCost={champ.cost} championName={champ.name} championTraits={champ.traits} />
                                    )}
                                </div>
                                <div className="flex items-center flex-col  text-xs">
                                    <div className={`rounded-full border-4 ${champ.cost === 1 ? "border-gray-500" : champ.cost === 2 ? "border-green-500" : champ.cost === 3 ? "border-blue-500" : champ.cost === 4 ? "border-purple-500" : champ.cost === 5 ? "border-orange-500" : ""}`} style={{padding: "1px"}}>
                                        <img 
                                            style={{
                                                opacity: props.selectedChampion === champ.name ?  ".20" : "100"
                                            }} 
                                            onMouseOver={() => handleHovering(champ)}
                                            onMouseOut={handleNotHovering}
                                            className={`w-10 h-10 rounded-full`} src={champ.img} 
                                        />
                                    </div>
                                        
                                    <div style={{maxWidth: "70px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", textAlign: "center", letterSpacing: "0.025rem"}}>
                                            {champ.name}
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    )
                })}
            </div>
        }

        {sortBySearch && 
            <div className="grid p-4 overflow-y-auto h-72 md:grid-cols-12 grid-cols-5 gap-5"> 
            {sortedBySearch.map((champ) => {
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
                                    <img 
                                        style={{
                                            opacity: props.selectedChampion === champ.name ?  ".20" : "100"
                                        }} 
                                        onMouseOver={() => handleHovering(champ)}
                                        onMouseOut={handleNotHovering}
                                        className={`w-10 h-10 rounded-full`} src={champ.img} 
                                    />
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
function ChampionInfoCard(props: {championName: string, championCost: number, championTraits: string[]}) {
    /* const traits = Object.values(championTraits).join(", ") */
    return (
                <div className="flex flex-col w-48 h-36 relative overflow-hidden bg-orange-300 border text-white rounded-t">
                    <div className="pl-2 pt-2 mb-0">
                        <div className="flex flex-col">
                            {props.championTraits.map(trait => (
                                <span>{trait}</span>
                                ))}
                        </div> 
                    </div>
                    <div className="absolute bottom-0 bg-red-400 w-48  h-10 text-white flex pl-2 items-center justify-between pr-2">
                        <span className="">{props.championName}</span>
                        <div className="flex gap-2">
                            <img className="fill-green-500" src="/coin.svg" />
                            <span>{props.championCost}</span>
                        </div>
                    </div>
                    {/* <img src={championImage} /> */}
                </div>
    )
}

export default ChampionInfoCard
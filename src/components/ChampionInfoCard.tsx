function ChampionInfoCard(props: {championName: string, championCost: number, championTraits: string[]}) {
    /* const traits = Object.values(championTraits).join(", ") */
    return (


                <div className="flex flex-col  border-orange-900 border-4 bg-orange-400 ">
                    <span>cost: 3</span>
                    <div className="flex flex-col">
                        {props.championTraits.map(trait => (
                            <span>{trait}</span>
                            ))}
                    </div>
                    <span className="bg-orange-600">{props.championName}</span>
                    {/* <img src={championImage} /> */}
                </div>
    )
}

export default ChampionInfoCard
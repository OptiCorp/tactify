function ChampionInfoCard(props: {
  championName: string;
  championCost: number;
  championTraits: string[];
}) {
  return (
    <div className="relative flex h-36 w-48 flex-col overflow-hidden rounded-t border bg-orange-300 text-white">
      <div className="mb-0 pl-2 pt-2">
        <div className="flex flex-col">
          {props.championTraits.map((trait) => (
            <span>{trait}</span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 flex h-10  w-48 items-center justify-between bg-red-400 pl-2 pr-2 text-white">
        <span className="">{props.championName}</span>
        <div className="flex gap-2">
          <img className="fill-green-500" src="/coin.svg" />
          <span>{props.championCost}</span>
        </div>
      </div>
      {/* <img src={championImage} /> */}
    </div>
  );
}

export default ChampionInfoCard;

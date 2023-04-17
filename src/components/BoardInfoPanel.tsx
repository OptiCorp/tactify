import { champions } from '~/champions';

export function BoardInfoPanel(props: { tileMapValue: any | undefined }) {
  const traitCount = {};
  for (const tile of Object.values(props.tileMapValue)) {
    /* console.log('tile', tile); */
    if (tile) {
      const champion = champions.find((champ) => champ.name === tile);
      for (const trait of champion?.traits) {
        if (traitCount[trait]) {
          traitCount[trait]++;
        } else {
          traitCount[trait] = 1;
        }
      }
    }
  }
  console.log(traitCount);
  return (
    <div>
      {Object.entries(traitCount).map((synergy) => (
        <div className="flex gap-1">
          <p>{synergy[1]}</p>
          <p>{synergy[0]}</p>
        </div>
      ))}
    </div>
  );
}

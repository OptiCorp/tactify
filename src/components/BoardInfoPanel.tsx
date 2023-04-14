import { champions } from '~/champions';

export function BoardInfoPanel(props: { traits: string[] | undefined }) {
  console.log(props.traits);
  return (
    <div>
      {props.traits?.map((trait) => (
        <div>{trait}</div>
      ))}
    </div>
  );
}

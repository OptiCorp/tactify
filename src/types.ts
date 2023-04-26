export type TChampion = {
  name?: string;
  cost: number;
  images?: string;
  traits?: string[];
};

export type CharacterType = {
  name: string;
  image: string;
  gender: string;
  species: string;
  origin: {
    name: string;
  };
  cost: Cost;
  id?: number;
};

export type SpecieBonusTypes = {
  [key: string]: {
    stat: string;
    amount: number;
    threshold: number;
  };
};

export type SpecieType = {
  species: string;
  image: string;
};

export type Props = {
  selectedImage?: string[];
  setSelectedImage: () => void;
};

export enum Cost {
  Human = 1,
  Alien,
  unknown,
  Animal,
  Robot,
  Mythological,
}

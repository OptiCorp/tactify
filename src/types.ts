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
  origin: string;
  cost: Cost;
  id?: number;
};

export type SelectedType = 'cost' | 'name' | 'search';

export type Props = {
  selectedImage: string;
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

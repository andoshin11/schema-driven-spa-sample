import BaseEntity from './Base'

export interface PetData {
  id: number;
  name: string;
  category: 1 | 2 | 3;
  sex: "male" | "female";
}

export default class PetEntity extends BaseEntity<PetData> {
  get categoryStr() {
    const { category } = this._data

    switch (category) {
      case 1:
        return 'cat'
      case 2:
        return 'dog'
      case 3:
        return 'rabbit'
      default:
        return 'other'
    }
  }
}

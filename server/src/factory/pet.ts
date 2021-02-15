import { Pet } from '../types/schema'

export function petFactory(props?: Partial<Pet>): Pet {
  return {
    id: 1,
    name: 'Sparky',
    category: 1,
    sex: 'male',
    ...props
  }
}

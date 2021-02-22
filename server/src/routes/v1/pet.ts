import { Router } from 'express'
import { petFactory } from '../../factory/pet'

export function factory(router: Router) {
  router.get('')

  router.get('/pets', (req, res) => {
    const { limit, offset } = req.query
    const pets = [
      petFactory({ id: 1, category: 1 }),
      petFactory({ id: 2, category: 2, name: 'Oscar' }),
      petFactory({ id: 3, category: 3, name: 'Max' }),
      petFactory({ id: 4, category: 1, name: 'Sam' }),
      petFactory({ id: 5, category: 2, name: 'Misty' }),
      petFactory({ id: 6, category: 3, name: 'Simba' }),
      petFactory({ id: 7, category: 1, name: 'Coco' }),
      petFactory({ id: 8, category: 2, name: 'Lucy' }),
      petFactory({ id: 9, category: 3, name: 'Molly' }),
      petFactory({ id: 10, category: 1, name: 'Lala' }),
    ]

    res.status(200).json({ pets: pets.splice(offset || 0, limit || 5)})
  })

  router.post('/pets', (req, res) => {
    const { body } = req

    res.json({ pet: petFactory({ ...body }) })
  })

  router.get('/pets/:petId', (req, res) => {
    const { petId } = req.params

    res.json({ pet: petFactory({ id: parseInt(petId, 10) }) })
  })
}

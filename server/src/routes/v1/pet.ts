import { Router } from 'express'
import { petFactory } from '../../factory/pet'

export function factory(router: Router) {
  router.get('/pets', (req, res) => {
    res.json({ pets: [
      petFactory({ id: 1 }),
      petFactory({ id: 2 })
    ] })
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

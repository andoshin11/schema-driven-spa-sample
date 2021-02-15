import { Router } from 'express'
import * as pet from './pet'

export function factory(router: Router) {
  const routes = [pet]

  routes.forEach(r => r.factory(router))
}

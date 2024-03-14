import * as uuid from 'uuid'
import { NotFoundException } from '@nestjs/common'

export function validateUuid(ids: (string | undefined)[]): void {
  if (ids.some(id => !!id)) {
    for (const id of ids) {
      if (id && !uuid.validate(id)) {
        throw new NotFoundException('Invalid UUID Format')
      }
    }
  }
}

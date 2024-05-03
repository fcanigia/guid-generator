import type { GuidGenerator } from '../interfaces/GuidGenerator'
import { Guid } from 'guid-typescript'

export class GuidTsGuidGenerator implements GuidGenerator {
  generateGuid(): string {
    return Guid.create().toString()
  }
}

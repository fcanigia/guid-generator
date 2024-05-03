import type { GuidGenerator } from '../interfaces/GuidGenerator'
import { v4 as uuidv4 } from 'uuid'

export class UuidV4GuidGenerator implements GuidGenerator {
  generateGuid(): string {
    return uuidv4()
  }
}

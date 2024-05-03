import type { GuidGenerator } from '../interfaces/GuidGenerator'

export class CryptoRandomGuidGenerator implements GuidGenerator {
  generateGuid(): string {
    return crypto.randomUUID()
  }
}

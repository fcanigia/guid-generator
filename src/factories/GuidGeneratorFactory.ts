import type { GuidGenerator } from '../interfaces/GuidGenerator'
import { CryptoRandomGuidGenerator } from '../generators/CryptoRandomGuidGenerator'
import { UuidV4GuidGenerator } from '../generators/UuidV4GuidGenerator'
import { GuidTsGuidGenerator } from '../generators/GuidTsGuidGenerator'
import { TimestampGuidGenerator } from '../generators/TimestampGuidGenerator'
import { RandomNumberGuidGenerator } from '../generators/RandomNumberGuidGenerator'

export class GuidGeneratorFactory {
  createGuidGenerator(type: string): GuidGenerator {
    switch (type) {
      case 'crypto.randomUUID':
        return new CryptoRandomGuidGenerator()
      case 'uuidv4':
        return new UuidV4GuidGenerator()
      case 'guid-typescript':
        return new GuidTsGuidGenerator()
      case 'timestamp':
        return new TimestampGuidGenerator()
      case 'randomNumber':
        return new RandomNumberGuidGenerator()
      default:
        throw new Error('Invalid GUID generation type')
    }
  }
}

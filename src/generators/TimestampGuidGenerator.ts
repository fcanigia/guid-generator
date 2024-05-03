import type { GuidGenerator } from '../interfaces/GuidGenerator'

export class TimestampGuidGenerator implements GuidGenerator {
  generateGuid(): string {
    const timestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random() * 1000000)
    const guid = `${timestamp}-${randomNum}`
    return guid
  }
}

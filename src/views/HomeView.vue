<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Guid } from 'guid-typescript'

// #1 - crypto.randomUUID
const generateGuid = () => {
  const guid = crypto.randomUUID()
  console.log(guid)
}

// #2 - uuid
const generateGuidWithUuid = () => {
  const guid = uuidv4()
  console.log(guid)
}

// #3 - guid-typescript
const generateGuidWithGuidTs = () => {
  const guid = Guid.create().toString()
  console.log(guid)
}

// #4 - timestamp
const generateGuidWithTimeStamp = () => {
  const timestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000000)
  const guid = `${timestamp}-${randomNum}`
  console.log(guid)
}

// #5 - with random number
const generateGuidWithRandomNumber = () => {
  console.log(generateRandomNumberGUID())
}

function generateRandomNumberGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
</script>

<template>
  <div class="bg-gray-600">
    <div class="flex flex-col">
      <span>Number of guids</span>
      <input class="my-5 bg-gray-400" type="number" />
      <button @click="generateGuidWithRandomNumber">
        <span>Get Guids</span>
      </button>
      <span class="bg-blue-300 w-40 h-120">aaaa</span>
    </div>
  </div>
</template>

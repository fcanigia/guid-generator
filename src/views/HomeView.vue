<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Guid } from 'guid-typescript'
import { ref } from 'vue'

const numberOfGuids = ref(1)
const generatedGuids = ref('')

// #1 - crypto.randomUUID
const generateGuid = () => {
  return crypto.randomUUID()
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

const generateGuids = () => {
  const guids = []
  for (let i = 0; i < numberOfGuids.value; i++) {
    guids.push(generateGuid())
  }
  generatedGuids.value = guids.join('\n')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">GUID Generator</h1>
      <label for="numberOfGuids" class="block mb-2">Number of GUIDs</label>
      <input
        id="numberOfGuids"
        v-model="numberOfGuids"
        type="number"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        @click="generateGuids"
        class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Get GUIDs
      </button>
      <div class="mt-4">
        <label for="generatedGuids" class="block mb-2">Generated GUIDs</label>
        <textarea
          id="generatedGuids"
          v-model="generatedGuids"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          rows="5"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

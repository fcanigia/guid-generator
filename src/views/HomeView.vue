<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Guid } from 'guid-typescript'
import { onMounted, ref } from 'vue'

const numberOfGuids = ref(1)
const numberOfGuidsInput = ref(null)
const generatedGuids = ref('')
const generationOption = ref('crypto.randomUUID')
const copyToClipboard = ref(false)
const uppercase = ref(false)

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
      <div class="flex items-center mb-4">
        <label for="numberOfGuids" class="mr-2">Number of GUIDs</label>
        <input
          ref="numberOfGuidsInput"
          id="numberOfGuids"
          v-model="numberOfGuids"
          type="number"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          @keydown.enter="generateGuids"
          autofocus
        />
      </div>
      <div class="mb-4">
        <label for="generationOptions" class="block mb-2">Generation Options</label>
        <div class="flex items-center">
          <select
            id="generationOptions"
            v-model="generationOption"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="crypto.randomUUID">crypto.randomUUID</option>
            <option value="uuidv4">uuidv4</option>
            <option value="guid-typescript">guid-typescript</option>
            <option value="timestamp">timestamp</option>
            <option value="randomNumber">Random Number</option>
          </select>
          <input type="checkbox" id="copyToClipboard" v-model="copyToClipboard" class="ml-2" />
          <label for="copyToClipboard" class="ml-1">Copy to Clipboard</label>
          <input type="checkbox" id="uppercase" v-model="uppercase" class="ml-4" />
          <label for="uppercase" class="ml-1">Uppercase</label>
        </div>
      </div>
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

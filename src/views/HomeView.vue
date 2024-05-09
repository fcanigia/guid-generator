<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GuidGeneratorFactory } from '@/factories/GuidGeneratorFactory'

const numberOfGuids = ref(1)
const numberOfGuidsInput = ref(null)
const generatedGuids = ref('')
const generationOption = ref('crypto.randomUUID')
const generationWrapper = ref('No')
const generationSeparator = ref('-')
const generationTrailingChar = ref('')
const copyToClipboard = ref(false)
const uppercase = ref(false)
const startTime = ref(0)
const elapsedTime = ref('')

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    generateGuids()
  }
}

const generateGuids = () => {
  console.log(generationTrailingChar.value)

  startTime.value = Date.now()

  const factory = new GuidGeneratorFactory()
  const generator = factory.createGuidGenerator(generationOption.value)

  const guids = []

  for (let i = 0; i < numberOfGuids.value; i++) {
    guids.push(generator.generateGuid())
  }

  generatedGuids.value = guids.join(`${generationTrailingChar.value}\n`)

  generatedGuids.value = uppercase.value
    ? generatedGuids.value.toUpperCase()
    : generatedGuids.value.toLowerCase()

  if (copyToClipboard.value) {
    copyGuidsToClipboard(guids.join('\n'))
  }

  const endTime = Date.now()
  const diff = endTime - startTime.value
  elapsedTime.value = formatElapsedTime(diff)
}

const formatElapsedTime = (diff: number): string => {
  if (diff < 1000) {
    return `${diff}ms`
  } else if (diff < 60000) {
    return `${(diff / 1000).toFixed(1)}s`
  } else {
    return `${Math.floor(diff / 60000)}m ${(diff % 60000) / 1000}s`
  }
}

const onEnter = () => {
  if (numberOfGuids.value < 1) {
    numberOfGuids.value = 1
  } else if (numberOfGuids.value > 200000) {
    numberOfGuids.value = 200000
  }
  generateGuids()
}

const copyGuidsToClipboard = async (guids: string) => {
  try {
    await navigator.clipboard.writeText(guids)
    console.log('GUIDs copied to clipboard')
  } catch (error) {
    console.error('Failed to copy GUIDs to clipboard:', error)
  }
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
          @keydown.enter.prevent="onEnter"
          max="200000"
          min="1"
          autofocus
        />
      </div>
      <div class="mb-4">
        <label for="generationOptions" class="block mb-2 font-bold">Options</label>
        <div class="flex items-center">
          <label class="mr-2">Method:</label>
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
        </div>
        <div class="flex items-center mt-2">
          <label class="mr-2">Wrap?:</label>
          <select
            id="generationWrapper"
            v-model="generationWrapper"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="No">No</option>
            <option value='"'>"</option>
            <option value="'">'</option>
          </select>
          <label class="mr-2">Separator:</label>
          <select
            id="generationSeparator"
            v-model="generationSeparator"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="-">-</option>
            <option value="|">|</option>
            <option value="#">#</option>
          </select>
        </div>

        <div class="flex items-center">
          <label class="mr-2">Trailing character:</label>
          <select
            id="generationTrailingChar"
            v-model="generationTrailingChar"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">No</option>
            <option value=",">,</option>
            <option value=".">.</option>
            <option value=";">;</option>
          </select>
        </div>

        <div class="flex flex-row mt-2">
          <label class="checkbox-label mr-8">
            <input type="checkbox" v-model="copyToClipboard" class="checkbox-input" />
            <span class="checkbox-text">Copy to Clipboard</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="uppercase" class="checkbox-input" />
            <span class="checkbox-text">Uppercase</span>
          </label>
        </div>
      </div>
      <button
        @click="generateGuids"
        class="mt-4 w-full px-4 py-2 bg-favicon text-white rounded-md hover:bg-faviconDarker focus:outline-none"
      >
        Get GUIDs
      </button>
      <div class="mt-4">
        <label for="generatedGuids" class="block mb-2 font-bold">Result</label>
        <textarea
          id="generatedGuids"
          v-model="generatedGuids"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          rows="5"
          readonly
        >
        </textarea>
        <span class="absolute bottom-0 right-0 bg-gray-200 text-xs px-2 py-1 rounded-md">
          {{ elapsedTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.checkbox-label {
  display: flex;
  align-items: center;
  user-select: none; /* Prevent text selection */
}

.checkbox-text {
  margin-left: 5px;
  cursor: pointer; /* Change cursor to pointer on hover */
}
</style>

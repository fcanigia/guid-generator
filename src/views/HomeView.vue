<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GuidGeneratorFactory } from '@/factories/GuidGeneratorFactory'

const numberOfGuids = ref(1)
const numberOfGuidsInput = ref(null)
const generatedGuids = ref('')
const generationOption = ref('crypto.randomUUID')
const copyToClipboard = ref(false)
const uppercase = ref(false)

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
  const factory = new GuidGeneratorFactory()
  const generator = factory.createGuidGenerator(generationOption.value)

  const guids = []

  for (let i = 0; i < numberOfGuids.value; i++) {
    guids.push(generator.generateGuid())
  }

  generatedGuids.value = guids.join('\n')

  if (copyToClipboard.value) {
    copyGuidsToClipboard(guids.join('\n'))
  }
}

const onEnter = () => {
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
          <label class="checkbox-label">
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

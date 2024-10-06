<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { GuidGeneratorFactory } from '../factories/GuidGeneratorFactory'

const numberOfGuids = ref(1)
const numberOfGuidsInput = ref(null)
const generatedGuids = ref('')
const generationOption = ref('crypto.randomUUID')
const generationWrapper = ref('')
const generationSeparator = ref('-')
const generationTrailingChar = ref('')
const copyToClipboard = ref(false)
const uppercase = ref(false)
const startTime = ref(0)
const elapsedTime = ref('')

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
  loadSettingsFromSession()
})

watch(
  [
    generationOption,
    generationWrapper,
    generationSeparator,
    generationTrailingChar,
    copyToClipboard,
    uppercase
  ],
  () => {
    saveSettingsToSession()
  }
)

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    generateGuids()
  }
}

const generateGuids = () => {
  startTime.value = Date.now()

  const factory = new GuidGeneratorFactory()
  const generator = factory.createGuidGenerator(generationOption.value)

  const guids = []
  const wrapper = generationWrapper.value

  for (let i = 0; i < numberOfGuids.value; i++) {
    let guid = generator.generateGuid()

    if (generationSeparator.value != '-') {
      guid = guid.replace(/-/g, generationSeparator.value)
    }

    guids.push(`${wrapper}${guid}${wrapper}`)
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

const saveSettingsToSession = () => {
  sessionStorage.setItem('generationOption', generationOption.value)
  sessionStorage.setItem('generationWrapper', generationWrapper.value)
  sessionStorage.setItem('generationSeparator', generationSeparator.value)
  sessionStorage.setItem('generationTrailingChar', generationTrailingChar.value)
  sessionStorage.setItem('copyToClipboard', copyToClipboard.value.toString())
  sessionStorage.setItem('uppercase', uppercase.value.toString())
}

const loadSettingsFromSession = () => {
  const storedOption = sessionStorage.getItem('generationOption')
  const storedWrapper = sessionStorage.getItem('generationWrapper')
  const storedSeparator = sessionStorage.getItem('generationSeparator')
  const storedTrailingChar = sessionStorage.getItem('generationTrailingChar')
  const storedCopyToClipboard = sessionStorage.getItem('copyToClipboard')
  const storedUppercase = sessionStorage.getItem('uppercase')

  if (storedOption) generationOption.value = storedOption
  if (storedWrapper) generationWrapper.value = storedWrapper
  if (storedSeparator) generationSeparator.value = storedSeparator
  if (storedTrailingChar) generationTrailingChar.value = storedTrailingChar
  if (storedCopyToClipboard) copyToClipboard.value = storedCopyToClipboard === 'true'
  if (storedUppercase) uppercase.value = storedUppercase === 'true'
}
</script>

<template>
  <div class="sr-only">
    Easily generate unique GUIDs with our free online GUID generator. Simple, fast, and reliable!
    Try it now!
  </div>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <!-- Left Section: Text Information -->

    <div class="hidden md:block text-left p-6 max-w-md">
      <h1 class="text-xl font-bold text-gray-800 mb-4 inline-flex items-center" title="Home">
        <img src="/public/favicon.ico" alt="GUID generator logo" class="mr-2" />
        Online Free GUID Generator
      </h1>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">What is a GUID/UUID?</h2>
      <p class="text-gray-600 mb-4 text-xs">
        A GUID (Globally Unique Identifier) or UUID (Universally Unique Identifier) is a 128-bit
        value used to uniquely identify objects or information in a distributed system. This unique
        identifier does not rely on a central authority, making it an ideal solution for various
        applications.
      </p>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">
        How to Use the Online GUID Generator?
      </h2>
      <p class="text-gray-600 mb-4 text-xs">
        With our <strong>free online GUID generator</strong>, you can easily create unique
        identifiers. Just press the Enter key or click on the "Get GUIDs" button to generate your
        GUIDs. This tool is designed to help developers and users generate GUIDs quickly and
        efficiently.
      </p>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Why Use a GUID?</h2>
      <p class="text-gray-600 mb-4 text-xs">
        Using a GUID can be beneficial for ensuring uniqueness in databases, distributed systems,
        and applications that require a reliable method for object identification. Understanding how
        to generate a GUID and why it’s important can help in many software development scenarios.
      </p>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Frequently Asked Questions</h2>
      <ul class="list-disc text-gray-600 mb-4 text-xs">
        <li>
          <strong>Is a GUID really unique?</strong> While GUIDs are
          <strong>statistically unique</strong>, they are not guaranteed to be unique due to random
          generation. However, the chance of duplication is astronomically low.
        </li>
        <li>
          <strong>Can I use a GUID as a primary key in my database?</strong> Yes, GUIDs are commonly
          used as primary keys, especially in distributed systems where multiple databases are
          involved. However, they may consume more storage space compared to traditional
          integer-based keys.
        </li>
        <li>
          <strong>What are the different types of UUIDs?</strong> UUIDs come in multiple types such
          as <strong>UUIDv1</strong>, which includes a timestamp, and UUIDv4, which is randomly
          generated. Our tool supports several UUID generation methods to suit your specific use
          case.
        </li>
      </ul>
    </div>

    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-8">
      <h1 class="text-2xl font-bold mb-4">GUID Generator</h1>
      <div class="flex items-center mb-4">
        <label for="numberOfGuids" class="mr-2">Number of GUIDs:</label>
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
        <h2><label for="generationOptions" class="block mb-2 font-bold">Options</label></h2>
        <div class="flex items-center">
          <label class="mr-2">Method:</label>
          <select
            id="generationOptions"
            v-model="generationOption"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="crypto.randomUUID" label="randomUUID"></option>
            <option value="uuidv4" label="uuidv4"></option>
            <option value="guid-typescript" label="typescript"></option>
            <option value="timestamp" label="timestamp"></option>
            <option value="randomNumber" label="randomNumber"></option>
          </select>
        </div>
        <div class="flex items-center mt-2 space-x-2">
          <label for="generationWrapper" class="mr-2">Wrap?:</label>
          <select
            id="generationWrapper"
            v-model="generationWrapper"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" label="No"></option>
            <option value='"' label='"'></option>
            <option value="'" label="'"></option>
          </select>

          <label for="generationSeparator" class="mr-2">Separator:</label>
          <select
            id="generationSeparator"
            v-model="generationSeparator"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="-" label="-"></option>
            <option value="|" label="|"></option>
            <option value="#" label="#"></option>
          </select>
        </div>
        <div class="flex items-center">
          <label for="generationTrailingChar" class="mr-2">Trailing character:</label>
          <select
            id="generationTrailingChar"
            v-model="generationTrailingChar"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" label="No"></option>
            <option value="," label=","></option>
            <option value="." label="."></option>
            <option value=";" label=";"></option>
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
        <h2><label for="generatedGuids" class="block mb-2 font-bold">Result</label></h2>
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
    <!-- Footer Section -->
    <div>
      <span class="absolute bottom-0 left-0 bg-gray-200 text-xs px-2 py-1 rounded-md">
        <a
          href="https://github.com/fcanigia"
          target="_blank"
          rel="noopener"
          class="hover:underline"
        >
          GitHub
        </a>
        |
        <a
          href="https://en.wikipedia.org/wiki/Universally_unique_identifier"
          target="_blank"
          rel="noopener"
          class="hover:underline"
        >
          GUID Wiki
        </a>
      </span>
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>

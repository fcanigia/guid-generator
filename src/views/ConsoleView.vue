<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'

type Flags = {
  count: number
  upper: boolean
  braces: boolean
  sep: string
  wrap: '' | '"' | "'"
  copy: boolean
}

const STORAGE_KEY = 'guid-console-last-flags'
const HISTORY_KEY = 'guid-console-history'
const MAX_HISTORY = 10

const DEFAULT_FLAGS: Flags = {
  count: 1,
  upper: false,
  braces: false,
  sep: '-',
  wrap: '',
  copy: false
}

const lines = ref<string[]>([
  'GUID Console — type `help`',
  'Commands:',
  '  guid [N] [--count N] [--upper] [--braces] [--sep S] [--wrap "\'|"] [--copy]',
  '  last       (show last-used flags)',
  '  reset      (reset flags to defaults)',
  '  clear      (clear screen)'
])

const cmd = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const containerEl = ref<HTMLDivElement | null>(null)
const bottomEl = ref<HTMLDivElement | null>(null) // 👈 sentinel

const history = ref<string[]>([])
const historyIndex = ref<number>(-1)

onMounted(() => {
  inputEl.value?.focus()

  const saved = sessionStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      lastFlags.value = sanitizeFlags(JSON.parse(saved))
    } catch (err) {
      console.warn('Failed to parse last flags from sessionStorage:', err)
    }
  }
  const savedHist = sessionStorage.getItem(HISTORY_KEY)
  if (savedHist) {
    try {
      history.value = JSON.parse(savedHist) as string[]
    } catch (err) {
      console.warn('Failed to parse history from sessionStorage:', err)
    }
  }

  // Ctrl/Cmd + K clears screen
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      clearScreen()
    }
  })
})

const lastFlags = ref<Flags>({ ...DEFAULT_FLAGS })

// ---- scrolling helpers ----
async function scrollToBottom() {
  await nextTick()
  if (bottomEl.value) {
    bottomEl.value.scrollIntoView({ block: 'end' }) // snaps a bit past the prompt
  } else {
    window.scrollTo({ top: document.documentElement.scrollHeight })
  }
}

const write = (s = '') => {
  lines.value.push(s)
  void scrollToBottom()
}

const writeMany = (arr: string[]) => {
  if (!arr.length) return
  lines.value.push(...arr)
  void scrollToBottom()
}

const clearScreen = () => {
  lines.value = []
  void scrollToBottom()
}
const focusInput = () => inputEl.value?.focus()

// ---------- helpers ----------
function clamp(n: number, min = 1, max = 1000) {
  return Math.min(max, Math.max(min, Math.trunc(n)))
}
function unquote(s: string) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1)
  }
  return s
}

// ---------- GUID helpers ----------
function genGuid(): string {
  return crypto.randomUUID()
}
function formatGuid(g: string, f: Flags): string {
  let out = g
  if (f.sep && f.sep !== '-') out = out.replace(/-/g, f.sep)
  if (f.upper) out = out.toUpperCase()
  if (f.braces) out = `{${out}}`
  if (f.wrap === '"' || f.wrap === "'") out = `${f.wrap}${out}${f.wrap}`
  return out
}

// ---------- Clipboard (same as main page) ----------
const copyGuidsToClipboard = async (guids: string) => {
  try {
    await navigator.clipboard.writeText(guids)
    console.log('GUIDs copied to clipboard')
  } catch (error) {
    console.error('Failed to copy GUIDs to clipboard:', error)
  }
}

// ---------- Flags parsing / persistence ----------
function parseFlags(s: string): Flags {
  const all = s.match(/"[^"]*"|'[^']*'|\S+/g) || []
  const tokens = all[0]?.toLowerCase() === 'guid' ? all.slice(1) : all.slice()
  const f: Flags = { ...lastFlags.value }

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (/^\d+$/.test(t)) {
      f.count = clamp(parseInt(t, 10))
      continue
    }

    switch (t) {
      case '--count': {
        const next = tokens[i + 1]
        if (next && /^\d+$/.test(next)) {
          f.count = clamp(parseInt(next, 10))
          i++
        }
        break
      }
      case '--upper':
        f.upper = true
        break
      case '--braces':
        f.braces = true
        break
      case '--copy':
        f.copy = true
        break
      case '--sep': {
        const next = tokens[i + 1]
        if (next) {
          f.sep = unquote(String(next)) || '-'
          i++
        }
        break
      }
      case '--wrap': {
        const next = tokens[i + 1]
        if (next) {
          const w = unquote(String(next))
          if (w === '"' || w === "'") f.wrap = w as '"' | "'"
          i++
        }
        break
      }
      default:
        break
    }
  }
  return sanitizeFlags(f)
}

function sanitizeFlags(f: Flags): Flags {
  return {
    count: Number.isFinite(f.count) ? clamp(f.count) : 1,
    upper: !!f.upper,
    braces: !!f.braces,
    sep: typeof f.sep === 'string' && f.sep.length > 0 ? f.sep : '-',
    wrap: f.wrap === '"' || f.wrap === "'" ? f.wrap : '',
    copy: !!f.copy
  }
}

function saveLastFlags(f: Flags) {
  lastFlags.value = sanitizeFlags(f)
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lastFlags.value))
  } catch (err) {
    console.warn('Failed to persist last flags:', err)
  }
}

function resetFlags() {
  lastFlags.value = { ...DEFAULT_FLAGS }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lastFlags.value))
  } catch (err) {
    console.warn('Failed to persist reset flags:', err)
  }
  write(`flags reset to defaults: ${flagsToDisplayString(lastFlags.value)}`)
}

function flagsToDisplayString(f: Flags) {
  const parts: string[] = ['guid']
  if (f.count !== 1) parts.push(`--count ${f.count}`)
  if (f.upper) parts.push('--upper')
  if (f.braces) parts.push('--braces')
  if (f.sep !== '-') parts.push(`--sep ${f.sep}`)
  if (f.wrap) parts.push(`--wrap ${f.wrap}`)
  if (f.copy) parts.push('--copy')
  return parts.join(' ')
}

// ---------- History ----------
function pushHistory(command: string) {
  if (!command) return
  if (history.value[history.value.length - 1] !== command) {
    history.value.push(command)
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(history.value.length - MAX_HISTORY)
    }
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
    } catch (err) {
      console.warn('Failed to persist history:', err)
    }
  }
  historyIndex.value = -1
}
function onHistoryUp(e: KeyboardEvent) {
  if (history.value.length === 0) return
  e.preventDefault()
  if (historyIndex.value === -1) historyIndex.value = history.value.length - 1
  else if (historyIndex.value > 0) historyIndex.value -= 1
  cmd.value = history.value[historyIndex.value]
  focusCursorEnd()
}
function onHistoryDown(e: KeyboardEvent) {
  if (history.value.length === 0) return
  e.preventDefault()
  if (historyIndex.value === -1) {
    cmd.value = ''
    return
  }
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value += 1
    cmd.value = history.value[historyIndex.value]
  } else {
    historyIndex.value = -1
    cmd.value = ''
  }
  focusCursorEnd()
}
function focusCursorEnd() {
  requestAnimationFrame(() => {
    const el = inputEl.value
    if (!el) return
    const v = el.value
    el.value = ''
    el.value = v
  })
}

// ---------- Runner ----------
async function run() {
  const input = cmd.value.trim()
  write(`> ${input}`)
  pushHistory(input)
  cmd.value = ''

  if (!input) return

  if (input === 'help' || input === 'guid --help') {
    write('guid [N] [--count N] [--upper] [--braces] [--sep S] [--wrap "\'|"] [--copy]')
    write('last             show last-used flags')
    write('reset            reset flags to defaults')
    write('clear            clear the screen')
    return
  }
  if (input === 'last') {
    write(flagsToDisplayString(lastFlags.value))
    return
  }
  if (input === 'reset') {
    resetFlags()
    return
  }
  if (input === 'clear') {
    clearScreen()
    return
  }

  if (input.startsWith('guid')) {
    const flags = parseFlags(input)

    const batch: string[] = []
    for (let i = 0; i < flags.count; i++) {
      batch.push(formatGuid(genGuid(), flags))
    }

    if (flags.copy) {
      await copyGuidsToClipboard(batch.join('\n'))
    }

    // One bulk write and one scroll — super fast even for 5000 lines
    const out = [...batch]
    if (flags.copy) out.push('(copied)')
    writeMany(out)

    saveLastFlags(flags)
    return
  }

  write('Unknown command. Try: help')
}
</script>

<template>
  <div
    ref="containerEl"
    class="min-h-screen bg-black text-green-400 font-mono p-4 cursor-text"
    @click="focusInput"
  >
    <div v-for="(line, i) in lines" :key="i" class="whitespace-pre-wrap leading-relaxed">
      {{ line }}
    </div>

    <!-- console prompt -->
    <div class="flex mt-2 items-center">
      <span>&gt;&nbsp;</span>
      <input
        ref="inputEl"
        v-model="cmd"
        @keydown.enter.prevent="run"
        @keydown.up="onHistoryUp"
        @keydown.down="onHistoryDown"
        class="flex-1 bg-black text-green-400 outline-none caret-green-400"
        placeholder="try: guid 5000 --copy"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
      />
    </div>

    <!-- tips (still clickable to focus) -->
    <div
      class="text-xs text-green-500/70 mt-3 select-none"
      role="button"
      tabindex="0"
      @click.stop="focusInput"
      @keydown.enter.prevent="focusInput"
      @keydown.space.prevent="focusInput"
    >
      tips: <kbd>Enter</kbd> run • <kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> clear • ↑/↓ history
    </div>

    <!-- 👇 move sentinel to AFTER the prompt & tips, add some height buffer -->
    <div ref="bottomEl" style="height: 96px"></div>
  </div>
</template>

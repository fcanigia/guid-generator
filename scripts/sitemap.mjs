// scripts/sitemap.mjs

import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the hostname for the sitemap
const hostname = 'https://freeguid.online'

// Create a SitemapStream instance
const sitemap = new SitemapStream({ hostname })

// Create a writable stream to save the sitemap.xml file in the public directory
const writeStream = createWriteStream(path.resolve(__dirname, '../public/sitemap.xml'))

// Pipe the sitemap stream to the write stream
sitemap.pipe(writeStream)

// Add URLs to the sitemap
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 })

// End the sitemap stream
sitemap.end()

// Handle the completion of the write stream
writeStream.on('finish', () => {
  console.log('Sitemap created successfully.')
})

// Handle errors in the write stream
writeStream.on('error', (error) => {
  console.error('Error creating sitemap:', error)
})

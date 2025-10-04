const sass = require('sass')
const fs = require('fs')
const path = require('path')

const outFile = path.resolve(__dirname, '../dist/index.css')

function build() {
  const result = sass.compile(path.resolve(__dirname, '../src/index.scss'), {
    style: 'expanded'
  })
  fs.writeFileSync(outFile, result.css)
  console.log('✅ SCSS compiled into dist/index.css')
}

if (process.argv.includes('--watch')) {
  console.log('👀 Watching for SCSS changes...')
  fs.watch(
    path.resolve(__dirname, '../src'),
    { recursive: true },
    (evt, filename) => {
      if (filename.endsWith('.scss')) {
        try {
          build()
        } catch (err) {
          console.error('❌ SCSS build error:', err)
        }
      }
    }
  )
} else {
  build()
}

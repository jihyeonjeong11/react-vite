import { rollup } from 'rollup'
import analyze from 'rollup-plugin-analyzer'
const limitBytes = 1e6

const onAnalysis = ({bundleSize}) => {
  if (bundleSize < limitBytes) return
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`)
  return process.exit(1)
}

rollup({
  entry: 'main.js',
  plugins: [analyze({onAnalysis, skipFormatted: true})]
}).then((result) => {
    console.log(result)
})
import { useState, useEffect } from 'react'
import './App.css'
import PaletteForm from './components/PaletteForm'
import PaletteDisplay from './components/PaletteDisplay'
import ExportPanel from './components/ExportPanel'

function App() {
  const [colors, setColors] = useState([])
  const [lockedColors, setLockedColors] = useState(new Set())

  const generateInitialPalette = () => {
    const initialColors = Array.from({ length: 5 }, () => generateRandomColor())
    setColors(initialColors)
  }

  useEffect(() => {
    generateInitialPalette()
  }, [])

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  const generatePastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 30) + 20
    const lightness = Math.floor(Math.random() * 30) + 60
    return hslToHex(hue, saturation, lightness)
  }

  const generateMonochromaticColors = (baseColor, count) => {
    const colors = []
    const hsl = hexToHsl(baseColor)
    
    for (let i = 0; i < count; i++) {
      const lightness = Math.max(10, Math.min(90, hsl.l + (i - Math.floor(count / 2)) * 15))
      colors.push(hslToHex(hsl.h, hsl.s, lightness))
    }
    
    return colors
  }

  const generateComplementaryColors = (baseColor, count) => {
    const colors = []
    const hsl = hexToHsl(baseColor)
    const complementaryHue = (hsl.h + 180) % 360
    
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        const lightness = Math.max(20, Math.min(80, hsl.l + (i / 2) * 10))
        colors.push(hslToHex(hsl.h, hsl.s, lightness))
      } else {
        const lightness = Math.max(20, Math.min(80, hsl.l + (Math.floor(i / 2)) * 10))
        colors.push(hslToHex(complementaryHue, hsl.s, lightness))
      }
    }
    
    return colors
  }

  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToHex = (h, s, l) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const handleGeneratePalette = (numColors, scheme) => {
    const newColors = []
    
    for (let i = 0; i < numColors; i++) {
      if (lockedColors.has(i)) {
        newColors.push(colors[i])
      } else {
        let newColor
        switch (scheme) {
          case 'random':
            newColor = generateRandomColor()
            break
          case 'pastel':
            newColor = generatePastelColor()
            break
          case 'monochromatic':
            const baseColor = colors.length > 0 ? colors[0] : generateRandomColor()
            const monoColors = generateMonochromaticColors(baseColor, numColors)
            newColor = monoColors[i]
            break
          case 'complementary':
            const compBaseColor = colors.length > 0 ? colors[0] : generateRandomColor()
            const compColors = generateComplementaryColors(compBaseColor, numColors)
            newColor = compColors[i]
            break
          default:
            newColor = generateRandomColor()
        }
        newColors.push(newColor)
      }
    }
    
    setColors(newColors)
  }

  const toggleLock = (index) => {
    const newLockedColors = new Set(lockedColors)
    if (newLockedColors.has(index)) {
      newLockedColors.delete(index)
    } else {
      newLockedColors.add(index)
    }
    setLockedColors(newLockedColors)
  }

  const copyToClipboard = async (color) => {
    try {
      await navigator.clipboard.writeText(color)
    } catch (err) {
      console.error('Failed to copy color to clipboard:', err)
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Palletron
          </h1>
          <p className="text-gray-600">
            Create beautiful color palettes with ease
          </p>
        </header>

          <PaletteForm onGenerate={handleGeneratePalette} />

          {colors.length > 0 && (
            <>
              <PaletteDisplay 
                colors={colors}
                lockedColors={lockedColors}
                onToggleLock={toggleLock}
                onCopyColor={copyToClipboard}
              />
              
              <ExportPanel colors={colors} />
            </>
          )}
      </div>
    </div>
  )
}

export default App

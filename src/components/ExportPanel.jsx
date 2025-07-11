import { useRef } from 'react'

function ExportPanel({ colors }) {
  const canvasRef = useRef(null)

  const exportAsPNG = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const swatchWidth = 100
    const swatchHeight = 100
    const padding = 20
    const totalWidth = colors.length * swatchWidth + (colors.length + 1) * padding
    const totalHeight = swatchHeight + 2 * padding
    
    canvas.width = totalWidth
    canvas.height = totalHeight
    
    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, totalWidth, totalHeight)
    
    // Draw color swatches
    colors.forEach((color, index) => {
      const x = padding + index * (swatchWidth + padding)
      const y = padding
      
      // Draw color swatch
      ctx.fillStyle = color
      ctx.fillRect(x, y, swatchWidth, swatchHeight)
      
      // Draw border
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, swatchWidth, swatchHeight)
      
      // Draw hex code
      ctx.fillStyle = '#374151'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(color, x + swatchWidth / 2, y + swatchHeight + 15)
    })
    
    // Download the image
    const link = document.createElement('a')
    link.download = 'color-palette.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const exportAsCSS = () => {
    const cssContent = `/* Color Palette CSS Variables */
:root {
${colors.map((color, index) => `  --color-${index + 1}: ${color};`).join('\n')}
}

/* Usage Examples */
.primary-color {
  background-color: var(--color-1);
}

.secondary-color {
  background-color: var(--color-2);
}

.accent-color {
  background-color: var(--color-3);
}

/* All colors as a list */
.color-palette {
${colors.map((color, index) => `  --color-${index + 1}: ${color};`).join('\n')}
}`

    const blob = new Blob([cssContent], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'color-palette.css'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Export Palette</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={exportAsPNG}
          className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Export as PNG
        </button>
        
        <button
          onClick={exportAsCSS}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export as CSS
        </button>
      </div>
      
      {/* Hidden canvas for PNG export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ExportPanel 
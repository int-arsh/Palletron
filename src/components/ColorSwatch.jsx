import { useState } from 'react'

function ColorSwatch({ color, index, isLocked, onToggleLock, onCopyColor }) {
  const [showCopied, setShowCopied] = useState(false)

  const handleCopy = async () => {
    await onCopyColor(color)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  const hexColor = color
  const textColor = getContrastColor(hexColor)

  return (
    <div className="relative group">
      <div 
        className="h-32 rounded-lg shadow-md relative overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: color }}
        onClick={handleCopy}
      >
        {/* Color overlay with hex code */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          <span 
            className="text-sm font-mono font-bold px-2 py-1 rounded"
            style={{ 
              color: textColor,
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            {hexColor}
          </span>
        </div>

        {/* Lock/Unlock button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleLock()
          }}
          className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
        >
          {isLocked ? (
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2h2V7a5 5 0 00-5-5z" />
            </svg>
          )}
        </button>

        {/* Copy icon */}
        <button
          onClick={handleCopy}
          className="absolute top-2 left-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          {showCopied ? (
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hex code below swatch */}
      <div className="mt-2 text-center">
        <span className="text-xs font-mono text-gray-600">{hexColor}</span>
      </div>
    </div>
  )
}

export default ColorSwatch 
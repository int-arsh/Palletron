import ColorSwatch from './ColorSwatch'

function PaletteDisplay({ colors, lockedColors, onToggleLock, onCopyColor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Palette</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
        {colors.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
            index={index}
            isLocked={lockedColors.has(index)}
            onToggleLock={() => onToggleLock(index)}
            onCopyColor={() => onCopyColor(color)}
          />
        ))}
      </div>
    </div>
  )
}

export default PaletteDisplay 
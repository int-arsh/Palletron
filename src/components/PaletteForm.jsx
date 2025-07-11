import { useState } from 'react'

function PaletteForm({ onGenerate }) {
  const [numColors, setNumColors] = useState(5)
  const [scheme, setScheme] = useState('random')

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(numColors, scheme)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="numColors" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Colors
            </label>
            <select
              id="numColors"
              value={numColors}
              onChange={(e) => setNumColors(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="scheme" className="block text-sm font-medium text-gray-700 mb-2">
              Color Scheme
            </label>
            <select
              id="scheme"
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="random">Random</option>
              <option value="pastel">Pastel</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="complementary">Complementary</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Generate Palette
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaletteForm 
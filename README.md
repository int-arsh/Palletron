# 🎨 Palletron - Color Palette Generator

A beautiful, modern React application for generating and managing color palettes with advanced features like color locking, multiple generation schemes, and export capabilities.

![Palletron Preview](https://img.shields.io/badge/React-19.1.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF) ![Bun](https://img.shields.io/badge/Bun-1.0.0-000000)

## ✨ Features

### 🎯 **Core Functionality**
- **Dynamic Color Generation** - Generate 3-10 colors with various schemes
- **Multiple Color Schemes** - Random, Pastel, Monochromatic, and Complementary
- **Smart Color Locking** - Lock individual colors to prevent them from changing
- **One-Click Copy** - Copy hex codes to clipboard with visual feedback
- **Real-time Preview** - See your palette update instantly

### 🎨 **Color Schemes**
- **Random** - Completely random colors for maximum variety
- **Pastel** - Soft, muted colors perfect for gentle designs
- **Monochromatic** - Variations of a single hue with different lightness
- **Complementary** - Colors that are opposite on the color wheel

### 📤 **Export Options**
- **PNG Export** - Download your palette as a high-quality image
- **CSS Export** - Generate CSS variables for easy integration
- **Professional Formatting** - Clean, organized output files

### 🎪 **User Experience**
- **Responsive Design** - Works perfectly on all device sizes
- **Smooth Animations** - Delightful hover effects and transitions
- **Intuitive Interface** - Clean, modern design with excellent usability
- **Accessibility** - Proper focus states and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/palletron.git
   cd palletron
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |

## 🏗️ Project Structure

```
palletron/
├── src/
│   ├── components/
│   │   ├── ColorSwatch.jsx      # Individual color swatch component
│   │   ├── ExportPanel.jsx      # PNG and CSS export functionality
│   │   ├── PaletteDisplay.jsx   # Color palette grid display
│   │   └── PaletteForm.jsx      # User input form
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Custom styles and animations
│   ├── index.css                # Tailwind CSS imports
│   └── main.jsx                 # Application entry point
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎨 Component Architecture

### **App.jsx** - Main Application
- Manages global state (`colors`, `lockedColors`)
- Handles color generation algorithms
- Coordinates data flow between components

### **PaletteForm.jsx** - User Input
- Number of colors selector (3-10)
- Color scheme selection
- Form submission handling

### **PaletteDisplay.jsx** - Color Grid
- Renders color swatches in responsive grid
- Passes props to individual ColorSwatch components

### **ColorSwatch.jsx** - Individual Swatch
- Displays single color with hex code
- Lock/unlock functionality
- Copy to clipboard with feedback
- Hover effects and animations

### **ExportPanel.jsx** - Export Features
- PNG generation using HTML5 Canvas
- CSS variables generation
- File download handling

## 🔧 Technical Details

### **Color Generation Algorithms**

#### Random Colors
```javascript
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}
```

#### Pastel Colors
```javascript
const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 30) + 20
  const lightness = Math.floor(Math.random() * 30) + 60
  return hslToHex(hue, saturation, lightness)
}
```

#### Monochromatic Scheme
- Uses HSL color space for consistent hue
- Varies lightness while maintaining hue and saturation
- Creates harmonious color variations

#### Complementary Scheme
- Generates colors opposite on the color wheel
- Alternates between base and complementary hues
- Maintains visual balance and contrast

### **State Management**
- **React Hooks** - `useState` for local state, `useEffect` for side effects
- **Set Data Structure** - Efficient tracking of locked color indices
- **Props Drilling** - Clean data flow from parent to child components

### **Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Smooth transitions and animations
- **Responsive Design** - Mobile-first approach with breakpoints

## 🎯 Usage Examples

### Basic Palette Generation
1. Select number of colors (3-10)
2. Choose color scheme
3. Click "Generate Palette"
4. Colors appear instantly in the grid

### Locking Colors
1. Click the lock icon on any color swatch
2. Generate new palette - locked colors remain unchanged
3. Click lock again to unlock

### Copying Colors
1. Click the copy icon on any color swatch
2. Color is copied to clipboard
3. Visual feedback shows "copied" state

### Exporting Palettes
1. Click "Export as PNG" for image download
2. Click "Export as CSS" for CSS variables
3. Files download automatically

## 🎨 Color Theory Integration

The application implements several color theory concepts:

- **HSL Color Space** - More intuitive than RGB for color manipulation
- **Complementary Colors** - Colors opposite on the color wheel
- **Monochromatic Schemes** - Variations of a single hue
- **Luminance Calculation** - Ensures proper text contrast
- **Color Harmony** - Balanced and visually pleasing combinations

## 🚀 Performance Optimizations

- **Efficient Re-renders** - Only updates necessary components
- **Set Operations** - O(1) lookup for locked colors
- **Canvas Optimization** - Efficient PNG generation
- **Lazy Loading** - Components load only when needed

## 🔮 Future Enhancements

- [ ] **Color History** - Save and restore previous palettes
- [ ] **Color Picker** - Manual color selection
- [ ] **Advanced Schemes** - Triadic, Analogous, Split-Complementary
- [ ] **Color Blindness** - Accessibility features
- [ ] **Social Sharing** - Share palettes with others
- [ ] **Favorites** - Save favorite color combinations
- [ ] **Import/Export** - JSON format for palette data
- [ ] **Advanced Export** - Adobe Swatch, Sketch, Figma formats

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Vite** - For the lightning-fast build tool
- **Heroicons** - For the beautiful icon set
- **Color Theory** - For the scientific foundation

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Made with ❤️ and React**

*Happy color generating!* 🎨✨
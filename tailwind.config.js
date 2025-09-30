// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'roboto': ['Roboto', 'sans-serif'],
        'fira': ['Fira Code', 'monospace'],
        'stopwatch': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'fluid-xl': 'clamp(3rem, 12vw, 8rem)',
        'fluid-lg': 'clamp(1rem, 3vw, 2rem)',
        'fluid-md': 'clamp(0.875rem, 2vw, 1.25rem)',
      }
    }
  }
}

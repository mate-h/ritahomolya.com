module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.svelte',
      './src/**/*.js',
      './src/**/*.cjs',
      './src/**/*.scss',
      './src/**/*.ts',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
	future: { // For tailwindcss 2.0
		// removeDeprecatedGapUtilities: true, 
		// purgeLayersByDefault: true,
	},
	purge: {
		enabled: true,
		content: [
			'*.html'
		]
	},
	theme: {
		extend: {},
	},
	variants: {
	},
	plugins: [],
}
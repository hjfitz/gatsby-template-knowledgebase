module.exports = {
	siteMetadata: {
		siteName: 'Harry',
		author: '@hjfitz',
		articleDir: 'pages/articles',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 960,
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-smartypants',
				],
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages/`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				postCssPlugins: [
					require('tailwindcss'),
					require('./tailwind.config.js'), // Optional: Load custom Tailwind CSS configuration
				],
			},
		},

		// {
		//   resolve: `gatsby-plugin-manifest`,
		//   options: {
		//     name: `gatsby-starter-default`,
		//     short_name: `starter`,
		//     start_url: `/`,
		//     background_color: `#663399`,
		//     theme_color: `#663399`,
		//     display: `minimal-ui`,
		//     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
		//   },
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}

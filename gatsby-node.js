const path = require('path')
const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const format = require('date-fns/format')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const getPath = (node) => `/${kebabCase(node.frontmatter.title)}`

const localArticleDir = 'src/pages/articles'
const curDir = process.cwd()
const articleDir = path.join(curDir, localArticleDir)

async function createPages({graphql, actions: {createPage}}) {
	const result = await graphql(`
  {
    allMdx {
      edges {
        node {
          id
          body
          fields {
            slug
            modified
          }
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  }
  `)

	const posts = result.data.allMdx.edges
	// We'll call `createPage` for each result
	posts.forEach(({node}) => {
		const template = path.resolve('./src/templates/page.jsx')

		const articlePathRaw = node.fileAbsolutePath.replace(articleDir, '').replace(/.mdx$/, '')
		const articlePath = articlePathRaw.match(/index$/) ? articlePathRaw.replace(/index$/, '') : articlePathRaw

		console.log(`created ${articlePath}`)
		// console.log(node.fields.slug, component)
		createPage({
			// This is the slug we created before
			// (or `node.frontmatter.slug`)
			path: articlePath,
			// This component will wrap our MDX content
			component: template,
			// We can use the values in this context in
			// our page layout component
			context: node,
		})
	})
}

function onCreateNode({node, actions}) {
	const {createNodeField} = actions
	// We only want to operate on `Mdx` nodes. If we had content from a
	// remote CMS we could also check to see if the parent node was a
	// `File` node here
	if (node.internal.type === 'Mdx') {
		// console.log(node)
		createNodeField({
			// Name of the field you are adding
			name: 'slug',
			// Individual MDX node
			node,
			// Generated value based on filepath with "blog" prefix. We
			// don't need a separating "/" before the value because
			// createFilePath returns a path with the leading "/".
			value: getPath(node),
		})

		// console.log(node)
		console.log(node.fileAbsolutePath)

		const {mtime: modified} = fs.statSync(node.fileAbsolutePath)
		createNodeField({
			name: 'modified',
			node,
			value: format(modified, 'do MMM, yyyy'),
		})
	}
}

module.exports = {
	createPages,
	onCreateNode,
}

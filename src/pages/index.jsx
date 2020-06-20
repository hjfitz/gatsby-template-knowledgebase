import React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'

import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/seo'

const pageQuery = graphql`
  query AllToplevelPosts {
    allMdx(filter: {fileAbsolutePath: {regex: "/\/articles\/[a-zA-Z0-9]+\/index.mdx/"}}) {
      edges {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
        }
      }
    }
    directory {
      dir
    }
    site {
      siteMetadata {
        articleDir
      }
    }
  }
`

const IndexPage = () => {
	const data = useStaticQuery(pageQuery)
	const articleDir = `${data.directory.dir}/${data.site.siteMetadata.articleDir}`
	return (
		<Layout>
			<SEO title="Home" />
			<h1 className="text-4xl p-4">Home</h1>
			<ul className="grid grid-cols-12">
				{data.allMdx.edges.map((page) => {
					const articlePathRaw = page.node.fileAbsolutePath.replace(articleDir, '').replace(/.mdx$/, '')
					const articlePath = articlePathRaw.match(/index$/) ? articlePathRaw.replace(/index$/, '') : articlePathRaw
					return (
						<li className="hover:bg-blue-100 m-4 col-span-4 text-center border box-content rounded" key={articlePath}>
							<Link className="h-full w-full block p-4" to={articlePath}>{page.node.frontmatter.title}</Link>
						</li>
					)
				})}
			</ul>
		</Layout>
	)
}

export default IndexPage

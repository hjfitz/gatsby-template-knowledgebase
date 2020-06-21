import React from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'
import {normalise} from '../util'

const navQuery = graphql`
	query NavQuery {
		directory {
			dir
		}
		site { 
			siteMetadata {
				articleDir
			}
		}
		allMdx {
			edges {
				node {
					frontmatter {
						title
					}
					fileAbsolutePath
				}
			}
		}
	}
`

const Navigation = () => {
	const data = useStaticQuery(navQuery)
	const articleDir = `${data.directory.dir}/${data.site.siteMetadata.articleDir}`
	const {pathname} = window.location
	const pathArr = pathname.split('/').filter(Boolean)

	const curLevel = pathArr.length

	const hierarchy = data.allMdx.edges
		.map((edge) => {
			const articlePathRaw = edge.node.fileAbsolutePath.replace(articleDir, '').replace(/.mdx$/, '')
			const articlePath = articlePathRaw.match(/index$/) ? articlePathRaw.replace(/index$/, '') : articlePathRaw
			return {path: articlePath, title: edge.node.frontmatter.title}
		})
		.filter((page) => {
			const topLevel = page.path.split('/').filter(Boolean).length === 1
			const pathIdx = `/${pathArr.join('/')}`
			const prevPath = pathArr.slice(0, pathArr.length - 1).join('/')
			const lvl = page.path.split('/').filter(Boolean).length
			return (
				(pathArr.length === 0 && topLevel) // are we on home?
				|| (
					(page.path.indexOf(pathIdx) === 0 && pathname !== '/') // are they children of the current page?
					&& (lvl <= curLevel + 1) // are they the next children (eg not grandchildren)
				)
				|| normalise(prevPath) === normalise(page.path)
			)
		})
		.map((page) => ({selected: window.location.pathname === page.path, ...page}))
		.sort((a, b) => a.path.length - b.path.length)

	hierarchy.unshift({path: '/', title: 'Home'})

	return (
		<aside className="col-span-3">
			<nav className="border-r-2 box-content h-full">
				<ul>
					{hierarchy.map((edge) => (
						<li key={edge.path}>
							<Link className="hover:bg-blue-100 py-1 px-4 h-full w-full block" to={edge.path}>
								{edge.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}

export default Navigation

import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import './header.scss'

const getBreadcrumbPath = (index, arr) => `/${arr.slice(0, index + 1).join('/')}`

const Header = () => {
	const {site} = useStaticQuery(
		graphql`
			query HeaderQuery {
				site {
					siteMetadata {
						siteName
					}
				}
			}`
		,
	)

	const breadcrumbArr = window.location.pathname
		.split('/')
		.filter(Boolean)
		.map((el) => el.replace(/-/g, ' ').toLowerCase())

	const breadcrumb = breadcrumbArr.map((str, idx) => <li className="crumb" key={str}><Link to={getBreadcrumbPath(idx, breadcrumbArr)}>{str}</Link></li>)
	if (breadcrumb.length) breadcrumb.unshift(<li className="crumb" key="home"><Link to="/">home</Link></li>)
	return (
		<header className="grid grid-cols-12 p-4 border-b-2">
			<div className="col-span-3">{site.siteMetadata.siteName}<span className="text-blue-600">{'{dev}'}</span></div>
			<div className="col-span-9">
				<ul className="flex">{breadcrumb}</ul>
			</div>
		</header>
	)
}

export default Header

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'

import Navigation from '../Navbar/Navbar'
import Header from '../Header/Header';

const Layout = ({children}) => (
	<>
		<Header />
		<div className="grid grid-cols-12 h-full">
			<Navigation />
			<main className="col-span-9">{children}</main>
		</div>
	</>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout

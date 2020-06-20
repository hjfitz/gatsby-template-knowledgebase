import React from 'react'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import {MDXProvider} from '@mdx-js/react'

const P = (props) => <p className="" {...props} />
const LI = (props) => <li className="list-disc list-inside" {...props} />

const H1 = (props) => <h1 {...props} className="text-4xl" />
const H2 = (props) => <h2 {...props} className="text-3xl" />
const H3 = (props) => <h3 {...props} className="text-2xl" />
const H4 = (props) => <h4 {...props} className="text-xl" />
const H5 = (props) => <h5 {...props} className="text-lg" />

// yup
const components = {
	p: P,
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	li: LI,
}

const ArticleRenderer = ({children}) => (
	<MDXProvider components={components}>
		<MDXRenderer>{children}</MDXRenderer>
	</MDXProvider>
)

export default ArticleRenderer

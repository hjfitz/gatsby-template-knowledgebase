import React from 'react';
import ArticleRenderer from './mdx-components'
import SEO from '../components/SEO/seo';
import Layout from '../components/Layout/Layout';

import './style.scss';

const Page = (data) => (
	<Layout>
		<article className="m-4">
			<h1 className="text-5xl">{data.pageContext.frontmatter.title}</h1>
			<div className="text-sx"><strong>Last updated: </strong>{data.pageContext.fields.modified}</div>
			<SEO title={data.pageContext.frontmatter.title} />
			<ArticleRenderer>{data.pageContext.body}</ArticleRenderer>
		</article>
	</Layout>
)

export default Page;

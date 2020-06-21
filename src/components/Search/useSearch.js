import {graphql, useStaticQuery} from 'gatsby'
import fuzzysort from 'fuzzysort'
import clearMd from 'remove-markdown'

export default function useSearch() {
	// const [results, setResults] = useState([])
	const allPages = graphql`
	{
  allMdx {
    edges {
      node {
        frontmatter {
          title
        }
        fileAbsolutePath
        rawBody
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
	const data = useStaticQuery(allPages)
	const articleDir = `${data.directory.dir}/${data.site.siteMetadata.articleDir}`

	const searchable = data.allMdx.edges.map((edge) => {
		const articlePathRaw = edge.node.fileAbsolutePath.replace(articleDir, '').replace(/.mdx$/, '')
		const articlePath = articlePathRaw.match(/index$/) ? articlePathRaw.replace(/index$/, '') : articlePathRaw
		const bodyNoFrontmatter = clearMd(edge.node.rawBody.replace(/^(-){3,}\n(.|\n)*\n(-){3,}/, ''))
		console.log({bodyNoFrontmatter})

		return {
			path: articlePath,
			title: edge.node.frontmatter.title,
			body: bodyNoFrontmatter,
		}
	})

	const doSearch = (query) => fuzzysort.go(query, searchable, {
		keys: ['title', 'body'],
		threshold: -4000,
		// Create a custom combined score to sort by. -100 to the desc score makes it a worse match
		//   scoreFn(a) => Math.max(a[0]?a[0].score:-1000, a[1]?a[1].score-100:-1000)
	})

	return doSearch
}

import React, {useState} from 'react'
import fuzzysort from 'fuzzysort'
import {Link} from 'gatsby'
import useSearch from './useSearch'

const Search = ({className}) => {
	const [results, setResults] = useState([])
	const [shown, setShow] = useState(true)
	const showResults = () => setShow(true)
	const hideResults = () => {
		setTimeout(() => setShow(false), 500)
	}
	const search = useSearch()
	const doSearch = (ev) => {
		const searchResults = search(ev.target.value)
		if (!searchResults.length) {
			setResults([])
			return
		}
		const highlighted = searchResults.map((resArr) => {
			const hltd = resArr.map((res) => {
				if (res?.target) res.target = res.target.slice(0, 50)
				return fuzzysort.highlight(res, '<span class="text-red-400">', '</span>')
			})
			return {
				title: <span dangerouslySetInnerHTML={{__html: hltd[0] || resArr.obj.title}} />,
				body: <span dangerouslySetInnerHTML={{__html: hltd[1] || resArr.obj.body}} />,
				path: resArr.obj.path,
				obj: resArr.obj,
			}
		}).map((result) => (
			<li className="hover:bg-blue-100 p-1" key={result.path}>
				<Link to={result.path}>
					<header className="text-sm"><p>{result.title}</p></header>
					<p className="text-xs">{result.body}</p>
				</Link>
			</li>
		))
		setResults(highlighted)
	}
	return (
		<div className={className}>
			<div className="relavive">
				<form action="#" autoComplete="off">
					<input autoComplete="off" onFocus={showResults} onBlur={hideResults} onChange={doSearch} className="max-w-full py-1 px-2 border rounded-sm" id="search-box" type="text" placeholder="search" />
				</form>
				{(!!results.length && shown) && (
					<ul className="absolute border bg-white divide-y divide-blue-300 w-56">
						{results}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Search

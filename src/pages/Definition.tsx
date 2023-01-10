import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DefinitionSearch from "../components/DefinitionSearch";
import NotFound from "../components/NotFound";

export default function Definition() {
	const [word, setWord] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [error, setError] = useState(false);

	let { search } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
		// const url = "https://httpstat.us/401";
		fetch(url)
			.then((res) => {
				// console.log(res.status);
				if (res.status === 404) {
					setNotFound(true);
				} else if (res.status === 401) {
					navigate("/login");
				} else if (!res.ok) {
					setError(true);
					throw new Error("Something not OK!");
				}

				return res.json();
			})
			.then((data) => {
				// console.log(data[0].meanings);
				setWord(data[0].meanings);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	if (notFound) {
		return (
			<>
				<NotFound />
				<Link to="/dictionary">Search another</Link>
			</>
		);
	}

	if (error) {
		return (
			<>
				<p>There was some error</p>
				<Link to="/dictionary">Search another</Link>
			</>
		);
	}

	return (
		<>
			{word.length > 0 ? (
				<>
					<h1>Here is Definition: </h1>
					{word.map((meaning: any) => {
						return (
							<p key={uuidv4()}>
								{meaning.partOfSpeech} : {meaning.definitions[0].definition}
							</p>
						);
					})}
				</>
			) : null}
			<p>Search again</p>
			<DefinitionSearch />
		</>
	);
}

import { useEffect, useState } from "react";

export default function Dictionary() {
	const [word, setWord] = useState("");
	const [word2, setWord2] = useState("");


    // executes on page load and every time state is changed
    // we can specify about what state it cares (dependency array)
	useEffect(() => {
		console.log("state updated", word);
	}, [word]);

    useEffect(() => {
		console.log("word2 is ", word2);
	}, [word2]);

    // 3 ways: 
    // 1. -- no dependency array
    // 2. -- empty dependency array (called only on page load)
    // 3. -- specified dependency array 
    // (example: if it takes only word, it DOES NOT guarantee for word2 to be up to date)



	return (
		<>
			<input
				type="text"
				onChange={(e) => {
					setWord(e.target.value);
				}}
			/>
			<h2>Lets get the definition for {word}</h2>
			<input
				type="text"
				onChange={(e) => {
					setWord2(e.target.value);
				}}
			/>
			<h2>Lets get the definition for {word2}</h2>
		</>
	);
}

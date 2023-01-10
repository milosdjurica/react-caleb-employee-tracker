import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
	const [word, setWord] = useState("");

	const navigate = useNavigate();

	return (
		<>
			<input
				type="text"
				onChange={(e) => {
					setWord(e.target.value);
				}}
			/>
			<button
				className="m-2 bg-blue-500 text-white"
				onClick={() => {
					navigate("/definition/" + word);
				}}
			>
				Search
			</button>
		</>
	);
}

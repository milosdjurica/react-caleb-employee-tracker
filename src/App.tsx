import "./App.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
	const showEmployees = true;

	const [devRole, setDevRole] = useState<string>();

	return (
		<div className="App bg-red-300">
			{showEmployees ? (
				<>
					<input
						type="text"
						onChange={(e) => {
							setDevRole(e.target.value);
						}}
					/>
					<Employee name="Caleb" role="Intern" />
					<Employee name="John" role={devRole} />
					<Employee name="Sam" />
				</>
			) : (
				<p>You cant see employees</p>
			)}
		</div>
	);
}

export default App;

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/modals/AddEmployee";
import Employee from "../components/Employee";
import "../App.css";
import EditEmployee from "../components/modals/EditEmployee";

function Employees() {
	const showEmployees = true;

	const [employees, setEmployees] = useState([
		{
			id: "1",
			name: "John",
			role: "Director",
			img: "https://images.unsplash.com/photo-1669719468229-44c8e3e5c09e",
		},
		{
			id: 2,
			name: "Sam",
			role: "Manager",
			img: "https://images.unsplash.com/photo-1669719468229-44c8e3e5c09e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80",
		},
		{
			id: 3,
			name: "Samantha",
			role: "Intern",
			img: "https://images.unsplash.com/photo-1669993427100-221137cc7513",
		},
		{
			id: 4,
			name: "Layla",
			role: "HR",
			img: "https://images.pexels.com/photos/6864497/pexels-photo-6864497.jpeg",
		},
		{
			id: 5,
			name: "Marc",
			role: "intern",
			img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
		},
		{
			id: 6,
			name: "Sam",
			img: "https://images.unsplash.com/photo-1669719468229-44c8e3e5c09e",
		},
	]);

	function createEmployee(name: any, role: any, img: any) {
		let newEmployee = {
			id: uuidv4(),
			name,
			role,
			img,
		};

		setEmployees([...employees, newEmployee]);
	}

	function updateEmployee(id: any, newName: any, newRole: any) {
		const updatedEmployees = employees.map((el) => {
			if (id === el.id) {
				return { ...el, name: newName, role: newRole };
			}
			return el;
		});
		setEmployees(updatedEmployees);
	}

	return (
		<div>
			{showEmployees ? (
				<>
					<div className="flex flex-wrap justify-center ">
						{employees.map((el) => {
							const editEmployee = (
								<EditEmployee
									id={el.id}
									name={el.name}
									role={el.role}
									updateEmployee={updateEmployee}
								/>
							);

							return (
								<Employee
									key={uuidv4()}
									id={el.id}
									name={el.name}
									role={el.role}
									img={el.img}
									editEmployee={editEmployee}
								/>
							);
						})}
					</div>
					<AddEmployee createEmployee={createEmployee} />
				</>
			) : (
				<p>You cant see employees</p>
			)}
		</div>
	);
}

export default Employees;

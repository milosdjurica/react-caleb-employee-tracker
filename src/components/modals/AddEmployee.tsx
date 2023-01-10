import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddEmployee(props: any) {
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const [img, setImg] = useState("");

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<button
				className="block mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleShow}
			>
				+ Add Employee
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={(e) => {
							// preventing page refresh
							e.preventDefault();
                            setName('')
                            setRole('')
                            setImg('')
							// ne moram da pravim stateVariable za ID
							// zato sto ga ne menjam
							props.createEmployee(name, role, img);

						}}
						id="editmodal"
						className="w-full max-w-sm"
					>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="inline-full-name"
								>
									Name
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="inline-full-name"
									placeholder="Caleb"
									type="text"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="role"
								>
									Role
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="role"
									placeholder="Manager"
									type="text"
									value={role}
									onChange={(e) => {
										setRole(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="img"
								>
									Image URL
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="img"
									placeholder="https://google.com"
									type="text"
									value={img}
									onChange={(e) => {
										setImg(e.target.value);
									}}
								/>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={handleClose}
						className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
					>
						Close
					</button>
					<button
						form="editmodal"
						onClick={handleClose}
						className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
					>
						Add
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddEmployee;

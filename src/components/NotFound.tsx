export default function NotFound(props: any) {
	return (
		<>
			<p>{props.message}</p>
			<p>{props.statusCode}</p>
			<p> Page was not found</p>
		</>
	);
}

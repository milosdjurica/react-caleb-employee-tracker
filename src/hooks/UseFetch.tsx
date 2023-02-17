import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) throw res.status;
                return res.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setErrorStatus(err);
            });
    }, []);

    return [data, errorStatus];
}

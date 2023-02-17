import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useFetch(
    url: string,
    { method, headers, body }: any = {}
) {
    const [data, setData] = useState<any>();
    const [errorStatus, setErrorStatus] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    function request() {
        fetch(url, {
            method,
            headers,
            body,
        })
            .then((res) => {
                if (res.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!res.ok) throw res.status;

                return res.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setErrorStatus(err);
            });
    }

    function appendData(newData: any) {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newData),
        })
            .then((res) => {
                if (res.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!res.ok) throw res.status;
                return res.json();
            })
            .then((d) => {
                const newState = data;
                newState.push(d);
                setData(newState);
            })
            .catch((e) => {
                setErrorStatus(e);
            });
    }

    return { request, appendData, data, errorStatus };
}

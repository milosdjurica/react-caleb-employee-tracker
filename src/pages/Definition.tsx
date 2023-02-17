import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DefinitionSearch from "../components/DefinitionSearch";
import NotFound from "../components/NotFound";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
    let { search } = useParams();

    const [data, errorStatus]: any = useFetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
    );

    if (errorStatus === 404) {
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    if (errorStatus) {
        return (
            <>
                <p>There was some server error. Try again later</p>
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    return (
        <>
            {data?.[0]?.meanings ? (
                <>
                    <h1>Here is Definition: </h1>
                    {data[0].meanings.map((meaning: any) => {
                        return (
                            <p key={uuidv4()}>
                                {meaning.partOfSpeech} :{" "}
                                {meaning.definitions[0].definition}
                            </p>
                        );
                    })}
                    <p>Search again</p>
                    <DefinitionSearch />
                </>
            ) : null}
        </>
    );
}

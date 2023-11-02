export function ProfilePage() {

    const {loading, error, data} = useLoading(
        async () => fetchJSON("/api/profile")
    );

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>
            <h1>Error</h1>
            <div>{error.toString()}</div>
        </div>
    }


    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching the profile data
    }

    console.log(data)

    return <div>
        <h1>Your profile : {data.username}</h1>
    </div>
}


function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {

        try {
            setLoading(true);
            setData(await loadingFunction())
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [])

    return {loading, error, data, reload: load}
}

async function fetchJSON(url) {

    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Failed to load ${res.status} : ${res.statusText}`)
    }

    return await res.json();
}


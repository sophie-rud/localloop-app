async function withLoadingAndError(setState, asyncFunction) {
    setState((state) => ({...state, loading: true, error: null}));
    try {
        return await asyncFunction();
    } catch (err) {
        setState((state) => ({...state, error: err.message || err}));
        throw err;
    } finally {
        setState((state) => ({...state, loading: false}));
    }
}

export default withLoadingAndError;
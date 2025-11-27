async function withLoadingAndError(setState, asyncFunction) {
    setState((state) => ({...state, loading: true, error: null}));
    try {
        await asyncFunction();
    } catch (err) {
        setState((state) => ({...state, error: err.message || err}));
    } finally {
        setState((state) => ({...state, loading: false}));
    }
}

export default withLoadingAndError;
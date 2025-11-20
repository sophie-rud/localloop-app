async function withLoadingAndError(setState, asyncFunction) {
    setState({loading: true, error: null});
    try {
        await asyncFunction();
    } catch (err) {
        setState({error: err.message || err});
    } finally {
        setState({loading: false});
    }
}

export default withLoadingAndError;
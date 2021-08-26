import React, {useEffect} from "react";
import {createStructuredSelector} from "reselect";
import {
    selectIsLayoutFetching,
    selectTheme,
} from "./redux/base/layout/layout.selector";
import {connect} from "react-redux";
import Spinner from "./components/base/spinner/spinner.component";
import {fetchLayoutStartAsync, removeError} from "./redux/base/layout/layout.actions";
import Wrapper from "./components/base/wrapper/wrapper.component";

const App = ({currentTheme, fetchLayoutStartAsync, isFetching}) => {

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("persist:root"));
        if (!storage) {
            fetchLayoutStartAsync();
        }
        if (storage) {
            const layoutData = JSON.parse(storage.layout);
            if (!layoutData.items.length) {
                fetchLayoutStartAsync();
            } else {
                removeError()
            }
        }
    }, [currentTheme, fetchLayoutStartAsync]);

    return isFetching ? <Spinner/> : <Wrapper/>;
};

const mapStateToProps = createStructuredSelector({
    currentTheme: selectTheme,
    isFetching: selectIsLayoutFetching,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLayoutStartAsync: () => dispatch(fetchLayoutStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

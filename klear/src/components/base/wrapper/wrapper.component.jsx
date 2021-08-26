import React from "react";
import {connect} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import MainRouter from "../main-router/main-router.component";
import {createMuiTheme} from "@material-ui/core/styles";
import {createStructuredSelector} from "reselect";
import {selectTheme} from "../../../redux/base/layout/layout.selector";

const Wrapper = ({currentTheme}) => {

    const GlobalTheme = createMuiTheme(currentTheme);

    return (
        <ThemeProvider theme={GlobalTheme}>
            <MainRouter />
        </ThemeProvider>
    )
};

const mapStateToProps = createStructuredSelector({
    currentTheme: selectTheme
});

export default connect(mapStateToProps, null)(Wrapper);
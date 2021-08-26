import React from "react";
import {CssBaseline} from '@material-ui/core';
import Topbar from "../topbar/topbar.component";
import Sidebar from "../sidebar/sidebar.component";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import useStyles from "./main-router.style";
import {createStructuredSelector} from "reselect";
import {selectLayoutError} from "../../../redux/base/layout/layout.selector";
import {connect} from "react-redux";
import CustomAlert from "../custom-alert/custom-alert.component";
import HomePage from "../../../pages/base/homepage/homepage.page";
import SettingsPage from "../../../pages/base/settings/settings.page";

const MainRouter = ({layoutError}) => {

    const classes = useStyles();

    return (
        <div className={classes.flex}>
            <CssBaseline/>
            <Topbar/>
            <Sidebar/>
            {layoutError && <CustomAlert message={layoutError} severity='error' />}
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <ErrorBoundary>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/settings" component={SettingsPage}/>
                    </ErrorBoundary>
                </Switch>
            </main>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    layoutError: selectLayoutError
})

export default connect(mapStateToProps)(MainRouter);
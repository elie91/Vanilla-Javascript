import React from "react";
import useStyles from "./settings.style";
import {Link} from "react-router-dom";
import {Route} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {AppBar, Typography, Toolbar} from '@material-ui/core';

import GlobalSettings from "../../../components/base/global-settings/global-settings.component";
import ColorsSettings from '../../../components/base/colors-settings/colors-settings.component';
import MenuSettings from '../../../components/base/menu-settings/menu-settings.component';
import FontSettings from '../../../components/base/font-settings/font-settings.component';
import DatagridSettings from '../../../components/base/datagrid-settings/datagrid-settings.component';

const SettingsPage = () => {

    const classes = useStyles();

    const {t} = useTranslation();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Link to='/settings'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('settings.general')}
                        </Typography>
                    </Link>
                    <Link to='/settings/colors'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('settings.colorManagement')}
                        </Typography>
                    </Link>
                    <Link to='/settings/typography'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('settings.policeManagement')}
                        </Typography>
                    </Link>
                    <Link to='/settings/menu'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('settings.menuManagementNav')}
                        </Typography>
                    </Link>
                    <Link to='/settings/datagrid'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('settings.datagridManagementNav')}
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Route exact
                   path='/settings'
                   component={GlobalSettings}
            />
            <Route exact
                   path='/settings/colors'
                   component={ColorsSettings}
            />
            <Route exact
                   path='/settings/menu'
                   component={MenuSettings}
            />
            <Route exact
                   path='/settings/typography'
                   component={FontSettings}
            />
            <Route exact
                   path='/settings/datagrid'
                   component={DatagridSettings}
            />
        </div>

    )
};


export default SettingsPage;
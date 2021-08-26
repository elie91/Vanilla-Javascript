import React from "react";
import {createStructuredSelector} from 'reselect';
import {
    selectApplicationName,
    selectDrawerOpen, selectLanguage,
    selectLogo,
    selectTopbarItems
} from '../../../redux/base/layout/layout.selector';
import {connect} from 'react-redux';
import {toggleDrawer, toggleDarkTheme, changeLanguage} from '../../../redux/base/layout/layout.actions';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from "./topbar.style";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {Select, FormControl, MenuItem, IconButton, Button, Typography, Toolbar, AppBar} from '@material-ui/core';
import {useTranslation} from "react-i18next";
import TopbarItem from "../topbar-item/topbar-item.component";


const Topbar = ({applicationName, logo, items, language, drawerOpen, toggleDrawer, changeLanguage}) => {

    const classes = useStyles();
    const {t, i18n} = useTranslation();

    const handleChange = event => {
        changeLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    return (
        <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: drawerOpen})}>
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: drawerOpen
                    })}
                >
                    <MenuIcon/>
                </IconButton>

                <Link to='/' className={classes.grow}>
                    <Typography variant="h6" className={classes.title} noWrap>
                        {applicationName}
                    </Typography>
                </Link>
                {/*<Link to='/'>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <DynamicIcon icon={logo} />
                    </IconButton>
                </Link>*/}
                <FormControl className={classes.formControl}>
                    <Select
                        value={language}
                        displayEmpty
                        labelId="language"
                        id="language"
                        onChange={handleChange}
                        className={classes.select}
                    >
                        <MenuItem value='fr'>{t('language.fr')}</MenuItem>
                        <MenuItem value='en'>{t('language.en')}</MenuItem>
                    </Select>
                </FormControl>

                {items.map((item, index) => <TopbarItem item={item} key={index}/>)}

                <Button className={classes.topAndSideText}>{t('login')}</Button>

            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = createStructuredSelector({
    applicationName: selectApplicationName,
    logo: selectLogo,
    items: selectTopbarItems,
    drawerOpen: selectDrawerOpen,
    language: selectLanguage
});

const mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch(toggleDrawer()),
    toggleTheme: () => dispatch(toggleDarkTheme()),
    changeLanguage: lang => dispatch(changeLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

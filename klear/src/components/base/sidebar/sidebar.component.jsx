import React from 'react';
import {connect} from 'react-redux';
import useStyles from "./sidebar.style";
import {createStructuredSelector} from "reselect";
import {
    selectDrawerOpen,
    selectIsDrawerOpenOnFocus,
    selectMenuItems
} from "../../../redux/base/layout/layout.selector";
import {toggleDrawer} from "../../../redux/base/layout/layout.actions";
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SidebarItem from "../sidebar-item/sidebar-item.component";
import {IconButton, Divider, Drawer} from '@material-ui/core';

const Sidebar = ({drawerOpen, sidebarItems, toggleDrawer, drawerOnFocus}) => {

    const classes = useStyles();

    return (
        <div className={classes.index} onMouseOver={() => drawerOnFocus ? toggleDrawer(true) : ''}
             onMouseLeave={() => drawerOnFocus ? toggleDrawer(false) : ''}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                {
                    sidebarItems.map((item, index) => <SidebarItem item={item} key={index}/>)
                }
            </Drawer>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    drawerOpen: selectDrawerOpen,
    sidebarItems: selectMenuItems,
    drawerOnFocus: selectIsDrawerOpenOnFocus,
});

const mapDispatchToProps = dispatch => ({
    toggleDrawer: state => dispatch(toggleDrawer(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
import React, {useEffect} from "react";
import DynamicIcon from "../dynamic-icon/dynamic-icon.component";
import {Link} from "react-router-dom";
import {toggleDarkTheme} from "../../../redux/base/layout/layout.actions";
import {connect} from "react-redux";
import useStyles from "./layout-item.style";
import {createStructuredSelector} from "reselect";
import {selectNestedItems} from "../../../redux/base/layout/layout.selector";
import {ListItem, ListItemText, IconButton} from '@material-ui/core';


const LayoutItem = ({item, isSidebarItem, withPadding, toggleTheme, layoutItems}) => {

    const classes = useStyles();

    useEffect(() => {
    }, [layoutItems]);

    const switchActions = action => {
        switch (action) {
            case 'toggleTheme':
                return toggleTheme();
            default:
                return ''
        }
    }

    if (item.hasOwnProperty('Action') && item.Action !== '') {
        return (
            isSidebarItem ?
                <ListItem button style={{paddingLeft: withPadding ? '25px' : '16px'}}>
                    <IconButton edge="start" className={classes.logo} onClick={() => switchActions(item.Action)} color="inherit" aria-label="menu">
                        <DynamicIcon icon={item.Icon}/>
                    </IconButton>
                    <ListItemText className={classes.listItemText} primary={item.Label}/>
                </ListItem> :
                <IconButton edge="start" onClick={() => switchActions(item.Action)} className={classes.menuButton}
                            color="inherit" aria-label="menu">
                    <DynamicIcon icon={item.Icon}/>
                </IconButton>

        )
    } else {
        return (
            <Link to={item.Path}>
                {
                    isSidebarItem ?
                        <ListItem button style={{paddingLeft: withPadding ? '25px' : '16px'}}>
                            <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu">
                                <DynamicIcon icon={item.Icon}/>
                            </IconButton>
                            <ListItemText className={classes.listItemText} primary={item.Label}/>
                        </ListItem> :

                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <DynamicIcon icon={item.Icon}/>
                        </IconButton>
                }
            </Link>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layoutItems: selectNestedItems
});

const mapDispatchToProps = dispatch => ({
    toggleTheme: () => dispatch(toggleDarkTheme())
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LayoutItem));
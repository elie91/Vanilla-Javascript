import React, {useEffect, useState} from "react";
import DynamicIcon from "../dynamic-icon/dynamic-icon.component";
import LayoutItem from "../layout-item/layout-item.component";
import {createStructuredSelector} from "reselect";
import {selectIsItemsOpenOnFocus, selectItems} from "../../../redux/base/layout/layout.selector";
import {connect} from "react-redux";
import useStyles from "./sidebar-item.style";
import {List, Collapse, ListItemText, IconButton, ListItem} from '@material-ui/core';

const SidebarItem = ({item, itemsOnFocus, layoutItems}) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
    }, [layoutItems])

    if (item.hasOwnProperty('MenuSubItems') && item.MenuSubItems.length > 0) {
        return <React.Fragment>
            <ListItem button onClick={() => setOpen(!open)}
                      onMouseOver={() => itemsOnFocus ? setOpen(true) : ''}
                      onMouseLeave={() => itemsOnFocus ? setTimeout(() => setOpen(false), 2000) : ''}>

                <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu">
                    <DynamicIcon icon={item.Icon}/>
                </IconButton>
                <ListItemText className={classes.listItemText} primary={item.Label}/>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.MenuSubItems.map((item, index) => {
                        return <LayoutItem key={index} item={item} isSidebarItem={true} withPadding={true}/>
                    })}
                </List>
            </Collapse>
        </React.Fragment>

    } else {
        return <LayoutItem key={item.Id} item={item} isSidebarItem={true} withPadding={false}/>
    }
}

const mapStateToProps = createStructuredSelector({
    itemsOnFocus: selectIsItemsOpenOnFocus,
    layoutItems: selectItems
});

export default connect(mapStateToProps)(SidebarItem);
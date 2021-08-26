import React, {useEffect} from "react";
import LayoutItem from "../layout-item/layout-item.component";
import DynamicIcon from "../dynamic-icon/dynamic-icon.component";
import useStyles from "./topbar-item.style";
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectIsItemsOpenOnFocus, selectNestedItems} from "../../../redux/base/layout/layout.selector";
import {connect} from "react-redux";
import { MenuItem, Menu } from '@material-ui/core';

const TopbarItem = ({item, layoutItems, isOpenOnFocus}) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {

    }, [layoutItems])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuOver = event => {
        if(!isOpenOnFocus) return;
        setAnchorEl(event.currentTarget);
        setTimeout(() => setAnchorEl(null), 2000)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (item.hasOwnProperty('MenuSubItems')) {
        return (
            <div>
                <div onClick={handleMenu} onMouseOver={handleMenuOver} className={classes.menuButton}>
                    <DynamicIcon icon={item.Icon}/>
                </div>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {item.MenuSubItems.map((subItem, index) => {
                        return (
                            <MenuItem key={index} className={classes.color} onClick={handleClose}>
                                <Link to={subItem.Path} className={classes.color} >
                                    {subItem.Label}
                                </Link>
                            </MenuItem>
                        )
                    })}
                </Menu>
            </div>
        )
    } else {
        return <LayoutItem item={item} key={item.Id} isSidebarItem={false} withPadding={false}/>
    }
}

const mapStateToProps = createStructuredSelector({
    layoutItems: selectNestedItems,
    isOpenOnFocus: selectIsItemsOpenOnFocus
});

export default connect(mapStateToProps, null)(TopbarItem);
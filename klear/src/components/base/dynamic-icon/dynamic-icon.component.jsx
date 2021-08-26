import React from "react";
import {createStructuredSelector} from "reselect";
import {selectTheme} from "../../../redux/base/layout/layout.selector";
import {connect} from 'react-redux';
import Icon from '@material-ui/core/Icon'

const DynamicIcon = ({icon, theme, title}) => {

    function fixIconNames(name) {
        if (name === '3dRotation') {
            return 'ThreeDRotation'
        } else if (name === '4k') {
            return 'FourK'
        } else if (name === '360') {
            return 'ThreeSixty'
        }
        return name.toLowerCase();
    }

    const iconName = fixIconNames(icon);

    return (
        <Icon style={{fontSize: theme.typography.iconSize}} title={title}>{iconName}</Icon>
    )
}

const mapStateToProps = createStructuredSelector({
    theme: selectTheme,
});


export default connect(mapStateToProps, null)(React.memo(DynamicIcon));
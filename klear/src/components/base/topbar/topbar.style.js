import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex'
    },
    formControl: {
        marginRight: '20px !important',
        minWidth: '120px !important',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.light,
    },
    title: {
        color: theme.palette.text.light,
        textTransform: "uppercase",
        textDecoration: "none",
        letterSpacing: "3px",
        fontSize: `${theme.typography.fontSize + 5} px`,
        fontWeight: "bold",
    },
    appBar: {
        zIndex: 10,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    grow: {
        flexGrow: 1,
    },
    topAndSideText: {
        color:`${theme.palette.text.light} !important`
    },
    select: {
        '&::before': {
            borderBottom: `2px solid ${theme.palette.text.light} !important`
        },
        color: `${theme.palette.text.light} !important`
    }
}));

export default useStyles;

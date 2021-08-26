import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.light,
    },
    logo: {
        color: theme.palette.text.light,
        display: 'inline-flex',
        minWidth: '70px',
        flexShrink: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    listItemText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: theme.palette.text.light,
        fontSize: theme.typography.fontSize
    },
}));

export default useStyles;
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '50px'
    },
    header: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    table: {
        minWidth: '650px',
        backgroundColor: theme.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light
    },
    title: {
        color: theme.palette.text.dark
    },
    th: {
        color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
    },
    pointer: {
        cursor: 'pointer',
        paddingLeft: '4px'
    }
}));

export default useStyles;
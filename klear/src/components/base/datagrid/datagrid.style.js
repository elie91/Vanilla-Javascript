import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '50px 0'
    },
    colorPrimary: {
        color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        backgroundColor: theme.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light
    },
    toolbar: {
        backgroundColor: theme.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
        color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
    },
    searchContainer: {
        padding: "20px 10px"
    }
}));

export default useStyles;
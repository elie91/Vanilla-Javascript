import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.primary.light,
        height: '100vh'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    flex: {
        display: 'flex',
    },
}));

export default useStyles;
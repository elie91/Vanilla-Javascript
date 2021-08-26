import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.text.dark,
    },
    grid: {
        marginTop: theme.spacing(4)
    },
    form: {
        padding: '0 10px !important',
        width: '100px'
    },
    label: {
        fontSize: theme.typography.fontSize,
        color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
    },
    mt: {
        marginTop: '40px'
    }
}));

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.text.dark,
        marginBottom: theme.spacing(5)
    },
    space: {
        marginTop: theme.spacing(4)
    }
}));

export default useStyles;

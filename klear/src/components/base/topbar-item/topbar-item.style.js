import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.light,
    },
    color: {
        color: theme.palette.text.dark,
    }
}));

export default useStyles;
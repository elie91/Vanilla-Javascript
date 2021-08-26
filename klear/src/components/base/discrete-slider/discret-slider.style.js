import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
    },
    margin: {
        height: theme.spacing(3),
    },
    title : {
        color: `${theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark} !important`
    }
}));

export default useStyles;
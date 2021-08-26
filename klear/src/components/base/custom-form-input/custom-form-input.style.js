import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    form: {
        padding: '0 10px'
    },
    label: {
        fontSize: theme.typography.fontSize,
        color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
    },
    input: {
        color: `${theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark} !important`,
        '&::before': {
            borderBottom: `2px solid ${theme.type === 'light' ? theme.palette.text.dark : theme.palette.text.light} !important`
        },
    }
}));

export default useStyles;
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            'svg' : {
                color: 'white'
            },
        },
        label: {
            color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
        },
        select : {
            '&::before': {
                borderBottom: `2px solid ${theme.type === 'light' ? theme.palette.text.dark : theme.palette.text.light} !important`
            },
            color: theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark
        }
    })
);

export default useStyles;
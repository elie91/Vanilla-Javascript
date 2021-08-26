import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => {
        return ({
            title: {
                marginTop: '50px',
                marginBottom: '50px',
                color: theme.palette.text.dark
            },
            checkbox: {
                color: `${theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark} !important`
            },
            table: {
                minWidth: '650px',
                backgroundColor: theme.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light
            },
            th: {
                color: `${theme.type === 'dark' ? theme.palette.text.light : theme.palette.text.dark} !important`
            },
        })
    })
;

export default useStyles;
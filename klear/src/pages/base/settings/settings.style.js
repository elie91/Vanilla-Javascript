
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        margin: '0 auto'
    },
    appBar: {
        padding: '10px 0'
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-around"
    },
    title: {
        color: theme.palette.text.light,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: theme.typography.fontSize,
        fontWeight: 'bold',
        padding: '0 15px'
    },
}));

export default useStyles;
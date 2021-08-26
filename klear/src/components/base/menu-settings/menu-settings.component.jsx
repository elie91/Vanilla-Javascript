import React, {useState} from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {selectNestedItems} from "../../../redux/base/layout/layout.selector";
import {addLayoutItem, deleteLayoutItem, editLayoutItem} from "../../../redux/base/layout/layout.actions";
import useStyles from "./menu-settings.style";
import AddIcon from '@material-ui/icons/Add';
import SimpleAlertDialog from "../simple-alert-dialog/simple-alert-dialog.component";
import {useTranslation} from "react-i18next";
import {Button, Paper, TableRow, TableHead, TableCell, TableContainer, TableBody, Table, Typography, Grid} from '@material-ui/core';
import MenuSettingsItem from "./menu-settings-item.component";

const MenuSettings = ({nestedItems, addLayoutItem, editLayoutItem, deleteLayoutItem}) => {

    const classes = useStyles();
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleChange = (event, label) => {
        const {value, name} = event.target;
        editLayoutItem({label, name, value});
    }

    const deleteRow = () => {
        setOpen(false);
        deleteLayoutItem(itemToDelete)
    }

    const handleClickOpen = (event, label) => {
        setOpen(true);
        setItemToDelete(label);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {open &&
            <SimpleAlertDialog
                handleSubmit={deleteRow}
                handleCancel={handleClose}>
                {t('button.delete')}
            </SimpleAlertDialog>}

            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        {t('settings.menuManagementTitle')}
                    </Typography>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.th}>Label</TableCell>
                                <TableCell className={classes.th}>Path</TableCell>
                                <TableCell className={classes.th}>Icon</TableCell>
                                <TableCell className={classes.th}>Position</TableCell>
                                <TableCell className={classes.th}>Action</TableCell>
                                <TableCell className={classes.th}>
                                    <Button variant='contained' color='secondary' onClick={addLayoutItem}>
                                        {t('button.add')}
                                        <AddIcon className={classes.pointer}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nestedItems.map((item, index) => {
                                return <MenuSettingsItem classes={classes}
                                                         item={item}
                                                         index={index}
                                                         key={index}
                                                         handleChange={handleChange}
                                                         handleClickOpen={handleClickOpen}/>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    nestedItems: selectNestedItems
});

const mapDispatchToProps = dispatch => ({
    addLayoutItem: () => dispatch(addLayoutItem()),
    editLayoutItem: item => dispatch(editLayoutItem(item)),
    deleteLayoutItem: item => dispatch(deleteLayoutItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuSettings);
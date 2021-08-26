import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomFormInput from "../custom-form-input/custom-form-input.component";
import SimpleSelect from "../simple-select/simple-select.component";
import {MenuItem, TableRow, TableCell} from '@material-ui/core';

const MenuSettingsItem = ({classes, item, index, handleChange, handleClickOpen}) => {

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <CustomFormInput
                    onChange={event => handleChange(event, item.Label)}
                    type="text"
                    id={`Label-${index}`}
                    name='Label'
                    value={item.Label}/>
            </TableCell>
            <TableCell>
                <CustomFormInput
                    onChange={event => handleChange(event, item.Label)}
                    type="text"
                    id={`Path-${index}`}
                    name='Path'
                    value={item.Path}/>
            </TableCell>
            <TableCell>
                <CustomFormInput
                    onChange={event => handleChange(event, item.Label)}
                    type="text"
                    id={`Icon-${index}`}
                    name='Icon'
                    value={item.Icon}/>
            </TableCell>
            <TableCell>
                <SimpleSelect
                    value={item.Position}
                    label='Position'
                    name='Position'
                    id={`Position-${index}`}
                    onChange={event => handleChange(event, item.Label)}>
                    <MenuItem value='Lateral'>Lateral</MenuItem>
                    <MenuItem value='Top'>Top</MenuItem>
                </SimpleSelect>
            </TableCell>
            <TableCell>
                <SimpleSelect
                    value={item.Action ? item.Action : ''}
                    name='Action'
                    id='Action'
                    onChange={event => handleChange(event, item.Label)}>
                    <MenuItem value=''/>
                    <MenuItem value='toggleTheme'>Light / Dark thème</MenuItem>
                </SimpleSelect>
            </TableCell>
            <TableCell>
                <DeleteIcon className={classes.pointer}
                            htmlColor='red'
                            onClick={(event) => handleClickOpen(event, item.Label)}/>
            </TableCell>
        </TableRow>
    )
}

export default React.memo(MenuSettingsItem);
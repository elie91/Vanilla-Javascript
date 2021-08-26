import React from "react";
import {useTranslation} from "react-i18next";
import {DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Button} from '@material-ui/core';

const SimpleAlertDialog = ({title, children, handleSubmit, handleCancel}) => {

    const {t} = useTranslation();
    return (
        <div>
            <Dialog
                open={true}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {title && <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        {t('button.validate')}
                    </Button>
                    <Button onClick={handleCancel} color="primary" autoFocus>
                        {t('button.cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default React.memo(SimpleAlertDialog);
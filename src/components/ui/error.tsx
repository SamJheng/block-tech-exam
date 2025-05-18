import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { error } from "console";
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    errorContent: string;
    errorTitle: string;
    onClose?: () => void;
    closeText?: string;
}
export default function ErrorDailog({isOpen,errorContent,errorTitle,onClose,closeText}: Props) {
    const [open, setOpen] = useState(isOpen);
    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{errorTitle}</DialogTitle>
            <DialogContent>
                {errorContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                    setOpen(false)
                }}>{closeText}</Button>
            </DialogActions>
        </Dialog>
    );
}
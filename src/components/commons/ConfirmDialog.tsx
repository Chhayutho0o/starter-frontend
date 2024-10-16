import React, { forwardRef, useImperativeHandle, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Spinner from "./Spinner";

interface Props {
  title: string;
  description: string;
  confirmAction: () => void;
  trigger?: React.ReactNode;
}

export interface ConfirmationDialogRef {
  open: () => void;
  close: () => void;
}

const ConfirmationDialog = forwardRef<ConfirmationDialogRef, Props>(
  ({ title, description, confirmAction, trigger }, ref) => {
    const t = useTranslations("commons");
    const [open, setOpen] = React.useState(false);
    const [isLoading, setTransition] = useTransition();

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleConfirm = () => {
      setTransition(async () => {
        confirmAction();
        setOpen(false);
      });
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <div onClick={() => setOpen(true)}>{trigger}</div>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleConfirm}>{isLoading ? <Spinner /> : t("continue")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

ConfirmationDialog.displayName = "ConfirmationDialog";

export default ConfirmationDialog;

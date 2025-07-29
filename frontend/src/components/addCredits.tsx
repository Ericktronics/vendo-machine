import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface AddCreditsDialogProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setCashToAdd: (quantity: number) => void;
  buttonTitle?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  actionButtonTitle?: string;
}
export default function AddCreditsDialog({
  handleSubmit,
  setCashToAdd,
  dialogDescription = "Enter the amount of credits you want to add to your account.",
  dialogTitle = "Add Credits",
  actionButtonTitle = "Add Now",
}: AddCreditsDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">+Add Credit</Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="quantity">Credit</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => setCashToAdd(parseInt(e.target.value))}
                min={0}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => closeDialog()}>
              {actionButtonTitle}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

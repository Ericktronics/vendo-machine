/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type FormEvent, type FormEventHandler } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface BuyNowDialogProps {
  chocolates: { id: number; name: string }[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setChocolateName: (name: string) => void;
  setQuantity: (quantity: number) => void;
  buttonTitle?: string;
  buttonVariant?: "default" | "outline";
  dialogTitle?: string;
  dialogDescription?: string;
  actionButtonTitle?: string;
}

export default function CommonDialogForm({
  chocolates,
  handleSubmit,
  setChocolateName,
  setQuantity,
  buttonTitle = "Buy Chocolates",
  buttonVariant = "default",
  dialogTitle = "Available Chocolates",
  dialogDescription = "Select the chocolate you want to buy and enter the quantity you want.",
  actionButtonTitle = "Buy Now",
}: BuyNowDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-around mt-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="chocolate">Chocolate</Label>
              <Select onValueChange={(val) => setChocolateName(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Chocolate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {chocolates.map((chocolate) => (
                      <SelectItem key={chocolate.id} value={chocolate.name}>
                        {chocolate.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
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

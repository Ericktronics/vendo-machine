/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import VendoTable from "./vendoTable";
import { Button } from "@/components/ui/button";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
export interface GetInvetoryResponse extends Response {
  statusCode: number;
  message: string;
  data: chocolateData[];
}

export interface chocolateData {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export interface GetUserBalanceResponse extends Response {
  statusCode: number;
  message: string;
  data: userBalance;
}

export interface userBalance {
  id: number;
  cash: string;
}

const VendoPage = () => {
  const [chocolateName, setChocolateName] = useState("");
  const [cash, setCash] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [chocolates, setChocolates] = useState<chocolateData[]>([]);
  const [balance, setBalance] = useState<userBalance>({
    id: 1,
    cash: "0",
  });

  const handleBuy = async () => {
    try {
      await fetch("http://localhost:3000/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chocolateName,
          cash,
          quantity,
        }),
      });
      setMessage(`✅ Success: ${"Enjoy your chocolate!"}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    const fetchChocolates = async () => {
      try {
        const getInventoryResponse = (await fetch(
          "http://localhost:5500/api/getInventory"
        )) as GetInvetoryResponse;
        const res = (await getInventoryResponse.json()) as GetInvetoryResponse;
        setChocolates(res.data);
      } catch (error) {
        console.error("Error fetching chocolates:", error);
      }
    };

    const getBalance = async () => {
      try {
        const userBalanceResponse = await fetch(
          "http://localhost:5500/api/user-balance"
        );
        const res =
          (await userBalanceResponse.json()) as GetUserBalanceResponse;
        setBalance(res.data);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchChocolates();
    getBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Vendo Machine</h1>
      <div className="w-a p-6 bg-white rounded-lg shadow-md gap-12 flex flex-col">
        <h2>Current Credit: {balance.cash}</h2>
        <div className="flex flex-row items-center justify-center gap-4 m-9">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button>Buy Chocolates</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Aviable Chocolates</DialogTitle>
                  <DialogDescription>
                    Select the chocolate you want to buy and enter the amount of
                    cash you have.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Buy Now</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Add Chocolates</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Restock Chocolate</DialogTitle>
                  <DialogDescription>
                    Select the chocolate you want to buy and enter the amount of
                    cash you have.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Buy Now</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className="w-auto">
          <VendoTable chocolates={chocolates}></VendoTable>
        </div>
      </div>
    </div>
  );
};

export default VendoPage;

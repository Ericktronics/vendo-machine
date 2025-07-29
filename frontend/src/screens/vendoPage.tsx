/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import VendoTable from "../components/vendoTable";
import CommonDialogForm from "@/components/commonDialogForm";
import AddCreditsDialog from "@/components/addCredits";

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
  const [quantity, setQuantity] = useState(0);
  const [cashToAdd, setCashToAdd] = useState(0);
  const [message, setMessage] = useState("");
  const [chocolates, setChocolates] = useState<chocolateData[]>([]);
  const [balance, setBalance] = useState<userBalance>({
    id: 1,
    cash: "0",
  });

  const [changeValue, setChangeValue] = useState(0);

  const handleDynamicApiCall = async (
    endpoint: string,
    body: object,
    method = "PATCH"
  ) => {
    try {
      await fetch(`http://localhost:5500/api/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setChangeValue((prev) => prev + 1);
      setChocolateName("");
      setQuantity(0);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chocolateName || quantity <= 0) return;
    const body = {
      id: chocolates.find((choco) => choco.name === chocolateName)?.id,
      quantity,
    };
    handleDynamicApiCall("buyChocolate", body);
  };

  const handleRestock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chocolateName || quantity <= 0) return;

    const body = {
      id: chocolates.find((choco) => choco.name === chocolateName)?.id,
      quantity,
    };

    handleDynamicApiCall("restockChocolate", body);
  };

  const handleAddCredits = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cashToAdd <= 0) return;
    const body = {
      cash: cashToAdd,
    };
    handleDynamicApiCall("user-balance", body);
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
  }, [changeValue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Vendo Machine</h1>
      <div className="w-a p-6 bg-white rounded-lg shadow-md gap-12 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h2>Current Credit: {balance.cash}</h2>
          <AddCreditsDialog
            handleSubmit={handleAddCredits}
            setCashToAdd={setCashToAdd}
            dialogTitle="Add Credits"
            dialogDescription="Enter the amount of credits you want to add to your account."
            actionButtonTitle="Add Now"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 m-9">
          <CommonDialogForm
            chocolates={chocolates}
            handleSubmit={handleBuy}
            setChocolateName={setChocolateName}
            setQuantity={setQuantity}
            buttonTitle="Buy Chocolates"
            dialogTitle="Available Chocolates"
            dialogDescription="Select the chocolate you want to buy and enter the quantity you want."
            actionButtonTitle="Buy Now"
          />
          <CommonDialogForm
            chocolates={chocolates}
            handleSubmit={handleRestock}
            setChocolateName={setChocolateName}
            setQuantity={setQuantity}
            buttonTitle="Restock Chocolates"
            buttonVariant="outline"
            dialogTitle="Restock Chocolates"
            dialogDescription="Select the chocolate you want to Restock and enter the quantity you want to add. (MAX of 10)"
            actionButtonTitle="Restock Now"
          />
        </div>
        <div className="w-auto">
          <VendoTable chocolates={chocolates}></VendoTable>
        </div>
      </div>
    </div>
  );
};

export default VendoPage;

import React, { useState } from "react";
const VendoPage = () => {
  const [chocolateName, setChocolateName] = useState("");
  const [cash, setCash] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/buy", {
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
    } catch (error: any) {
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Buy Chocolate</h1>

      <input
        type="text"
        placeholder="Chocolate Name"
        className="w-full border p-2 rounded"
        value={chocolateName}
        onChange={(e) => setChocolateName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Cash"
        className="w-full border p-2 rounded"
        value={cash}
        onChange={(e) => setCash(parseFloat(e.target.value))}
      />

      <input
        type="number"
        placeholder="Quantity"
        className="w-full border p-2 rounded"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <button
        onClick={handleBuy}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Buy
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default VendoPage;

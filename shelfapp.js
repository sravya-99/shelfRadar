simport React, { useState } from "react";
import Login from "./Login";
import CustomerPortal from "./CustomerPortal";
import RetailerPortal from "./RetailerPortal";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  if (!user) {
    return <Login onLogin={(username) => setUser(username)} />;
  }

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-6">Choose Role</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
          onClick={() => setRole("customer")}
        >
          Customer
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 m-2 rounded"
          onClick={() => setRole("retailer")}
        >
          Retailer
        </button>
      </div>
    );
  }

  return role === "customer" ? (
    <CustomerPortal username={user} />
  ) : (
    <RetailerPortal username={user} />
  );
}

export default App;

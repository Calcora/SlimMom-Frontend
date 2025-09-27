import { useState } from "react";
import Diary from "./Diary";
import GramCalc from "./GramCalc";
import MainPage from "./MainPage/MainPage";
import Modal from "./Modal";

export default function App() {
  const [view, setView] = useState("main"); 
  const [products, setProducts] = useState([]);
  const [date] = useState(new Date());
  const [dailyRate] = useState(2800);

  const handleAddClick = () => setView("add");

  const handleAdd = (item) => {
    setProducts((prev) => [...prev, item]);
    setView("diary");
  };

  const handleDelete = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBack = () => setView("diary");
  const handleExit = () => setView("main"); 
  const handleMenuClick = () => {
    setView("main");
  };

  
  if (view === "main") {
    return <Modal isOpen={true} onClose={() => setView("diary")} children={<div>Modal Content</div>} />;
  }

  if (view === "diary") {
    return (
      <Diary
        products={products}
        date={date}
        dailyRate={dailyRate}
        onBack={handleBack}
        onExit={handleExit}
        onMenuClick={handleMenuClick}
        onAddClick={handleAddClick}
        onDelete={handleDelete}
      />
    );
  }

  if (view === "add") {
    return (
      <GramCalc
        title="Nic"
        onMenuClick={handleMenuClick}
        onBack={() => setView("diary")}
        onExit={() => setView("diary")}
        onAdd={handleAdd}
        pending={false}
      />
    );
  }

  // Default fallback to MainPage
  return <MainPage />;
}
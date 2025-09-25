import { useState } from "react";
import Diary from "./Diary";
import GramCalc from "./GramCalc";

export default function App() {
  const [view, setView] = useState("diary");
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date());
  const dailyRate = 2800;

  const handleAddClick = () => setView("add");


  const handleAdd = (item) => {
    
    setProducts((prev) => [...prev, item]);
    setView("diary");
  };


  const handleDelete = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  
  const handleBack = () => setView("diary");
  const handleExit = () => setView("diary");
  const handleMenuClick = () => {
    console.log("menu");
  };

  return view === "diary" ? (
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
  ) : (
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

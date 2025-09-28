// App.jsx
import { useState } from "react";
import Diary from "./Diary/Diary";
import GramCalc from "./Diary/GramCalc";
import ResultModal from "./ResultModal";
import Login from "./Login/Login";
import Register from "./Register/Registration";

export default function App() {
  // ---- Global State ----
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dailyRate, setDailyRate] = useState(2800);

  // ---- Handlers ----
  const handleAdd = (item) => {
    // Örn: { name: "Apple", grams: 150 }
    setProducts((prev) => [...prev, item]);
  };

  const handleDelete = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDateChange = (d) => setDate(d);

  // UI-only no-op handler'lar
  const noop = () => {};

  return (
    <div style={{ padding: 16 }}>
      {/* İstersen şimdilik her zaman açık kalsın */}
      <ResultModal />

      {/* Günlük / liste */}
      <Diary
        products={products}
        date={date}
        dailyRate={dailyRate}
        onBack={noop}
        onExit={noop}
        onMenuClick={noop}
        onAddClick={noop} // şu an modal tetiklemiyoruz; hepsi açık
        onAdd={handleAdd}
        onDelete={handleDelete}
        onDateChange={handleDateChange}
      />

      {/* GramCalc formu (ekleme) */}
      <GramCalc
        title="Nic"
        onMenuClick={noop}
        onBack={noop}
        onExit={noop}
        onAdd={handleAdd}
        pending={false}
      />
      <Login />
      <Register />
    </div>
  );
}

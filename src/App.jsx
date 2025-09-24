import "./App.css";
import Diary from "./Diary";
import GramCalc from "./GramCalc";
import Login from "./Login";
import MainPage from "./MainPage/MainPage";
import Register from "./Registration";

function App() {
  return (
    <>
      <MainPage />
      <Login />
      <Register />
      <GramCalc />
      <Diary
        products={[
          { name: "Eggplant", grams: 100, kcalPer100: 320 },
          { name: "Poultry meat", grams: 100, kcalPer100: 480 },
        ]}
        onBack={() => setShowDiary(false)}
        onExit={() => console.log("Exit")}
        onMenuClick={() => console.log("Menu")}
        onAddClick={() => setShowDiary(false)} // + butonu: tekrar GramCalc aç
        onDelete={(i) =>
          setProducts((prev) => prev.filter((_, idx) => idx !== i))
        }
      />
    </>
  );
}

export default App;

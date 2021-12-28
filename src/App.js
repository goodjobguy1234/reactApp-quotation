import logo from "./logo.svg";
import NameList from "./NameList";
import "./App.css";

function App() {
  const s1 = {
    fontSize: "20px",
    textAlign: "left",
    paddingLeft: "10px",
    paddingRight: "10px",
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Quotation</p>
      </header>
      <div className="App-body">
        <h1>Name List</h1>
        <NameList />
      </div>
      <div style={s1}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
}

export default App;

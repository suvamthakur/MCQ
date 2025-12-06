import { useState } from "react";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Solving a medium JS problem (debounce/throttle, deep clone, flatten, promises)",
    },
    {
      id: 2,
      text: "Build a small interactive UI quickly (drag & drop, drawing, forms, animations)",
    },
  ]);

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes}></Notes>
    </div>
  );
}

export default App;

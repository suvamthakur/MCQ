import VirtualizedList from "./VirtualizedList";

const items = Array.from({ length: 1000 }, (_, index) => `Item - ${index + 1}`);
function App() {
  return (
    <div>
      <VirtualizedList width={600} height={600} rows={20} items={items} />
    </div>
  );
}

export default App;

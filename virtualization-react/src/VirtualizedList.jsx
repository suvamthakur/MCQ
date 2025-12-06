import { useState } from "react";

export default function VirtualizedList({
  width = "100%",
  height = 600,
  rows = 20,
  items = [],
}) {
  const ITEM_HEIGHT = height / rows;
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    setStartIndex(newStartIndex);
  };
  const finalItems = items.slice(startIndex, startIndex + rows + 1);

  return (
    <div>
      <div
        style={{
          width,
          height,
          margin: "auto",
          overflow: "auto",
          backgroundColor: "khaki",
        }}
        onScroll={handleScroll}
      >
        <div
          style={{ height: ITEM_HEIGHT * items.length, position: "relative" }}
        >
          {finalItems.map((val, index) => (
            <div
              key={val}
              style={{
                height: ITEM_HEIGHT - 2,
                borderTop: "1px solid black",
                position: "absolute",
                width: "100%",
                top: (startIndex + index) * ITEM_HEIGHT,
              }}
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

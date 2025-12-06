import { useCallback, useMemo, useState } from "react";

function throttle(fn, delay) {
  let timerId = null;
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = null;
        fn(...args);
      }, delay);
    }
  };
}

export default function VirtualizedList({
  width = "100%",
  height = 600,
  rows = 20,
  items = [],
  overscan = 5,
}) {
  const ITEM_HEIGHT = height / rows;
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = useCallback(
    (e) => {
      console.log("call");
      const scrollTop = e.target.scrollTop;

      const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
      setStartIndex(newStartIndex);
    },
    [ITEM_HEIGHT]
  );

  const throttleHandleScroll = useMemo(
    () => throttle(handleScroll, 100),
    [handleScroll]
  );

  const finalItems = useMemo(
    () => items.slice(startIndex, startIndex + rows + overscan),
    [items, startIndex, rows, overscan]
  );

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
        onScroll={throttleHandleScroll}
      >
        <div
          style={{ height: items.length * ITEM_HEIGHT, position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${startIndex * ITEM_HEIGHT}px)`,
            }}
          >
            {finalItems.map((item, i) => (
              <div
                key={startIndex + i}
                style={{
                  height: ITEM_HEIGHT,
                  borderBottom: "1px solid black",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

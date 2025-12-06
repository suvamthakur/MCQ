export default function Note({ ref, note, ...props }) {
  return (
    <div
      ref={ref}
      style={{
        width: "300px",
        height: "100px",
        padding: "15px",
        backgroundColor: "khaki",
        border: "1px solid black",
        cursor: "move",
        position: "absolute",
        top: `${note.position?.Y || 0}px`,
        left: `${note.position?.X || 0}px`,
        userSelect: "none",
      }}
      {...props}
    >
      {note.text}
    </div>
  );
}

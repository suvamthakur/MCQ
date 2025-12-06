import { useEffect, useRef } from "react";
import Note from "./Note";

export default function Notes({ notes = [], setNotes }) {
  const noteRefs = useRef([]);

  useEffect(() => {
    const updatedNotes = notes.map((note) => {
      if (!note.position) {
        return {
          ...note,
          position: generateNewPosition(),
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  }, [notes.length]);

  function generateNewPosition() {
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 250;

    return {
      X: Math.floor(Math.random() * maxX),
      Y: Math.floor(Math.random() * maxY),
    };
  }

  function handleMouseDown(note, e) {
    const noteRef = noteRefs.current[note.id];
    const rect = noteRef.getBoundingClientRect();

    const offSetX = e.clientX - rect.left; // get the exact diff of the cursor point to its notes' top and left
    const offSetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;

      noteRef.style.left = `${newX - offSetX}px`; // now substarct that offset diff wo fall abck to exact point
      noteRef.style.top = `${newY - offSetY}px`;
    };

    const handleMouseUp = (e) => {
      const newRect = noteRef.getBoundingClientRect();

      const newPosition = {
        X: newRect.left,
        Y: newRect.top,
      };

      if (checkIsOverlap(note, newPosition)) {
        noteRef.style.left = `${rect.left}px`;
        noteRef.style.top = `${rect.top}px`;
      } else {
        updateNotePosition(note.id, newPosition);
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const updateNotePosition = (id, newPosition) => {
    setNotes((notes) =>
      notes.map((note) =>
        note.id == id ? { ...note, position: newPosition } : note
      )
    );
  };

  const checkIsOverlap = (note) => {
    const filteredNotes = notes.filter((el) => el.id != note.id);
    const currentNoteRect = noteRefs.current[note.id].getBoundingClientRect();

    let hasOverlap = false;
    for (let note of filteredNotes) {
      const rect = noteRefs.current[note.id].getBoundingClientRect();

      if (
        (currentNoteRect.top > rect.top && currentNoteRect.top < rect.bottom) ||
        (currentNoteRect.bottom > rect.top &&
          currentNoteRect.bottom < rect.bottom)
      ) {
        hasOverlap = true;
      }

      if (
        currentNoteRect.top == rect.top &&
        currentNoteRect.left == rect.left &&
        currentNoteRect.right == rect.right &&
        currentNoteRect.bottom == rect.bottom
      ) {
        hasOverlap = true;
      }
    }
    return hasOverlap;
  };

  return (
    <div>
      {notes.map((note, index) => (
        <Note
          ref={(el) => (noteRefs.current[note.id] = el)}
          note={note}
          key={note.id || index}
          onMouseDown={(e) => handleMouseDown(note, e)}
        ></Note>
      ))}
    </div>
  );
}

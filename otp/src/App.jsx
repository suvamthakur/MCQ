import { useRef, useState } from "react";

const BOX_COUNT = 4;

function App() {
  const [otp, setOtp] = useState(Array(BOX_COUNT).fill(""));
  const refs = useRef([]);

  const handleInputOtp = (value, index) => {
    if (isNaN(value)) return;

    const newValue = value.trim();
    const newOtp = [...otp];
    newOtp[index] = newValue.slice(-1);
    setOtp(newOtp);

    if (newValue && index != BOX_COUNT - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    console.log(e.key);
    if (e.key == "Backspace" && index > 0 && !e.target.value) {
      refs.current[index - 1].focus();
    }
    if (e.key == "ArrowRight" && index != BOX_COUNT - 1) {
      refs.current[index + 1].focus();
    }
    if (e.key == "ArrowLeft" && index != 0) {
      refs.current[index - 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();

    let value = e.clipboardData.getData("text")?.trim();
    if (isNaN(value)) return;

    value = value.slice(0, BOX_COUNT - index);
    const newOtp = [...otp];

    for (let i = index, j = 0; i < BOX_COUNT; i++, j++) {
      newOtp[i] = value[j];
    }
    setOtp(newOtp);

    refs.current[index + value.length - 1].focus();
  };

  return (
    <div>
      <h2>Enter your otp</h2>
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            ref={(el) => (refs.current[index] = el)}
            key={index}
            className="otp-box"
            type="text"
            value={value}
            onChange={(e) => handleInputOtp(e.target.value, index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          ></input>
        ))}
        <button
          onClick={() => {
            console.log(otp.join(""));
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";

export default function AutoWidthInput() {
  const [text, setText] = useState("");
  const spanRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      // mierzymy szerokość spana z tekstem i ustawiamy width inputa
      const width = spanRef.current.offsetWidth + 20; // +20px padding/margin
      inputRef.current.style.width = width + "px";
    }
  }, [text]);

  return (
    <div className="inline-block relative">
      {/* Niewidoczny span do mierzenia szerokości tekstu */}
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre text-base font-sans"
      >
        {text || " "} {/* zawsze coś, żeby width było mierzalne */}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-2 py-1 rounded text-base font-sans"
        placeholder="Wpisz tekst..."
      />
    </div>
  );
}

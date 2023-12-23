import { useState, useRef } from "react";
import thalaVideo from "./assets/thala_for_a_reason.mp4";
import linkedinIcon from "./assets/li.svg";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isThala, setIsThala] = useState(false);
  const [thalaText, setThalaText] = useState("");
  const videoRef = useRef(null);

  const handleSearch = () => {
    // trim all the whitespaces from both sides
    const trimmedSearchTerm = searchTerm.trim();

    // sample case
    if (trimmedSearchTerm.toLocaleLowerCase() === "thallium") {
      setIsThala(true);
      setThalaText("Thallium - Atomic no. = 81, 8-1=7");
      return;
    }

    // if searchTerm is a number, check if its divisible by 7
    if (/^\d+$/.test(trimmedSearchTerm)) {
      // sum case
      let sum = 0;
      let sumDigitString = "";
      for (const num of trimmedSearchTerm) {
        sum = sum + parseInt(num);
        sumDigitString.length === 0
          ? (sumDigitString += num)
          : (sumDigitString += "+" + num);
      }

      if (sum === 7 || sum % 7 === 0) setIsThala(true);

      if (sum === 7) {
        setThalaText(`${sumDigitString} = ${sum}`);
      } else if (sum % 7 === 0) {
        const divident = sum / 7;
        setThalaText(`${sumDigitString} = ${sum}, divided by ${divident} = 7`);
      }
      return;
    }

    // check if the length of word entered is 7
    if (trimmedSearchTerm.length === 7 && !trimmedSearchTerm.includes(" ")) {
      setIsThala(true);
      setThalaText(`${searchTerm} = 7 characters`);
      return;
    }

    // check if 7 words entered
    const searchTermArray = trimmedSearchTerm.split(" ");
    if (searchTermArray.length === 7) {
      setIsThala(true);
      setThalaText(`${trimmedSearchTerm} = 7 words`);
      return;
    }

    setIsThala(false);
    setThalaText("");
  };

  return (
    <div className="container">
      <div className="search_div">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Try entering Thallium..."
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isThala && (
        <div className="thala_div">
          <p className="thala_text">{thalaText}</p>
          <video
            className="thala_video"
            ref={videoRef}
            src={thalaVideo}
            autoPlay
            loop
          />
          <p className="reason_text">Thala for a Reason</p>
        </div>
      )}
      <p className="made_by">
        Made by Rajdeep &nbsp;| &nbsp;
        <a href="https://www.linkedin.com/in/rajdeep-shrivastava/" target="_">
          <img src={linkedinIcon} alt="linkedin" />
        </a>
      </p>
    </div>
  );
};

export default App;

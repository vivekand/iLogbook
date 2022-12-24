import React, { useState } from "react"; // creating state
import noteContext from "./noteContext";
const NoteState = (props) => {
  const s1 = {
    name: "vivek",
    class: "10th",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "sagar",
        class: "12th",
      });
    }, 1000); // time is in ms(millisecond)
  };
  return (
    <noteContext.Provider value={{state,update}}>{props.children}</noteContext.Provider>
  );
};
export default NoteState;

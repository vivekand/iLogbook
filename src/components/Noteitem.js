import React from "react";

const Noteitem = (props) => {
  const { note } = props; // destructuring [note.prpos]
  return (
    <div className="col-md-3">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, voluptate aliquid saepe, aperiam, iure harum reiciendis culpa esse rerum eligendi natus doloremque accusantium aut a. A voluptates architecto assumenda. Amet!</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

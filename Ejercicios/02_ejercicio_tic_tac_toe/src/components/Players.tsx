import { useState } from "react";
import type { IplayerProp } from "../modals/Modals";


export default function Players({ initialName, symbol,isActive,onSelectedName}: IplayerProp) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handlePlayerName(event: any) {
    setPlayerName(event.target.value);
  }
  function handleEditButton() {
    setIsEditing((editing) => !editing);
    if (isEditing){
      onSelectedName(symbol,playerName)
    }
  }

  let editingPlayerName = <span className="player_name">{playerName}</span>;
  if (isEditing) {
    editingPlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerName}
      />
    );
  }

  return (
    <li className={isActive ? 'active':undefined}>
      <span className="player">{editingPlayerName}</span>
      <span className="player_symbol">{symbol}</span>
      <button onClick={handleEditButton}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}

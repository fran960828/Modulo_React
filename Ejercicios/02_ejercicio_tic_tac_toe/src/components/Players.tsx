import { useState } from "react";

interface IplayerProp {
  initialName: string;
  symbol: string;
}

export default function Players({ initialName, symbol }: IplayerProp) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handlePlayerName(event: any) {
    setPlayerName(event.target.value);
  }
  function handleEditButton() {
    setIsEditing((editing) => !editing);
  }

  let editingPlayerName = <span>{playerName}</span>;
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
    <li>
      <span className="player-name">{editingPlayerName}</span>
      <span>{symbol}</span>
      <button onClick={handleEditButton}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}

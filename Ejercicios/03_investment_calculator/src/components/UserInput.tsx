interface IuserProp {
  label: string;
  value: number;
  onChangeValue: (label: string, event: any) => void;
}

export default function UserInput({ label, value, onChangeValue }: IuserProp) {
  return (
    <li className="input-item">
      <label htmlFor={label}>{label}</label>
      <input
        type="number"
        required
        id={label}
        value={value}
        onChange={(event) => onChangeValue(label, event)}
      />
    </li>
  );
}

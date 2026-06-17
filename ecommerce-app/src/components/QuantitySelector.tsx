type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease
}: Props) {
  return (
    <div className="qty">
      <button onClick={onDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
}
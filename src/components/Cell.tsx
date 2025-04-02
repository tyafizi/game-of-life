export function Cell({
  alive = false,
  onClick,
}: {
  alive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`${alive ? "bg-green-400" : "bg-blue-100"} border grow cursor-pointer`}
      onClick={onClick}
    />
  );
}

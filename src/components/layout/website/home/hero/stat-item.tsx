export default function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center p-2 md:p-4 flex flex-col justify-between items-center">
      <div className="text-sm md:text-lg text-white font-medium mb-3 text-shadow-2xs text-shadow-black">
        {label}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-primary mb-2 text-nowrap text-shadow-2xs text-shadow-white">
        {value}
      </div>
    </div>
  );
}

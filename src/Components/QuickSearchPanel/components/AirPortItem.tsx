export interface AirPort {
  id: number;
  name: string;
  location: string;
  iata: string;
  gates: string;
}

function AirPortItem({
  airport,
  setter,
}: {
  airport: AirPort;
  setter: (value: any) => void;
}) {
  return (
    <div
      onClick={() => {
        console.log(312);

        setter(airport);
      }}
      className="hover:bg-gray-500/10 cursor-pointer scroll  p-3 flex items-center justify-between"
    >
      <div className="flex flex-col">
        <span className="text-xl text-black">{airport.location}</span>
        <span>{airport.name}</span>
      </div>
      <div className="font-bold">{airport.iata}</div>
    </div>
  );
}

export default AirPortItem;

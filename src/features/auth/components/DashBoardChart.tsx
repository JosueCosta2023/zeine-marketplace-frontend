import { useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatDate = (dateStr: string) => {
  if (!dateStr) return;

  const meses = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ];

  const [mes, dia] = dateStr.split("-");
  return `${dia} de ${meses[parseInt(mes, 10) - 1]}`;
};

const DashBoardChart = () => {
  const [dateRange, setDateRange] = useState({ start: "2024-01-01", end: "2024-12-31" });
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(5);

  const data = [
    { name: "JAN", value: 400 },
    { name: "FEV", value: 100 * 0.5 },
    { name: "MAR", value: 100 * 2 },
    { name: "APR", value: 460 - 100 },
    { name: "JUN", value: 300 * 1 },
    { name: "JUL", value: 67 * 6 },
    { name: "AGO", value: 400 - 300 },
    { name: "SET", value: 20 + 50 },
    { name: "OUT", value: 4 * 100 },
    { name: "NOV", value: 20 * 2 },
    { name: "DEZ", value: 70 * 1 },
  ];

  const handleMouseMove = (state: any) => {
    if (state && state.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    }
  };

  return (
    <div className="w-full bg-white rounded-[20px]  shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-darkLight">Visitantes</h3>
        <div
          className="flex items-center gap-2 cursor-pointer text-grayScale"
          onClick={() => startInputRef.current?.focus()}
        >
          <FaRegCalendarAlt className="text-[#5EC5FD] text-lg" />
          <span>
            {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
          </span>
          {/* Inputs escondidos para seleção de datas */}
          <input
            ref={startInputRef}
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="hidden"
          />
          <input
            ref={endInputRef}
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="hidden"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} onMouseMove={handleMouseMove}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            active={activeIndex !== null}
            content={({ active, payload, label }) =>
              active && payload && payload.length ? (
                <div className="bg-white p-2 border rounded shadow">
                  <p className="font-semibold">{label}</p>
                  <p>Visitas: {payload[0].value}</p>
                </div>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#5EC5FD"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashBoardChart;

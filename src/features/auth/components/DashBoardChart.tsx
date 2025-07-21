import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


const DashBoardChart = () => {

    const data = [
        {name: "JAN", value: 400},
        {name: "FEV", value: (400 * 0.5)},
        {name: "MAR", value: (400 * 2)},
        {name: "APR", value: (400 - 100)},
        {name: "JUN", value: (400 * 1)},
        {name: "JUL", value: (400 * 6)},
        {name: "AGO", value: (400 - 300)},
        {name: "SET", value: (400 + 50)},
        {name: "OUT", value: (400 * 100)},
        {name: "NOV", value: (400 * 2)},
        {name: "DEZ", value: (400 * 1)},
    ]

    console.log(data)


    return(
        <div className="w-full bg-white rounded-lg shadow p-4">
            <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="value" stroke="#f15a29"/>
                    </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DashBoardChart
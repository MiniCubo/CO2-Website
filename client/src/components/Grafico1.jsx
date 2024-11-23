import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';


function Grafico1(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );
    
    const labels = props.data.map(item => item.año); // Eje x: años
    const dataValues = props.data.map(item => parseInt(item.total)); // Eje y: totales (convertidos a número)
    // console.log(labels);
    // console.log(dataValues);

    
    var midata = {
        labels: labels,
        datasets: [
            {
                label: 'Cars',
                data: dataValues,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(80, 99, 132)',
                backgroundColor: 'rgba(25, 99, 214, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(8, 99, 132)',
                pointBackgroundColor: '#7fe6f8',
            },
        ],
    };
    
    var misoptions = {
        scales: {
            x: {
                ticks: { color: 'rgb(0,0,0)' },
            },
        },
        responsive: true, // Hace que el gráfico sea responsivo
        maintainAspectRatio: false, // Permite que el gráfico ocupe todo el espacio disponible
    };
    


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Line data={midata} options={misoptions} />
        </div>
    );
}

export default Grafico1;
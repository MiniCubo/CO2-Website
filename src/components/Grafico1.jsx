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

var beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
var Años = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var midata = {
    labels: Años,
    datasets: [
        {
            label: 'Beneficios',
            data: beneficios,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(80, 99, 132)',
            backgroundColor: 'rgba(25, 99, 214, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(8, 99, 132)',
            pointBackgroundColor: '#7fe6f8',
        },
        {
            label: 'Otra línea',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25],
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

export default function Grafico1() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Line data={midata} options={misoptions} />
        </div>
    );
}

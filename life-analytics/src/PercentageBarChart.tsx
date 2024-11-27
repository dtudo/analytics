import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, Point, BubbleDataPoint } from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { PercentageData } from './types/PercentageData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

interface PercentageBarChartProps {
    percentageData: PercentageData[];
    threshold: number;
    labels: string[];
    title: string;
}

const PercentageBarChart: React.FC<PercentageBarChartProps> = ({ percentageData, threshold, labels, title }) => {
    const percentages: number[] = percentageData.map((value) => parseFloat((value.success * 100 / value.total).toFixed(1)));
    const remainingPercentages: number[] = percentages.map((value) => parseFloat((100 - value).toFixed(1)));

    const getSuccessColor = (value: number) => {
        return value >= threshold ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
    };

    const getFailureColor = (value: number) => {
        return value <= (100 - threshold) ? 'rgba(75, 192, 192, 0.3)' : 'rgba(255, 99, 132, 0.3)';
    };

    const chartData: ChartData<"bar", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> = {
        labels: labels,
        datasets: [
            {
                data: percentages,
                backgroundColor: percentages.map(getSuccessColor),
                borderColor: percentages.map(getSuccessColor),
                borderWidth: 1,
                datalabels: {
                    textAlign: 'center',
                    formatter: (value: number, context: Context) => `${value}%\n(${percentageData[context.dataIndex].success}/${percentageData[context.dataIndex].total})`,
                },
            },
            {
                data: remainingPercentages,
                backgroundColor: remainingPercentages.map(getFailureColor),
                borderColor: remainingPercentages.map(getFailureColor),
                borderWidth: 1,
                datalabels: {
                    formatter: (value: number) => `${value}%`,
                },
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `${tooltipItem.raw}%`,
                },
            },
            datalabels: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                stacked: true,
                ticks: {
                    max: 100,
                    stepSize: 10,
                },
            },
            x: {
                stacked: true,
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default PercentageBarChart;

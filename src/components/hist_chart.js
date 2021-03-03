import { useState, useEffect, useRef } from 'react'
import Chartjs from 'chart.js'

const HistChart = ({data}) => {
    const [timeFrame, setTimeFrame] = useState('day')
    const chartCanvas = useRef()
    const {day, week, month, year, details} = data

    const timeSpan = () => {
        switch (timeFrame) {
            case 'day': return day
            case 'week': return week
            case 'month': return month
            case 'year': return year
            default: return day
        }
    }


    useEffect(() => {
        if (chartCanvas.current && details) {
            const chart = new Chartjs(chartCanvas.current, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: `${details.name} price`,
                        data: timeSpan(),
                        backgroundColor: ['rgba(0, 169, 206, .5)'],
                        borderColor: ['rgba(0, 169, 206, .5)'],
                        borderWidth: 1,
                        pointRadius: 0,
                    }]
                },
                options: {
                    lineHeightAnnotation: {
                        always: true,
                        hover: false,
                        lineWeight: 1.5
                    },
                    animation: {
                        duration: 1500
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    unit: 'day',
                                }
                            },
                            distribution: 'series',
                            bounds: 'data'
                        }],
                        yAxes: [{
                            ticks: {

                            }
                        }]
                    }
                }
            })
        }
    })
    return (
        <div id="chart-cont">
            <canvas ref={chartCanvas} width="200" height="200">
            </canvas>
            <div id="chart-button-cont">
                <button className="chart-button" onClick={() => {
                    setTimeFrame('day')
                }}>Day</button>
                <button className="chart-button" onClick={() => {
                    setTimeFrame('week')
                }}>Week</button>
                <button className="chart-button" onClick={() => {
                    setTimeFrame('month')
                }}>Month</button>
                <button className="chart-button" onClick={() => {
                    setTimeFrame('year')
                }}>Year</button>
            </div>
        </div>
    )
}

export default HistChart

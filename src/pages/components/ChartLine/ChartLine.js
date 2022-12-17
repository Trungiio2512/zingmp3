import classNames from "classnames/bind";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useEffect, useState, useRef } from "react";

import { images } from "~/assets";
import styles from "./Chart.module.scss";
import _ from "lodash";
import { Media } from "~/layouts/components/Media";

const cx = classNames.bind(styles);

function ChartLine({ data }) {
    const [chart, setChart] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [selected, setSelected] = useState(null);
    const chartRef = useRef();
    // custom chart
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: "gray", drawTicks: false },
                min: data?.chart?.minScore,
                max: data?.chart?.maxScore,
                border: { dash: [2, 6] },
            },
            x: {
                ticks: { color: "white" },
                grid: { color: "transparent" },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                //hover dot line in chart
                external: ({ tooltip }) => {
                    // console.log(tooltip);
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: data?.chart?.items[Object.keys(data?.chart?.items)[i]]
                                ?.filter((item) => item?.hour % 2 === 0)
                                ?.map((item) => item?.counter),
                            encodeId: Object.keys(data?.chart?.items)[i],
                        });
                    }
                    const rs = counters.find((i) =>
                        i.data.some((n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")),
                    );
                    setSelected(rs.encodeId);
                    // console.log(rs);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: "dataset",
            intersect: false,
        },
    };
    useEffect(() => {
        const labels = data?.chart?.times.filter((item) => +item.hour % 2 === 0)?.map((item) => `${item?.hour}:00`);
        const datasets = [];
        // custom css line chart
        if (data?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: data?.chart?.items[Object.keys(data?.chart?.items)[i]]
                        .filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item?.counter),
                    borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: "white",
                    pointHoverRadius: 5,
                    pointBorderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    pointHoverBorderWidth: 2,
                });
            }
        }
        // console.log(data?.items[Object.keys(data?.items)[0]]);
        setChart({ labels, datasets });
        // console.log();
    }, [data]);
    console.log(data);
    return (
        <div className={cx("chart")}>
            <img src={images.bgChart} alt="bg-chart" className={cx("chart-bg")} />
            <div className={cx("chart-bg-blur")}></div>
            <div className={cx("chart-content")}>{chart && <Line ref={chartRef} data={chart} options={options} />}</div>
            <div
                className="tooltip"
                style={{
                    top: tooltipState.top,
                    left: tooltipState.left,
                    opacity: tooltipState.opacity,
                    // backgroundColor: "rgba(255, 255, 255, 0.4)",
                    position: "absolute",
                    boxPadding: 12,
                }}
            >
                <Media small song data={data?.items.find((item) => item.encodeId === selected)} />
            </div>
        </div>
    );
}

export default ChartLine;

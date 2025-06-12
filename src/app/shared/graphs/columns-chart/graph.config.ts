import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from "ng-apexcharts";
import { ChartOptions } from "../../models/chart-options";

export function GraphConf(data: any, categories: any, baseColor: string): Partial<ChartOptions> {
    return {
        series: [
            {
                name: 'Products',
                data: data,
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'bar',
            height: 150,
            toolbar: {
                show: false, // hide zoon ect...
            },
            sparkline: {
                // enabled: false,//! show x/y axis labels
                enabled: true, //! show x/y axis labels
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            // opacity: 1,
            // colors:['#a3a3a3']
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.2,
                stops: [15, 120, 100],
            },
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 2,
            colors: [baseColor], // line color
        },
        grid: {
            // show: false,
            show: true,
            borderColor: 'lightgray', // background horizontal grids
            strokeDashArray: 1,
        },
        xaxis: {
            categories: categories,
            labels: {
                show: true,
            },
            crosshairs: {
                position: 'front',
                stroke: {
                    color: baseColor,
                    width: 1,
                    dashArray: 4,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        tooltip: {
            theme: 'light',
            // marker: {
            //  show:true,
            //  fillColors:['blue','yellow'] 
            // },
            y: {
                formatter: (val: number) => `${val}`
            }

        },
        colors: [baseColor], //line colors
    }
}

export type GraphConfig = {
    series: Array<{
        name: string;
        data: any[];
    }>;
    chart: {
        fontFamily: string;
        type: string;
        height: number;
        toolbar: {
            show: boolean;
        };
        sparkline: {
            enabled: boolean;
        };
    };
    plotOptions: {
        bar: {
            horizontal: boolean;
            columnWidth: string;
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    fill: {
        type: string;
        gradient: {
            shadeIntensity: number;
            opacityFrom: number;
            opacityTo: number;
            stops: number[];
        };
    };
    stroke: {
        curve: string;
        show: boolean;
        width: number;
        colors: string[];
    };
    grid: {
        show: boolean;
        borderColor: string;
        strokeDashArray: number;
    };
    xaxis: {
        categories: any[];
        labels: {
            show: boolean;
        };
        crosshairs: {
            position: string;
            stroke: {
                color: string;
                width: number;
                dashArray: number;
            };
        };
        tooltip: {
            enabled: boolean;
        };
    };
    yaxis: {
        title: {
            text: string;
        };
    };
    tooltip: {
        theme: string;
        y: {
            formatter: (val: number) => string;
        };
    };
    colors: string[];
};
import { Component, computed, effect, inject, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../models/chart-options';
import { ThemeService } from 'src/app/core/services/theme.service';
import { GraphUtilService } from 'src/app/core/utils/graph-util.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { TitleCasePipe } from '@angular/common';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   title: ApexTitleSubtitle;
// };

@Component({
  selector: '[app-columns-chart]',
  imports: [
    NgApexchartsModule,
    TitleCasePipe
  ],
  providers: [TitleCasePipe],
  templateUrl: './columns-chart.component.html',
  styleUrl: './columns-chart.component.css'
})
export class ColumnsChartComponent {

  #productsService = inject(ProductsService);
  #titleCasePipe = inject(TitleCasePipe);

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  graphData = computed(() => this.#productsService.graphData());


  constructor(private themeService: ThemeService) {
    let baseColor = '#FFFFFF';
    const categories: string[] = [];
    const data = this.graphData().dataNum ?? [];

    this.chartOptions = {

      series: [
        {
          name: 'Products',
          data: data,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        // type: 'area',
        type: 'bar',
        height: 150,
        toolbar: {
          show: false, // hide zoon ect...
        },
        sparkline: {
          // enabled: false,//! show x/y axis labels
          enabled: true, //! show x/y axis labels
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            const value = this.chartOptions?.series?.[seriesIndex]?.data?.[dataPointIndex];
            const category = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            console.log(value)
            console.log(category)
            console.log(this.graphData().products[config.dataPointIndex]);

          }
        }
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
    };


    effect(() => {
      /** change chart theme */
      let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      this.chartOptions.tooltip = { theme: this.themeService.theme().mode };
      this.chartOptions.colors = [primaryColor];
      this.chartOptions.stroke!.colors = [primaryColor];
      this.chartOptions.xaxis!.crosshairs!.stroke!.color = primaryColor;
    });

    effect(() => {
      const graph = this.graphData();
      console.log('[GRAPH]', graph);

      if (graph?.dataNum?.length) {
        this.chartOptions.series = [
          {
            name: (graph.prop === 'discountPercentage') ? 'Discount' : this.#titleCasePipe.transform(graph.prop),
            data: graph.dataNum,
          },
        ];
        this.chartOptions.xaxis = {
          ...this.chartOptions.xaxis,
          categories: graph.titles,
        };
        // const min = Math.min(...this.graphData().dataNum);
        // const max = Math.max(...this.graphData().dataNum);
        // this.chartOptions.colors = this.graphData().dataNum.map(val =>
        //   val === max ? '#2ecc40' : val === min ? '#ff4136' : '#0074d9')
        // console.log('[GRAPH]', graph);
        // console.log(this.chartOptions.colors);
      }
    });



  }


  transform(value: unknown): string | null {
    return null;
  }
}

// this.chartOptions = {
//   series: [
//     {
//       name: "Sales",
//       data: data
//     }
//   ],
//   chart: {
//     type: "bar",
//     height: 350
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 4,
//       horizontal: false,
//     }
//   },
//   dataLabels: {
//     enabled: false
//   },
//   xaxis: {
//     categories: categories
//   },
//   title: {
//     text: "Column Chart Example"
//   }
// };

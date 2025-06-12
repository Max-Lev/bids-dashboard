import { Component, OnDestroy, OnInit, computed, effect, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from '../../../../../shared/models/chart-options';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: '[nft-chart-card]',
  templateUrl: './nft-chart-card.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule],
})
export class NftChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;

  #productsService = inject(ProductsService);
  graphData = computed(() => this.#productsService.graphData());

  constructor(private themeService: ThemeService) {
    let baseColor = '#FFFFFF';
    const data = [2100, 3200, 3200, 2400, 2400, 1800, 1800, 2400, 2400, 3200, 3200, 3000, 3000, 3250, 3250];
    const categories = [
      '10AM',
      '10.30AM',
      '11AM',
      '11.15AM',
      '11.30AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
      '6PM',
      '7PM',
      '8PM',
      '9PM',
    ];

    this.chartOptions = {
      series: [
        {
          name: 'Etherium',
          data: data,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: 150,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
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
        width: 3,
        colors: [baseColor], // line color
      },
      xaxis: {
        categories: categories,
        labels: {
          show: false,
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
      tooltip: {
        
        theme: 'light',
        y: {
          formatter: function (val) {
            return val + '$';
          },
        },
      },
      colors: [baseColor], //line colors
      
      // tooltip: {
      //   y: {
      //     formatter: (val: number) => `${val}`
      //   }
      // }
    };

    effect(() => {
      /** change chart theme */
      let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      this.chartOptions.tooltip = {
        theme: this.themeService.theme().mode,
      };
      this.chartOptions.colors = [primaryColor];
      
      this.chartOptions.stroke!.colors = [primaryColor];
      this.chartOptions.xaxis!.crosshairs!.stroke!.color = primaryColor;
      
    });

    effect(() => {
      const graph = this.graphData();
      if (graph?.dataNum?.length) {
        this.chartOptions.series = [
          {
            name: graph.prop,
            data: graph.dataNum,
          },
        ];
        this.chartOptions.xaxis = {
          ...this.chartOptions.xaxis,
          categories: graph.titles,
        };
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}

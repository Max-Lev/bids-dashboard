import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnChanges, output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../models/chart-options';
import { ThemeService } from 'src/app/core/services/theme.service';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChartProducts, EmptyChartProduct } from 'src/app/core/models/chart-products.model';
import { GraphConf } from './graph.config';
import { MiniTableComponent } from '../../components/mini-table/mini-table.component';
import { Product } from 'src/app/core/models/products';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SaveDeleteButtonComponent } from '../../components/save-delete-button/save-delete-button.component';
import { ButtonComponent } from '../../components/button/button.component';
import { MessageService } from '../../providers/message.service';
import { SavedFilterBtnsComponent } from '../../components/saved-filter-btns/saved-filter-btns.component';
import { SaveBtnState, SavedFilter } from 'src/app/core/models/saved-filter.model';

@Component({
  selector: '[app-columns-chart]',
  imports: [
    NgApexchartsModule,
    TitleCasePipe,
    MiniTableComponent,
    DecimalPipe,
    AngularSvgIconModule,
    SaveDeleteButtonComponent,
    SavedFilterBtnsComponent
  ],
  providers: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './columns-chart.component.html',
  styleUrl: './columns-chart.component.css'
})
export class ColumnsChartComponent implements OnChanges {

  #titleCasePipe = inject(TitleCasePipe);

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  graphData = input<ChartProducts>({ ...EmptyChartProduct });

  savedFilterState = input<SavedFilter[]>();

  selectedItem = signal<Product | {}>({});

  totalValue = computed(() => this.graphData().totalValue);

  additionalData = computed(() => {
    const dataMax = this.graphData().products[0];
    const dataMin = this.graphData().products[this.graphData().products.length - 1];
    return {
      dataMin,
      dataMax,
      prop: this.graphData().prop,
      selectedItem: this.selectedItem(),
      order: this.graphData().order,
      list: [dataMax, dataMin]
    }
  });

  #messageService = inject(MessageService);
  saveBtnState = computed(() => this.#messageService.saveBtnState());

  onDeleteSelected = output<number>();
  onSaveHandler = output<void>();
  onFilterHandler = output<number>();


  constructor(private themeService: ThemeService) {
    let baseColor = '#FFFFFF';
    const categories: string[] = this.graphData().titles ?? []
    const data = this.graphData().dataNum ?? [];
    this.chartOptions = GraphConf(data, categories, baseColor);

    this.chartEventListener();
    this.setChartOptions();

    effect(() => {
      this.additionalData();
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  setChartOptions() {
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
      const name = (graph.prop === 'discountPercentage') ? 'Discount' : this.#titleCasePipe.transform(graph.prop);
      if (graph?.dataNum?.length) {
        this.chartOptions.series = [{ name: name, data: graph.dataNum }];
        this.chartOptions.xaxis = { ...this.chartOptions.xaxis, categories: graph.titles, };
        // const min = Math.min(...this.graphData().dataNum);
        // const max = Math.max(...this.graphData().dataNum);
        // this.chartOptions.colors = this.graphData().dataNum.map(val =>
        //   val === max ? '#2ecc40' : val === min ? '#ff4136' : '#0074d9')
        // console.log('[GRAPH]', graph);
        // console.log(this.chartOptions.colors);
      }
    });
  }

  chartEventListener() {
    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        ...this.chartOptions.chart!,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            const value = this.chartOptions?.series?.[seriesIndex]?.data?.[dataPointIndex];
            const category = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            console.log(value, category);
            console.log(this.graphData().products[dataPointIndex]);
            this.selectedItem.set(this.graphData().products[dataPointIndex]);
          }
        }
      }
    }
  }

  saveHandler() {
    this.onSaveHandler.emit();
  }

  filterHandler(index:number){
    this.onFilterHandler.emit(index);
  }

  deleteSelected(){
    const {deleteIndex} = this.#messageService.saveBtnState();
    this.onDeleteSelected.emit(deleteIndex!);
  }

  



}


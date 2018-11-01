import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Highcharts from 'highcharts';

@Component
export default class UrlPlotComponent extends Vue {

    url: string = '';
    urlPlotData: UrlPlotData[] = [];

    mounted() {
        this.url = this.$route.query.url;
        fetch(`api/UrlInfo/GetPlotInfoByUrl?url=${this.url}`)
            .then(response => response.json() as Promise<UrlPlotData[]>)
            .then(data => {
                this.urlPlotData = data;
            })
            .then(() => this.smth());

    }

    smth() {
        Highcharts.chart('Plot',
            {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Url Statistics Plot'
                },
                xAxis: {
                    categories: this.urlPlotData.map(u => u.dateList).reduce((u, v) => u.concat(v))
                        .map(d => d.date).filter((elem, pos, arr) => arr.indexOf(elem) === pos)
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: 'white'
                        }
                    }
                },
                series: this.urlPlotData.map(u => { return { name: u.status, data: u.dateList.map(d => d.count) }; })
            });
    }
}

class UrlPlotData {
    status: string = '';
    dateList: { date: string, count: number }[] = [];
}

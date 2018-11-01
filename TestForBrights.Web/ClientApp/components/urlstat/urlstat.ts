import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UrlInfoData } from '../urlinfo/UrlInfoData';

@Component
export default class UrlStatComponent extends Vue {
    urlInfoData: UrlInfoData[] = [];

    mounted() {
        fetch(`api/UrlInfo/GetAllUrlInfoData`)
            .then(response => response.json() as Promise<UrlInfoData[]>)
            .then(data => {
                data.forEach(d => {
                    let urlInfo = UrlInfoData.getEmptyUrlInfoData();
                    if (d.requestDate)
                        d.requestDate = new Date(Date.parse(d.requestDate.toString()));
                    UrlInfoData.copyConstructor(d, urlInfo);
                    this.urlInfoData.push(urlInfo);
                });
            });
    };

    showPlotForUrl(url: string) {
        if (url && url !== '')
            this.$router.push({ path: 'urlplot', query: { url: url } });
    };

}

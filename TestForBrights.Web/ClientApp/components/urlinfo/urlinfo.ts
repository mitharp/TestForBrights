import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UrlInfoData } from './UrlInfoData';

@Component
export default class UrlInfoComponent extends Vue {

    urls: string = '';
    urlInfoData: UrlInfoData[] = [];
    isTableShown: boolean = false;

    getUrlInfo() {
        if (this.urls === '') return;
        this.urlInfoData = [];
        this.isTableShown = true;

        this.urls.split('\n').forEach((u, i) => {

            this.urlInfoData.push(UrlInfoData.getEmptyUrlInfoData());
            fetch(`api/UrlInfo/GetUrlInfoData?url=${u}`)
                .then(response => response.json() as Promise<UrlInfoData>)
                .then(data => {
                    data.isLoading = false;
                    if (data.requestDate)
                        data.requestDate = new Date(Date.parse(data.requestDate.toString()));
                    UrlInfoData.copyConstructor(data, this.urlInfoData[i]);
                });
        });
    }
}

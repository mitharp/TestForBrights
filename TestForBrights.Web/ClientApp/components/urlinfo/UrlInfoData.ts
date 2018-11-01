export class UrlInfoData {
    isLoading: boolean = true;
    id: number = 0;
    url: string;
    requestDate: Date | null;
    title: string;
    status: string;

    public constructor(url: string, lastRequestDate: Date | null, lastTitle: string, lastStatus: string) {
        this.url = url;
        this.requestDate = lastRequestDate;
        this.title = lastTitle;
        this.status = lastStatus;
    }

    static getEmptyUrlInfoData(): UrlInfoData {
        return new UrlInfoData('', null, '', '');
    }

    static copyConstructor(source: UrlInfoData, target: UrlInfoData): void {
        target.id = source.id;
        target.url = source.url;
        target.requestDate = source.requestDate;
        target.title = source.title;
        target.status = source.status;
        target.isLoading = source.isLoading;
    }

    getLastRequestDate(): string {
        return this.requestDate ? this.requestDate.toLocaleString('ru-RU') : '';
    }
}

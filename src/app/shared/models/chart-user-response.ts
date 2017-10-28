export interface ChartUserResponse {
    name: string;
    series: ChartSeriesData[];
}
interface ChartSeriesData {
    name: string;
    value: string;
}

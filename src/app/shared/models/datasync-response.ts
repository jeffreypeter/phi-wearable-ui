export interface DataSyncResponse {
    data: SynDetails[]
}
interface SynDetails {
    id: string;
    userId: string;
    shim: string;
    lastNotified: number
}

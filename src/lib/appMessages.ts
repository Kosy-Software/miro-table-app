/// Messages that are relayed to all of the clients
export type AppMessage =
    | ReceiveMiroUrl

export interface ReceiveMiroUrl {
    type: "receive-miro-url";
    payload: string;
}
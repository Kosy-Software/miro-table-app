export interface UrlPicked {
    type: "miro-url-picked",
    payload: string
}

export interface PickingCanceled {
    type: "picking-canceled"
}

export type PickingMessage = UrlPicked | PickingCanceled

export type PickingEvent = {
    "message": PickingMessage
}
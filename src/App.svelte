<script type="ts">
    import { KosyApi } from "@kosy/kosy-app-api";
    import type { ClientInfo, InitialInfo } from "@kosy/kosy-app-api/types";
    import Viewing from "./components/Viewing.svelte";
    import Picking from "./components/Picking.svelte";
    import Waiting from "./components/Waiting.svelte";
    import type { AppMessage } from "./lib/appMessages";
    import type { AppState } from "./lib/appState";
    import type { PickingMessage } from "./lib/componentMessages";
    
    let state: AppState = { miroUrl: null };
    let initializer: ClientInfo;
    let currentClient: ClientInfo;
    
    //Simplest to implement -> just return the current state
    let getState = () => {
        return state;
    }

    let setState = (newState: AppState) => {
        state = newState;
        this.renderComponent();
    }

    //For this app, it's not important to know who's at the table
    let onClientHasJoined = (client: ClientInfo) => {
    }


    //If no google drive url has been picked, and the initializer is gone -> end the integration
    //Otherwise, ignore.
    let onClientHasLeft = (clientUuid: string) => {
        if (clientUuid === this.initializer.clientUuid && !this.state.googleDriveUrl) {
            kosyApi.stopApp();
        }
    }

    //Process the message that was sent via the kosy network
    let processMessage = async (message: AppMessage) => {
        switch (message.type) {
            case "receive-miro-url":
                console.log("Received a message from Kosy: ", message);
                state.miroUrl = message.payload;
                break;
        }
    }  

    const kosyApi = new KosyApi<AppState, AppMessage>({
        onClientHasJoined: (client) => onClientHasJoined(client),
        onClientHasLeft: (clientUuid) => onClientHasLeft(clientUuid),
        onReceiveMessage: (message) => { processMessage(message) },
        onRequestState: () => getState(),
        onProvideState: (newState: AppState) => setState(newState)
    });

    kosyApi.startApp().then((initialInfo: InitialInfo<AppState>) => {
        initializer = initialInfo.clients[initialInfo.initializerClientUuid];
        currentClient = initialInfo.clients[initialInfo.currentClientUuid];
        state = initialInfo.currentAppState;
    });

    let processPickingMessage = (message: PickingMessage) => {
        switch (message.type) {
            case "miro-url-picked": 
                kosyApi.relayMessage({ type: "receive-miro-url", payload: message.payload });
                break;
            case "picking-canceled": 
                kosyApi.stopApp();
                break;
            default:
                break;
        }
    }
</script>

{#if initializer && currentClient}
    {#if state.miroUrl}
        <Viewing url={state.miroUrl} />
    {:else if initializer.clientUuid === currentClient.clientUuid}
        <Picking on:message={e => processPickingMessage(e.detail)} />
    {:else}
        <Waiting name={initializer.clientName} />
    {/if}
{:else}
    <p>Waiting for Kosy...</p>
{/if}
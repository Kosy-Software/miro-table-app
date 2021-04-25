<script type="ts">
    import type { PickingEvent } from "../lib/componentMessages";
    import { createEventDispatcher } from 'svelte';
    import settings from "../../settings.json";

    const dispatch = createEventDispatcher<PickingEvent>();
    
    let onClick = () => {
        //I don't have the type definition file for miro boards picker :-(
        window["miroBoardsPicker"].open({
            clientId: settings.miro.clientId,
            action: "select",
            allowCreateAnonymousBoards: true,
            getToken: () => fetch(settings.miro.jwtTokenUrl).then(result => result.text()),
            success: (data: any) => {
                console.log("on success", data);
                dispatch("message", { type: "miro-url-picked", payload: `https://miro.com/app/live-embed/${data.id}` });
            },
            error: (e: Error) => {
                console.log("on error", e);
            },
            cancel: () => {
                console.log("on cancel");
            }
        })
    }
</script>

<div class="picking">
    <div>
        <h3>Embed Miro</h3>
    </div>
    <div class="gap"></div>
    <button id="open-picker" on:click={onClick}>Select a miro board</button>
</div>
<script type="ts">
    export let url: string;
</script>

<style lang="scss">
    iframe {
        width: 100vw;
        height: 100vh;
        border: 0px;
    }
</style>

<iframe title="miro board" src={url}></iframe>
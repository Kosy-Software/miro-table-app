<script type="ts">
    export let url: string;
</script>

<style>
    iframe {
        width: 100vw;
        height: 100vh;
    }
</style>

<div class="viewing">
    <iframe title="miro board" src={url}></iframe>
</div>
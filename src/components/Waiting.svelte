<script type="ts">
    export let name: string;
</script>

<style lang="scss">
    .waiting {
        display: grid;
        justify-content: center;
        align-content: center;
        text-align: center;
        height: 100vh;

        .gap {
            height: 24px;
            content: ' '
        }

        .img-container {
            width: 400px;
        }
    }
</style>

<div class="waiting">
    <h3>Miro sharing</h3>
    <p>Waiting for {name} to pick a file</p>
    <div class="gap"></div>
    <div class="img-container">
        <img alt="waiting" src="assets/waiting.svg" />
    </div>
</div>
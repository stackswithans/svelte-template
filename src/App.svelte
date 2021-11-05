<script lang="typescript">
    import Router from "svelte-spa-router";
    import {routes} from "./routes";
</script>


<svelte:head>
</svelte:head>

<Router {routes}/>


<style>
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

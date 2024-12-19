<script>
    import { replace } from "svelte-spa-router";
    import { isDeveloperMode } from "@/stores/developerMode";
    
    export let onRequirePin = () => replace("/verify-pin");
    
    function handleClick(e) {
        if (!$isDeveloperMode) {
            e.preventDefault();
            e.stopPropagation();
            onRequirePin();
            return false;
        }
    }
</script>

<div on:click={handleClick}>
    <slot />
</div> 
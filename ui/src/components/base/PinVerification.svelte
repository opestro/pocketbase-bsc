<script>
    import { createEventDispatcher } from "svelte";
    import { replace } from "svelte-spa-router";
    import { isPinVerified } from "@/stores/pin";
    import Field from "@/components/base/Field.svelte";
    import FullPage from "@/components/base/FullPage.svelte";

    const dispatch = createEventDispatcher();
    const CORRECT_PIN = "1234"; // Replace with your desired PIN

    let pin = "";
    let error = "";

    function verifyPin() {
        if (pin === CORRECT_PIN) {
            error = "";
            $isPinVerified = true;
            dispatch("success");
            replace("/collections");
        } else {
            error = "Invalid PIN";
            pin = "";
        }
    }
</script>

<FullPage>
    <form class="block" on:submit|preventDefault={verifyPin}>
        <div class="content txt-center m-b-base">
            <h4>Developer Access Required</h4>
            <p class="txt-hint">Enter PIN to access developer features</p>
        </div>

        <Field class="form-field required" name="pin" let:uniqueId>
            <label for={uniqueId}>Developer PIN</label>
            <input
                type="password"
                id={uniqueId}
                bind:value={pin}
                maxlength="4"
                pattern="[0-9]*"
                inputmode="numeric"
                autocomplete="off"
                required
            />
            {#if error}
                <div class="help-block error">{error}</div>
            {/if}
        </Field>

        <button type="submit" class="btn btn-lg btn-block btn-primary">
            <span class="txt">Verify Developer Access</span>
        </button>
    </form>
</FullPage> 
<script>
    import { replace } from "svelte-spa-router";
    import ApiClient from "@/utils/ApiClient";

    handler();

    function handler() {
        if (ApiClient.authStore.isValid) {
            replace("/collections");
        } else {
            ApiClient.logout();
        }
    }

    // Add RTL support for Arabic
    $: {
        const htmlElement = document.documentElement;
        const currentLang = document.documentElement.lang || 'en';
        htmlElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }
</script>

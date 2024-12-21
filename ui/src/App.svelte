<script>
    import "./scss/main.scss";
    import { onMount } from "svelte";

    import tooltip from "@/actions/tooltip";
    import Confirmation from "@/components/base/Confirmation.svelte";
    import TinyMCE from "@/components/base/TinyMCE.svelte";
    import Toasts from "@/components/base/Toasts.svelte";
    import Toggler from "@/components/base/Toggler.svelte";
    import { appName, hideControls, pageTitle } from "@/stores/app";
    import { resetConfirmation } from "@/stores/confirmation";
    import { setErrors } from "@/stores/errors";
    import { superuser } from "@/stores/superuser";
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import Router, { link, replace } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import routes from "./routes";
    import { isPinVerified } from "@/stores/pin";
    import { isDeveloperMode } from "@/stores/developerMode";

    let oldLocation = undefined;

    let showAppSidebar = false;

    let isTinyMCEPreloaded = false;

    // Add state for current language
    let currentLang = 'en';
    let translateInitialized = false;

    const languages = [
        { code: 'en', name: 'English', icon: '🇺🇸' },
        { code: 'fr', name: 'Français', icon: '🇫🇷' },
        { code: 'ar', name: 'العربية', icon: '🇸🇦' }
    ];

    $: if ($superuser?.id) {
        loadSettings();
    }

    function handleRouteLoading(e) {
        if (e?.detail?.location === oldLocation) {
            return; // not an actual change
        }

        showAppSidebar = !!e?.detail?.userData?.showAppSidebar;

        oldLocation = e?.detail?.location;

        // resets
        $pageTitle = "";
        setErrors({});
        resetConfirmation();
    }

    function handleRouteFailure() {
        replace("/");
    }

    async function loadSettings() {
        if (!$superuser?.id) {
            return;
        }

        try {
            const settings = await ApiClient.settings.getAll({
                $cancelKey: "initialAppSettings",
            });
            $appName = settings?.meta?.appName || "";
            $hideControls = !!settings?.meta?.hideControls;
        } catch (err) {
            if (!err?.isAbort) {
                console.warn("Failed to load app settings.", err);
            }
        }
    }

    function logout() {
        ApiClient.logout();
        $isPinVerified = false;
    }

    function toggleDeveloperMode() {
        if (!$isDeveloperMode) {
            replace("/verify-pin");
        }
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function changeLanguage(langCode) {
        setCookie('googtrans', `/en/${langCode}`, 1);
        currentLang = langCode;
        location.reload();
    }

    function initTranslate() {
        if (!document.querySelector('script[src*="translate.google.com"]')) {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,fr,ar',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
            translateInitialized = true;
        };
    }

    onMount(() => {
        // Check if there's a language cookie already set
        const match = document.cookie.match(/googtrans=\/en\/(\w{2})/);
        if (match) {
            currentLang = match[1];
        }
        
        setTimeout(initTranslate, 1000);
    });
</script>

<svelte:head>
    <title>{CommonHelper.joinNonEmpty([$pageTitle, $appName, "PocketBase"], " - ")}</title>

    {#if window.location.protocol == "https:"}
        <link
            rel="shortcut icon"
            type="image/png"
            href="{import.meta.env.BASE_URL}images/favicon/favicon_prod.png"
        />
    {/if}
</svelte:head>

<div class="app-layout">
    {#if $superuser?.id && showAppSidebar}
        <aside class="app-sidebar">
            <a href="/" class="logo logo-sm" use:link>
                <img
                    src="{import.meta.env.BASE_URL}images/logo.webp"
                    alt="PocketBase logo"
                    width="40"
                    height="40"
                />
            </a>

            <nav class="main-menu">
                <a
                    href="/collections"
                    class="menu-item"
                    aria-label="Collections"
                    use:link
                    use:active={{ path: "/collections/?.*", className: "current-route" }}
                    use:tooltip={{ text: "Collections", position: "right" }}
                >
                    <i class="ri-database-2-line" />
                </a>

                <div class="language-selector notranslate">
                    <button
                        type="button"
                        class="menu-item"
                        aria-label="Select Language"
                        use:tooltip={{ text: "Change Language", position: "right" }}
                    >
                        <span class="lang-code">{currentLang.toUpperCase()}</span>
                        <Toggler class="dropdown dropdown-right">
                            {#each languages as lang}
                                <button
                                    type="button"
                                    class="dropdown-item closable"
                                    class:active={currentLang === lang.code}
                                    on:click={() => changeLanguage(lang.code)}
                                >
                                    <!-- <span class="icon">{lang.icon}</span> -->
                                    <span class="txt">{lang.name}</span>
                                </button>
                            {/each}
                        </Toggler>
                    </button>
                </div>

                {#if $isDeveloperMode}
                    <a
                        href="/logs"
                        class="menu-item"
                        aria-label="Logs"
                        use:link
                        use:active={{ path: "/logs/?.*", className: "current-route" }}
                        use:tooltip={{ text: "Logs", position: "right" }}
                    >
                        <i class="ri-file-list-2-line" />
                    </a>
                    <a
                        href="/settings"
                        class="menu-item"
                        aria-label="Settings"
                        use:link
                        use:active={{ path: "/settings/?.*", className: "current-route" }}
                        use:tooltip={{ text: "Settings", position: "right" }}
                    >
                        <i class="ri-tools-line" />
                    </a>
                {/if}
            </nav>

            <div
                tabindex="0"
                role="button"
                aria-label="Logged superuser menu"
                class="thumb thumb-circle link-hint"
                title={$superuser.email}
            >
                <span class="initials">{CommonHelper.getInitials($superuser.email)}</span>
                <Toggler class="dropdown dropdown-nowrap dropdown-upside dropdown-left">
                    <div class="txt-ellipsis current-superuser" title={$superuser.email}>
                        {$superuser.email}
                    </div>
                    <hr />
                    <a
                        href="/collections?collection=_superusers"
                        class="dropdown-item closable"
                        role="menuitem"
                        use:link
                    >
                        <i class="ri-shield-user-line" aria-hidden="true" />
                        <span class="txt">Manage superusers</span>
                    </a>
                    <button type="button" class="dropdown-item closable" role="menuitem" on:click={logout}>
                        <i class="ri-logout-circle-line" aria-hidden="true" />
                        <span class="txt">Logout</span>
                    </button>
                </Toggler>
            </div>
        </aside>
    {/if}

    <div class="app-body">
        <Router {routes} on:routeLoading={handleRouteLoading} on:conditionsFailed={handleRouteFailure} />

        <Toasts />
    </div>
</div>

<Confirmation />

{#if showAppSidebar && !isTinyMCEPreloaded}
    <div class="tinymce-preloader hidden">
        <TinyMCE
            conf={CommonHelper.defaultEditorOptions()}
            on:init={() => {
                isTinyMCEPreloaded = true;
            }}
        />
    </div>
{/if}

<div id="google_translate_element" class="hidden" />

<style>
    .current-superuser {
        padding: 10px;
        max-width: 200px;
        color: var(--txtHintColor);
    }

    .language-selector {
        position: relative;
    }

    .dropdown {
        min-width: 150px;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dropdown-item.active {
        background: var(--baseAlt1Color);
    }

    .icon {
        font-size: 1.2em;
    }

    .txt {
        flex: 1;
    }

    :global(.goog-te-gadget) {
        color: var(--txtHintColor) !important;
        font-family: var(--baseFontFamily) !important;
    }

    :global(.goog-te-gadget-simple) {
        background-color: var(--baseColor) !important;
        border: 1px solid var(--baseAlt2Color) !important;
        padding: 5px !important;
        border-radius: var(--baseRadius) !important;
        font-size: var(--baseFontSize) !important;
    }

    :global(.goog-te-menu-value) {
        color: var(--txtPrimaryColor) !important;
    }

    :global(.goog-te-banner-frame) {
        display: none !important;
    }

    :global(.goog-te-gadget img) {
        display: none !important;
    }

    /* Add styles for the language button */
    .menu-item i.ri-global-line {
        font-size: 1.25rem;
    }

    button.menu-item {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: var(--txtHintColor);
        transition: color var(--baseAnimationSpeed),
                    background var(--baseAnimationSpeed);
    }

    button.menu-item:hover {
        color: var(--txtPrimaryColor);
        background: var(--baseAlt1Color);
    }

    .hidden {
        display: none !important;
    }

    /* Hide Google Translate elements */
    :global(.goog-te-banner-frame) {
        display: none !important;
    }

    :global(.goog-te-menu-value) {
        display: none !important;
    }

    :global(.goog-te-gadget) {
        height: 0;
        overflow: hidden;
    }

    :global(.VIpgJd-ZVi9od-l4eHX-hSRGPd) {
        display: none !important;
    }

    /* Hide the top bar */
    :global(body > .skiptranslate) {
        display: none !important;
    }

    /* Remove the space added to the top of the page */
    :global(body) {
        top: 0 !important;
    }

    /* Hide other Google Translate elements but keep functionality */
    :global(.goog-tooltip) {
        display: none !important;
    }

    :global(.goog-tooltip:hover) {
        display: none !important;
    }

    :global(.goog-text-highlight) {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }

    .lang-code {
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
    }

    .menu-item {
        width: auto !important;
        padding: 0 12px !important;
    }

    .dropdown {
        min-width: 150px;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dropdown-item.active {
        background: var(--baseAlt1Color);
    }

    .icon {
        font-size: 1.2em;
    }

    .txt {
        flex: 1;
    }
</style>

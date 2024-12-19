import { derived } from 'svelte/store';
import { isPinVerified } from './pin';

// Derived store that indicates if developer actions are allowed
export const isDeveloperMode = derived(
    isPinVerified,
    $isPinVerified => $isPinVerified
); 
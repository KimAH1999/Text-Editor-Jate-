const butInstall = document.getElementById('buttonInstall');

// String for PWA,stores trigger event and hidden class will be removed from button
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
    return;
    }
    // Shows prompt
    promptEvent.prompt();
    // Resets the deferred prompt variable once
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clears the prompt
    window.deferredPrompt = null;
});
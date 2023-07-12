const butInstall = document.getElementById('buttonInstall');
let installPromptEvent;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPromptEvent = event;
});

butInstall.addEventListener('click', async () => {
  if (installPromptEvent) {
    installPromptEvent.prompt();
    const choiceResult = await installPromptEvent.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('The app was installed');
    } else {
      console.log('The app installation was cancelled');
    }

    installPromptEvent = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('The app was installed successfully');
});

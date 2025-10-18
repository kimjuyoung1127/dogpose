// registerServiceWorker.js
// Function to register the service worker for PWA functionality

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Function to check if the app is running as PWA
export const isRunningAsPWA = () => {
  return (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true);
};

// Function to prompt user to install PWA
export const showInstallPrompt = () => {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button or UI element
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
    }
  });
};
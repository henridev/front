if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.setConfig({
      debug: true,
    });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );

    const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
      'smartTracer',
      {
        maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
      }
    );

    workbox.routing.registerRoute(
      'https://api.ipify.org?format=json',
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
      }),
      'GET'
    );

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}

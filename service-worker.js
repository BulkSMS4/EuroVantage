const CACHE_NAME = "eurovantage-cache-v1";

// List all assets to cache
const ASSETS_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  // CSS & JS inline files are usually cached by the HTML automatically,
  // but if you move them to separate files, list them here
  // Images
  "https://i.postimg.cc/2y9bgmsX/file-000000003a4071f589514f7a31460156-(1).png",
  "https://i.postimg.cc/sDTwDrJS/file-00000000b6d471f8b68cb9c69408ef3e.png",
  "https://i.postimg.cc/90yXHWNk/1000164571_removebg_preview.png",
  "https://i.postimg.cc/65WYv75p/1000164566_removebg_preview.png",
  "https://i.postimg.cc/PqRH8skK/1000164254-removebg-preview.png",
  "https://i.postimg.cc/9fWrCqdw/1000164841_removebg_preview.png",
  "https://spunout.ie/wp-content/uploads/2023/09/Young_person_working_in_bar-945x630.jpg",
  "https://plus.unsplash.com/premium_photo-1661932816149-291a447e3022?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjdG9yeSUyMHdvcmtlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKepq5PVj2Yz3bEHb7yCAEjoUx8DV-Fqfw20UQ8_JibxbRPuauZ0B3I5I&s=10",
  "https://cargotransporters.com/wp-content/uploads/2024/08/cdl-a-driving-jobs-home-weekly-greater-charlotte-nc-1024x608.webp"
  // Add more images from your hero section, testimonials, etc.
];

// Install event: cache all assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch event: respond from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => {
        // fallback image or offline page if desired
      });
    })
  );
});

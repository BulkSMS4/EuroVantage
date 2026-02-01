const CACHE_NAME = "eurovantage-cache-v1";

// FULL list of all assets used on your site
const ASSETS_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/service-worker.js",

  // CSS & JS inline files are already in HTML, no need to cache separately unless external
  // Hero images & logos
  "https://i.postimg.cc/2y9bgmsX/file-000000003a4071f589514f7a31460156-(1).png",
  "https://i.postimg.cc/sDTwDrJS/file-00000000b6d471f8b68cb9c69408ef3e.png",

  // Team members
  "https://i.pinimg.com/736x/a4/1d/f7/a41df7e7a22c6653bf3f75da1a0207e0.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl3s9YIxhTwn821V8hT1X8nDDgwor3P_Pn2UUSCi2OCA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTW81Fw3tsOFIIiXhBdcFv0vlNtCZaO7z-OznCy3CxmQ&s=10",
  "https://www.pasaco.pl/wp-content/uploads/2023/05/Oferta-outsourcingu-procesow-logistycznych_1-1-1280x1171.jpg",
  "https://thesuperyachtchef.com/wp-content/uploads/2021/09/milliewood3.jpg?s=612x612",

  // Job images
  "https://i.postimg.cc/9fWrCqdw/1000164841_removebg_preview.png",
  "https://spunout.ie/wp-content/uploads/2023/09/Young_person_working_in_bar-945x630.jpg",
  "https://plus.unsplash.com/premium_photo-1661932816149-291a447e3022?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjdG9yeSUyMHdvcmtlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKepq5PVj2Yz3bEHb7yCAEjoUx8DV-Fqfw20UQ8_JibxbRPuauZ0B3I5I&s=10",
  "https://cargotransporters.com/wp-content/uploads/2024/08/cdl-a-driving-jobs-home-weekly-greater-charlotte-nc-1024x608.webp",

  // Agent images (floating button & list)
  "https://i.postimg.cc/90yXHWNk/1000164571_removebg_preview.png",
  "https://i.postimg.cc/65WYv75p/1000164566_removebg_preview.png",
  "https://i.postimg.cc/PqRH8skK/1000164254-removebg-preview.png",

  // Slideshow images
  "https://media.istockphoto.com/id/2150678874/photo/young-woman-boarding-an-airplane.jpg?s=612x612&w=0&k=20&c=z6ITYmSyNg2Tje2ZzaOk3o_aAsKT-hfz9JHSwGHW3J8=",
  "https://img.freepik.com/free-photo/medium-shot-smiley-couple-with-documents_23-2149272139.jpg?semt=ais_hybrid&w=740&q=80",
  "https://media.istockphoto.com/id/1264246753/photo/ready-for-vacasion-excited-black-spouses-posing-near-airport-with-passports.jpg?s=612x612&w=0&k=20&c=_hFNcvH7snmw2EutkHXyFCrCL8sOg4XaaSxmnQ4PymU=",

  // Testimonial avatars (randomuser.me API)
  "https://randomuser.me/api/portraits/men/0.jpg",
  "https://randomuser.me/api/portraits/women/0.jpg",
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
  "https://randomuser.me/api/portraits/men/8.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/women/9.jpg"
];

// INSTALL: cache all assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching all assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Deleting old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// FETCH: serve cached assets, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => {
        // Optional: fallback offline page or image
      });
    })
  );
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" }
    ]
  },
  async redirects() {
    return [
      { source: "/guides/fate-trigger-release-date-tracker", destination: "/release-date", permanent: true },
      { source: "/guides/floating-arena-route-guide", destination: "/maps", permanent: true },
      { source: "/guides/floating-map-landing-zones", destination: "/maps", permanent: true },
      { source: "/guides/vertical-map-mistakes", destination: "/maps", permanent: true },
      { source: "/guides/first-day-route-plan", destination: "/maps", permanent: true },
      { source: "/guides/best-weapons-to-learn-first", destination: "/weapons", permanent: true },
      { source: "/guides/best-awakeners-for-beginners", destination: "/characters", permanent: true },
      { source: "/guides/solo-queue-awakener-picks", destination: "/characters", permanent: true },
      { source: "/guides/squad-composition-guide", destination: "/characters", permanent: true },
      { source: "/guides/boss-fight-third-party-guide", destination: "/beginner", permanent: true },
      { source: "/guides/gun-chip-build-scenarios", destination: "/gun-chip", permanent: true },
      { source: "/guides/gun-chip-progression-planning", destination: "/gun-chip", permanent: true },
      { source: "/guides/fally-tata-bibi-character-watch", destination: "/characters", permanent: true },
      { source: "/guides/fally-tata-bibi-role-comparison", destination: "/characters", permanent: true },
      { source: "/database/characters/fally", destination: "/characters/fally", permanent: true },
      { source: "/database/characters/tata-and-bibi", destination: "/characters/tata-and-bibi", permanent: true },
      { source: "/database/weapons/gun-chip-system", destination: "/gun-chip", permanent: true },
      { source: "/database/lore/platform-watch", destination: "/guides/ps5-steam-platform-choice-guide", permanent: true },
      { source: "/database/lore/omnisight", destination: "/guides/omnisight-anti-cheat-fair-play-guide", permanent: true },
      { source: "/database/lore/paleblight", destination: "/lore", permanent: true },
      { source: "/rankings", destination: "/characters", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;

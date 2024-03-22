/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'image.tmdb.org',
            },
            {
                protocol: "https",
                hostname: 'img.clerk.com',
            },
            {
                protocol: "https",
                hostname: "tgs-song-files.s3.us-east-1.amazonaws.com"
            }

        ]
    }
};

module.exports = nextConfig;

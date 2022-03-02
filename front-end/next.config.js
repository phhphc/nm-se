module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL+":path*"//'http://127.0.0.1:8000/api/:path*',
            },
        ]
    },
}
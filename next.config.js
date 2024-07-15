/** @type {import('next').NextConfig} */


export async function redirects() {
    return [
        {
            source: '/',
            destination: '/login',
            permanent: true,
        },
    ];
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/'], // Add any paths you don't want indexed here
        },
        sitemap: 'https://jeyadeepak.me/sitemap.xml', // Replace with your actual domain
    };
}

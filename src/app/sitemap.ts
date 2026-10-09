import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{ 
    const baseUrl = 'https://dataworldadventures.com'

    //static pages
    return [ 
        { 
            url: baseUrl,
            lastModified: new Date(), 
            changeFrequency: 'monthly', 
            priority: 1 
        },
        { 
            url: `${baseUrl}/creators/shirley`,
            lastModified: new Date(), 
            changeFrequency: 'monthly', 
            priority: 0.8 
        },
        { 
            url: `${baseUrl}/books/alex-data-twin`,
            lastModified: new Date(), 
            changeFrequency: 'monthly', 
            priority: 0.8 
        },
        { 
            url: `${baseUrl}/privacy`,
            lastModified: new Date(), 
            changeFrequency: 'yearly', 
            priority: 0.3 
        },
        { 
            url: `${baseUrl}/impressum`,
            lastModified: new Date(), 
            changeFrequency: 'yearly', 
            priority: 0.3 
        },
    ]
}
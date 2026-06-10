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
            url: `${baseUrl}/books`,
            lastModified: new Date(), 
            changeFrequency: 'monthly', 
            priority: 0.8 
        },
        { 
            url: `${baseUrl}/creators`,
            lastModified: new Date(), 
            changeFrequency: 'monthly', 
            priority: 0.8 
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
    ]
}
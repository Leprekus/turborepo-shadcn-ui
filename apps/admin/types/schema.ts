import { z } from 'zod';


export const Schema_File = z.object({
    mimeType: z.string(),
    encryptedId: z.string(),
    name: z.string(),
    trashed: z.boolean(),
    modifiedTime: z.string(),
    fileExtension: z.string().optional(),
    encryptedWebContentLink: z.string().optional().nullable(),
    size: z.coerce.number().optional(),
    thumbnailLink: z.string().url().optional().nullable(),
    imageMediaMetadata: z
        .object({
            width: z.coerce.number(),
            height: z.coerce.number(),
            rotation: z.coerce.number().optional(),
        })
        .optional()
        .nullable(),
    videoMediaMetadata: z
        .object({
            width: z.coerce.number(),
            height: z.coerce.number(),
            durationMillis: z.coerce.number(),
        })
        .optional()
        .nullable(),
});

export type GDriveFile = z.infer<typeof Schema_File>

export const Schema_Config_API = z.object({
    rootFolder: z.string(),
    isTeamDrive: z.boolean(),
    sharedDrive: z.string().optional(),
    defaultQuery: z.array(z.string()),
    defaultField: z.string(),
    defaultOrder: z.string(),
    itemsPerPage: z.number().positive(),
    searchResult: z.number().positive(),
    proxyThumbnail: z.boolean(),
    streamMaxSize: z.number(),

    specialFile: z.object({
        password: z.string(),
        readme: z.string(),
        banner: z.string(),
    }),
    hiddenFiles: z.array(z.string()),

    allowDownloadProtectedFile: z.boolean(),
    temporaryTokenDuration: z.number().positive(),
    maxFileSize: z.number().positive(),
});

export const Schema_Config_Site = z.object({
    siteName: z.string(),
    siteNameTemplate: z.string().optional().default('%s'),
    siteDescription: z.string(),
    siteIcon: z.string(),
    siteAuthor: z.string().optional().default('mbaharip'),
    favIcon: z.string(),
    robots: z.string().optional().default('noindex, nofollow'),
    twitterHandle: z.string().optional().default('@__mbaharip__'),

    showFileExtension: z.boolean().optional().default(false),

    footer: z.string().array().optional(),

    privateIndex: z.boolean().optional().default(false),
    breadcrumbMax: z.number(),

    toaster: z
        .object({
            position: z.enum([
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
            ]),
            duration: z.number().positive(),
        })
        .optional()
        .default({
            position: 'top-right',
            duration: 5000,
        }),

    navbarItems: z.array(
        z.object({
            //icon: z.enum(Object.keys(icons) as [keyof typeof icons]),
            name: z.string(),
            href: z.string(),
            external: z.boolean().optional().default(false),
        })
    ),
    supports: z.array(
        z.object({
            name: z.string(),
            currency: z.string(),
            href: z.string(),
        })
    ),
});

export const Schema_Config = z.object({
    version: z.string(),
    basePath: z.string(),
    cacheControl: z.string(),
    showDeployGuide: z.boolean(),

    apiConfig: Schema_Config_API,

    siteConfig: Schema_Config_Site,
});

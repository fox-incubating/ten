export type Options = {
    dir: string,
    command: 'build' | 'serve' | 'new',
    clean: boolean,
    verbose: boolean
}

export type Page = {
    inputFile: string,
    inputUri: string,
    tenFile: typeof TenFile,
    tenRoute: typeof TenRoute,
    parameters: Record<PropertyKey, any>,
    outputUri: string
}

export type Frontmatter = {
    title?: string,
    author?: string,
    date?: string,
    layout?: string,
    slug?: string,
    categories?: string[],
    tags?: string[]
}

export type Config = {
    defaults: {
        title: string,
        layout: string,
        rootDir: string,
        cacheFile: string,
        contentDir: string,
        layoutDir: string,
        partialDir: string,
        staticDir: string,
        outputDir: string
    }

    transformUri(uri: string): string,

    getLayout(config: Config, options: Options, page: Page): string | Promise<string>,

    validateFrontmatter(inputFile: string, frontmatter: Frontmatter): Frontmatter,

    handlebarsHelpers: Record<string, () => string>,

    tenHelpers: Record<string, () => string>,
}

export type TenFile = {
    Meta?({ config: Config, options: Options }): Promise<TenJsMeta>

    Header?({ config: Config, options: Options }): Promise<string>

    GenerateSlugMapping?({ config: Config, options: Options }): Promise<TenJsSlugMapping>

    GenerateTemplateVariables?({ config: Config, options: Options}): Promise<Record<PropertyKey, any>>
}

export type TenRoute = {
    slug?: string
}

type TenJsMeta = {
    slug?: string,
    layout?: string
}

type TenJsSlugMapping = Array<{
    slug: string,
    count: number
}>

export {}

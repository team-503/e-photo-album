export class UrlConfig {
    private static authPrefix = '/auth'
    private static appPrefix = '/app'

    public static main = {
        label: 'Home',
        url: '/',
    }

    public static notFound = {
        label: '404',
        url: '/not-found',
    }
    public static error = {
        label: 'Error',
        url: '/error',
    }

    public static auth = {
        label: 'Auth',
        url: UrlConfig.authPrefix,
    }
    public static login = {
        label: 'Login',
        url: `${UrlConfig.authPrefix}/login`,
        register: {
            label: 'Реєстрація',
            url: `${UrlConfig.authPrefix}/register`,
        },
    }
    public static register = {
        label: 'Register',
        url: `${UrlConfig.authPrefix}/register`,
    }

    public static app = {
        label: 'App',
        url: UrlConfig.appPrefix,
    }
    public static albumId = {
        label: 'Album',
        url: `${UrlConfig.appPrefix}/album/:id`,
        getDynamicUrl: (id: string | number): string => `${UrlConfig.appPrefix}/album/${id}`,
    }
}

export class UrlConfigApi {
    private static apiUrl = import.meta.env.VITE_API_URL

    public static image = {
        getDynamicUrl: (id: string | number): string => `${this.apiUrl}/image/${id}`,
    }
    public static imagePreview = {
        getDynamicUrl: (id: string | number): string => `${this.apiUrl}/image/${id}/preview`,
    }
    public static imageDownload = {
        getDynamicUrl: (id: string | number): string => `${this.apiUrl}/image/${id}/download`,
    }
}

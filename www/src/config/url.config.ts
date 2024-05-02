export class UrlConfig {
    private static authPrefix = '/auth'
    private static appPrefix = '/app'

    public static main = {
        label: 'Головна',
        url: '/',
    }

    public static notFound = {
        label: '404',
        url: '/not-found',
    }

    public static error = {
        label: 'Помилка',
        url: '/error',
    }

    public static login = {
        label: 'Вхід',
        url: `${UrlConfig.authPrefix}/login`,
        register: {
            label: 'Реєстрація',
            url: `${UrlConfig.authPrefix}/register`,
        },
    }

    public static register = {
        label: 'Реєстрація',
        url: `${UrlConfig.authPrefix}/register`,
    }

    public static app = {
        label: 'Додаток',
        url: `${UrlConfig.appPrefix}`,
    }
}

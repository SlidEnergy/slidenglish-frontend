import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Configuration, ConfigurationParameters } from '../api';

// Конфигурация для модуля ApiModule
export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        // Передаем пустой объект, чтобы в сгенерированном коде не было ошибок
        apiKeys: {},
        accessToken: () => {
            let token = AuthService.getAccessToken();

            if (!token) {
                throw new Error('Пользователь не авторизован');
            }

            return token;
        },
        basePath: environment.BASE_API_URL
    };
    return new Configuration(params);
}
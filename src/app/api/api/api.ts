export * from './token.service';
import { TokenService } from './token.service';
export * from './translate.service';
import { TranslateService } from './translate.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './words.service';
import { WordsService } from './words.service';
export const APIS = [TokenService, TranslateService, UsersService, WordsService];

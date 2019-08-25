import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from "../../../environments/environment";
import {ApolloLink, concat} from "apollo-link";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

const uri = environment.BASE_API_URL + '/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
    const http = httpLink.create({ uri });
    const authMiddleware = new ApolloLink((operation, forward) => {
        let token = AuthService.getAccessToken();

        if (!token) {
            throw new Error('Пользователь не авторизован');
        }
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        });

        return forward(operation);
    })
  return {
    link: concat(authMiddleware, http),
    cache: new InMemoryCache({
        addTypename: false
    })
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

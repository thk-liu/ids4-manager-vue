import Vue from 'vue'
import { client_detail } from '@/api/administration/identity'

const client = {
    state: {
        clientInfo: { clientSecrets: [], claims: [] },
        clientSecrets: [],
        apiResources: {
            id: undefined,
            name: "",
            displayName: "",
            description: "",
            enabled: true,
            userClaims: [],
            properties: {},
            scopes: [],
            secrets: []
        }
    },
    mutations: {
        SET_CLIENT: (state, client) => {
            state.clientInfo = client;
            // state.clientSecrets = client.clientSecrets;
            // console.log('set_client', client);
            // console.log('state.clientSecrets',state.clientSecrets);

        },
        SET_Secrets(state, secrets) {
            state.clientSecrets = secrets;
        },
        SET_ApiResources(state, apiResources) {
            state.apiResources = apiResources;
        }

    },
    actions: {
        GetClient({ commit }, id) {
            return new Promise((resolve, reject) => {
                client_detail(id).then(response => {
                    commit('SET_CLIENT', response)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetApiResources({ commit }, apiResources) {
            commit('SET_ApiResources', apiResources)

        },
        SetSecrets({ commit }, secrets) {
            commit('SET_Secrets', secrets)
        },
        NewClient({ commit }) {
            var client = {
                clientId: "",
                clientName: "",
                description: "",
                clientUri: null,
                logoUri: null,
                enabled: true,
                protocolType: "oidc",
                requireClientSecret: true,
                requireConsent: false,
                allowRememberConsent: true,
                alwaysIncludeUserClaimsInIdToken: true,
                requirePkce: false,
                allowPlainTextPkce: false,
                allowAccessTokensViaBrowser: false,
                frontChannelLogoutUri: null,
                frontChannelLogoutSessionRequired: true,
                backChannelLogoutUri: null,
                backChannelLogoutSessionRequired: true,
                allowOfflineAccess: true,
                identityTokenLifetime: 300,
                accessTokenLifetime: 31536000,
                authorizationCodeLifetime: 300,
                consentLifetime: 0,
                absoluteRefreshTokenLifetime: 31536000,
                slidingRefreshTokenLifetime: 1296000,
                refreshTokenUsage: 1,
                updateAccessTokenClaimsOnRefresh: false,
                refreshTokenExpiration: 1,
                accessTokenType: 0,
                enableLocalLogin: true,
                includeJwtId: false,
                alwaysSendClientClaims: true,
                clientClaimsPrefix: "client_",
                pairWiseSubjectSalt: null,
                userSsoLifetime: null,
                userCodeType: null,
                deviceCodeLifetime: 300,
                clientSecrets: [],
                allowedScopes: [],
                claims: [],
                allowedGrantTypes: [],
                identityProviderRestrictions: [],
                properties: [],
                allowedCorsOrigins: [],
                redirectUris: [],
                postLogoutRedirectUris: [],
                id: undefined
            }
            commit('SET_CLIENT', client)
        }
    }

}

export default client
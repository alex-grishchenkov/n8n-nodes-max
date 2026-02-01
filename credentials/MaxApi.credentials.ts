import type { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * Max messenger API credentials configuration for n8n
 *
 * This class defines the credential type for Max messenger Bot API integration.
 * It provides secure storage for bot access tokens and API configuration.
 *
 * @implements {ICredentialType}
 */
export class MaxApi implements ICredentialType {
    /** Unique identifier for this credential type */
    name = 'maxApi';

    /** Display name shown in the n8n UI */
    displayName = 'Max API';

    /** Icon file reference for the credential type */
    icon: Icon = 'file:max.svg';

    /** URL to the official Max messenger Bot API documentation */
    documentationUrl = 'https://dev.max.ru/docs/chatbots/bots-coding/library/js';

    /**
     * Configuration properties for Max messenger API credentials
     * Defines the input fields shown to users when configuring credentials
     */
    properties: INodeProperties[] = [
        {
            displayName: 'Access Token',
            name: 'accessToken',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description:
                'Bot access token obtained from @MasterBot in Max messenger. Follow the instructions at https://dev.max.ru/docs/chatbots/bots-coding/prepare to get your token.',
        },
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://botapi.max.ru',
            description: 'Use https://platform-api.max.ru for the current MAX API (recommended), or https://botapi.max.ru for legacy',
        },
    ];

    /**
     * Credential test configuration to validate the provided credentials
     * Makes a request to the Max API /me endpoint to verify token validity.
     * platform-api.max.ru: use Authorization header only (query not supported).
     * botapi.max.ru (legacy): use access_token in query.
     * Send both so either API accepts (platform uses header, botapi uses qs).
     */
    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl}}',
            url: '/me',
            headers: {
                Authorization: '=Bearer {{$credentials.accessToken}}',
            },
            qs: {
                access_token: '={{$credentials.accessToken}}',
            },
        },
    };
}

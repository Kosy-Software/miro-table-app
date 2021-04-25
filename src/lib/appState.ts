import type { ClientInfo } from '@kosy/kosy-app-api/types';

export interface AppState {
    miroUrl?: string;
}

export interface ComponentState extends AppState {
    /// Immutable, represents the parent kosy client
    currentClient: ClientInfo;
    /// Immutable, represents the kosy client that started the app
    initializer: ClientInfo;
}
export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};

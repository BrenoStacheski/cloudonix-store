const TOKEN_KEY = '@auth-token';

export class TokenMethodsUtils {
  static signOut(): void {
    sessionStorage.clear();
  }

  static saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}

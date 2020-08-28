export default class cookieService {
  private currentCookies = document.cookie;

  public async getCookie(cookieName: string) {
    if (
      this.currentCookies
        .split(";")
        .some((item) => item.trim().startsWith(`${cookieName}=`))
    ) {
      const result = this.currentCookies
        ?.split("; ")
        ?.find((row) => row.startsWith(`${cookieName}`))
        ?.split("=")[1];

      return result;
    } else {
      return null;
    }
  }

  public removeCookie(cookieName: string) {
    document.cookie = cookieName + "=; Max-Age=-99999999;";
  }
}

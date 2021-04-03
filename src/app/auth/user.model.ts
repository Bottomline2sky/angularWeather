export class UserModel{

  constructor( private _id: string,
               private email: string,
               private       token: string,
               private tokenExpDate: string) {
  }

  get getToken() {
    if(this.token == null) {
      return null;
    }
    else {
      if(+this.tokenExpDate< new Date().getTime()){
        return null;
      }
      else {
        return this.token
      }}}

}

export interface IUser {
  email: string;
  lastName: string;
  firstName: string;
}

class User {
  email: string;
  firstName:string;
  lastName:string;

  constructor(props:IUser) {
    this.email = props.email
    this.firstName = props.firstName
    this.lastName = props.lastName
  }
}

export default User
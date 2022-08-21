import {ref} from "vue";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export class Userinfo {
  name = ref()
  nameRef = ref()
  age = ref()
  ageRef = ref()
  id = ref()
  idRef = ref()
  nickname = ref()
  nicknameRef = ref()
  phone = ref()
  phoneRef = ref()
  password = ref()
  passwordRef = ref()
  isPwd = ref()
  repassword = ref()
  repasswordRef = ref()
  accept = ref(false)

  //ts的构造器只能有一个
  SetItem(values: any) {
    this.name = values.name
    this.nameRef = values.nameRef
    // this.age = values.age
    // this.ageRef = values.ageRef
    this.id = values.id
    this.idRef = values.idRef
    this.nickname = values.nickname
    this.nicknameRef = values.nicknameRef
    this.phone = values.phone
    this.phoneRef = values.phoneRef
    this.password = values.password
    this.passwordRef = values.passwordRef
    this.isPwd = values.isPwd
    this.repassword = values.repassword
    this.repasswordRef = values.repasswordRef
  }

  clearall() {
    this.name.value = ''
    this.age.value = ''
    this.id.value = ''
    this.idRef.value = ''
    this.nicknameRef.value = ''
    this.nickname.value = ''
    this.passwordRef.value = ''
    this.password.value = ''
    this.repassword.value = ''
    this.repasswordRef.value = ''
    this.phoneRef.value = ''
    this.phone.value = ''
    this.nameRef.value = ''
    this.ageRef.value = ''
    this.accept.value = false
  }
}

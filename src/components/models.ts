import {ref} from "vue";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export class Iteminfo {
  id = ref()
  idRef = ref()
  title = ref()
  titleRef = ref()
  description = ref()
  descriptionRef = ref()
  price = ref()
  priceRef = ref()
  userid = ref()
  useridRef = ref()
  accept = ref(false)

  SetItem(value: Iteminfo) {
    Object.assign(this, value)
    this.id = value.id
    this.idRef = value.idRef
    this.title = value.title
    this.titleRef = value.titleRef
    this.description = value.description
    this.descriptionRef = value.descriptionRef
    this.price = value.price
    this.priceRef = value.priceRef
    this.userid = value.userid
    this.useridRef = value.useridRef
  }

  clearall() {
    this.id.value = ''
    this.idRef.value = ''
    this.title.value = ''
    this.titleRef.value = ''
    this.description.value = ''
    this.descriptionRef.value = ''
    this.price.value = ''
    this.priceRef.value = ''
    this.userid.value = ''
    this.useridRef.value = ''
    this.accept.value = false
  }
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

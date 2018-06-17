import { AbstractControl } from "@angular/forms"

export const passwordRetypeMatcher = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const password = control.get("password")
  const confirmpassword = control.get("passwordRetype")
  if (!password || !confirmpassword) {
    return null
  }
  if (password.value === confirmpassword.value) {
    return null
  } else {
    return { confirmnomatch: true }
  }
}

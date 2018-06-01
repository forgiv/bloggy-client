export const required = val => (val ? undefined : 'Required')
export const nonEmpty = val =>
  val.trim().length !== 0 ? undefined : 'Required'

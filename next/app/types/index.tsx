export interface User {
  id: number
  email: string
  name: string | null // 名前がオプショナルである可能性を考慮
}

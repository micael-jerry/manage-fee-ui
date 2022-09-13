export type StudentType = {
    id: number,
    ref: string,
    lastname: string,
    firstname: string | null,
    sex: string,
    birthDate: string,
    address: string | null,
    phone: string | null,
    email: string | null,
    entranceDate: string,
    group: GroupType,
    username: string | null,
    password: string | null
    role: string
}

export type GroupType = {
    id: number,
    name: string,
    description: string | null
}

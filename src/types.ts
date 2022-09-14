export type StudentType = {
    id: number | null,
    ref: string,
    lastname: string,
    firstname: string | null,
    sex: string,
    birthDate: string,
    address: string | null,
    phone: string | null,
    email: string | null,
    entranceDate: string,
    groups: GroupType | null,
    username: string | null,
    password: string | null
    role: string
}

export type GroupType = {
    id: number,
    name: string,
    description: string | null
}

export type FeeType = {
    id: number,
    type: string,
    description: string | null,
    totalAmount: number,
    remainingAmount: null,
    student: StudentType,
    schoolYear: SchoolYearType
}

export type SchoolYearType = {
    id: number,
    startYear: string,
    endYear: string
}


export type BasicAuth = {
    username: string | null,
    password: string | null
}

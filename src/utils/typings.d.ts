interface StudentInfo {
    '班级': string,
    '姓名': string,
    '学院': string,
    '学号': string,
    '辅导员': string,
}

interface ClassInfoList {
    '班级': string,
    info: StudentInfo[]
}

interface DocBuilderParam {
    college: string,
    year: number,
    classInfoList: ClassInfoList[],
    trainDateList: Date[],
    signDate: Date,
    reason: "ACM集训队训练" | string,
    conflictWith: "晚自习" | "上课" | string,
    alignName: boolean
}

interface genDocParams {
    jsonStr: string,
    year: number,
    trainDateList: Date[],
    signDate: Date
    reason: string,
    conflictWith: string,
    alignName: boolean
}
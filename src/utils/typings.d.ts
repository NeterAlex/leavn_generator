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
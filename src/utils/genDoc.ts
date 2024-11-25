/* eslint-disable @typescript-eslint/no-explicit-any */

import {buildDoc} from "./buildDoc.ts";

// 组织数据结构并构建文档
export function genDoc({jsonStr, year, trainDateList, signDate, reason, conflictWith, alignName}: genDocParams): void {
    const students: StudentInfo[] = JSON.parse(jsonStr)

    const stuGrpByCollege = students.reduce((acc: any, student) => {
        const college = student['学院']
        if (!acc[college]) acc[college] = [];
        acc[college].push(student)
        return acc;
    }, {})

    for (const college in stuGrpByCollege) {
        if (Object.hasOwnProperty.call(stuGrpByCollege, college)) {
            const collegeGroup = stuGrpByCollege[college];
            stuGrpByCollege[college] = collegeGroup.reduce((collegeAccumulator: any, student: any) => {
                const instructor = student['辅导员'];
                const className = student['班级'];
                if (!collegeAccumulator[instructor]) collegeAccumulator[instructor] = {};
                if (!collegeAccumulator[instructor][className]) collegeAccumulator[instructor][className] = [];
                collegeAccumulator[instructor][className].push(student);
                return collegeAccumulator;
            }, {});
        }
    }

    for (const college in stuGrpByCollege) {
        if (Object.prototype.hasOwnProperty.call(stuGrpByCollege, college)) {
            // 遍历当前学院下的所有辅导员
            const instructors = stuGrpByCollege[college];
            for (const instructor in instructors) {
                if (Object.prototype.hasOwnProperty.call(instructors, instructor)) {
                    // 遍历当前辅导员下的所有班级
                    const classes = instructors[instructor];
                    const classInfoList = []
                    for (const className in classes) {
                        if (Object.prototype.hasOwnProperty.call(classes, className)) {
                            const studentList: StudentInfo[] = []
                            // 遍历当前班级下的所有学生
                            const studentsInClass = classes[className];
                            studentsInClass.forEach((student: StudentInfo) => studentList.push(student));
                            classInfoList.push({'班级': className, info: studentList})
                        }
                    }
                    classInfoList.sort((a, b) => a.班级.localeCompare(b.班级))
                    buildDoc({college, year, classInfoList, trainDateList, signDate, reason, conflictWith, alignName})
                }
            }
        }
    }
}


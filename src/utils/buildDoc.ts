import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import PizZipUtils from "pizzip/utils";
import {saveAs} from 'file-saver';
import {formatDate} from "./formatDate.ts";

interface docBuilderParam {
    college: string,
    year: number,
    classInfoList: ClassInfoList[],
    trainDateList: Date[],
    signDate: Date
}

function loadFile(url: string, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
}

export function buildDoc({college, year, classInfoList, trainDateList, signDate}: docBuilderParam) {
    loadFile("/leave_note.docx", (error: Error, content: any) => {
        if (error) throw error;
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        })
        doc.render({
            college: college,
            year: year,
            student_nums: classInfoList.reduce((sum, item) => sum + item.info.length, 0),
            train_date: trainDateList.map(formatDate).join('、'),
            leave_days: trainDateList.length,
            sign_date: formatDate(signDate),
            classes: classInfoList
        });
        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        saveAs(out, `假条-${college}.docx`);
    })
}

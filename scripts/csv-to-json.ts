import Bun from 'bun';

const path = "./scripts/export.csv";
const file = Bun.file(path);

const stream = file.stream();
const decoder = new TextDecoder();
let remainingData = "";
let lines: string[] = [];

for await (const chunk of stream ) {
    const str = decoder.decode(chunk);
    remainingData += str;
    lines = remainingData.split(/\r?\n/);
}

const id = 0;
const code = 1;
const firstName = 2;
const surname = 3;
const relationships = 4;

const dataAdd = (dataArray: any[], relationNumbers: number[]) => {
    const e = {
        id: Number(dataArray[id]),
        code: dataArray[code],
        firstName: dataArray[firstName],
        surname: dataArray[surname],
        relationships: relationNumbers,
        replied: '',
        paid: false
    };
    return JSON.stringify(e);
};

const splitIdealData = (x: string | undefined) => {
    const b = x?.split(",");
    if(!b || b.length < relationships){
        return;
    }
    return b;
};

let data = '[\n';
lines.forEach((line, i) => {
   const subCSV = line.split("\"");
   const lineEnd = (lines.length-1) === i ? `\n` : `,\n`;

    const b = splitIdealData(subCSV[0]);
    if (!b) {
        return;
    }

    if (subCSV.length === 1) {
        data += dataAdd(
            b,
            b[relationships] ? [Number(b[relationships])] : [],
        ) + lineEnd;
    } else {
        //NOTE: for line with sub csv inserted at the end
        if (subCSV[1]) {
            b[relationships] = subCSV[1];
        }
        const aa = b[relationships]?.split(",");
        if(!aa) {
            return;
        }

        data += dataAdd(
            b,
            [...(aa.map((x) => Number(x)))]
        ) + lineEnd;
    }
});
data += "]";

console.log(data);

await Bun.write("./scripts/output.json", data);
const fs = require('fs');

const dateFormat = require('dateformat');

const moment = require('moment');

const argv = require('mri')(process.argv);

const FORMAT = 'dd-mm-yyyy';

const DATE_TEMPLATE = '{{Enter date}}';

const dateToHead = date => {
    return dateFormat(date, 'mmmm dS, yyyy');
}

const dateToFilename = date => {
    return `${dateFormat(date, FORMAT)}.md`;
}

const parseDate = dateString => {
    return moment(dateString, FORMAT.toUpperCase()).toDate();
}

const {
    date
} = argv;

let currentDate;

if (date) {
 currentDate = parseDate(date);
} else {
 currentDate = new Date();
}

const template = fs.readFileSync(`${__dirname}/template.md`, 'utf8');

const dateHead = dateToHead(currentDate);

const currentYear = currentDate.getFullYear().toString();

const dateFilename = dateToFilename(currentDate);

const content = template.replace(DATE_TEMPLATE, dateHead);

try {
    fs.writeFileSync(`hours/${currentYear}/${dateFilename}`, content);
} catch (e) {
    console.log(e)
}

console.log(`Created new post 'hours/${currentYear}/${dateFilename}'`);




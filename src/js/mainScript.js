//Event listener
window.addEventListener("DOMContentLoaded", function() {
    const courseForm = document.querySelector("form#fcourse");
    const courseFormSubmit = courseForm.querySelector("input#fsubmit");
    courseFormSubmit.onclick=function() {
        courseInformationSubmitCallback(courseForm);
        return false;
    };
});

const iCalParser = require("./util/iCalParser");

async function courseInformationSubmitCallback(form) {
    let symbol = form.querySelector("input#fsymbol").value;
    let year = form.querySelector("input#fyear").value;
    let semester = form.querySelector("select#fsemester").value;
    let group = form.querySelector("input#fgroup").value;
    if (group.lenght == 1) {
        group = "0" + group;
    }
    let parser = new iCalParser("C", symbol, group, year, semester);
    await parser.parse();
    console.log(parser);
}
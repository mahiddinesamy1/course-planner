window.addEventListener("DOMContentLoaded", function() {
    const courseForm = document.querySelector("form#fcourse");
    const courseFormSubmit = courseForm.querySelector("input#fsubmit");
    courseFormSubmit.onclick=function() {
        console.log(courseForm.querySelector("input#fsigle").value);
        return false;
    };
});
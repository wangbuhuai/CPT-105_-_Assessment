// Created by Dayu Wang (dwang@stchas.edu) on 2023-03-31

// Last updated by Dayu Wang (dwang@stchas.edu) on 2023-04-01


const SEMESTER = "Spring 2023";
const CLO = "The student will provide definitions of designated key terms from the field of ethics.";

/** Gets the current time.
    @returns {string}: current time in {mm/dd/yyyy hh:mm AM/PM} format
*/
now = function() {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    let hour = current.getHours();
    const amPM = hour < 12 ? "AM" : "PM";
    if (hour === 0 || hour === 12) { hour = 12; }
    else { hour %= 12; }
    let minute = current.getMinutes();
    let result = "";
    result += (month < 10 ? '0' + month.toString() : month.toString()) + '/';
    result += (date < 10 ? '0' + date.toString() : date.toString()) + '/';
    result += year.toString() + ' ';
    result += (hour < 10 ? '0' + hour.toString() : hour.toString()) + ':';
    result += (minute < 10 ? '0' + minute.toString() : minute.toString()) + ' ';
    result += amPM;
    return result;
};

const STUDENT_SCORE = "<div style='border:none;display:inline-block;margin:10pt 0 0 0;padding:0;width:49.5%;'><table style='display:inline-block;border-collapse:collapse;border:none;margin:0;line-height:normal;width:100%;'><tbody><tr><td style='border:none;padding:0;vertical-align:middle;text-align:left;font-size:11pt;color:black;background:transparent;width:93px;'><label for='student-{x}-score'>Student {x}:</label></td><td style='border:none;padding:0;vertical-align:middle;text-align:left;font-size:11pt;color:black;background:transparent;'><input id='student-{x}-score' type='number' min='0' max='10' placeholder='(Score)' style='width:269px;'></td></tr></tbody></table></div>";

document.addEventListener("DOMContentLoaded", () => {
    const semester_elements = document.getElementsByClassName("semester");
    for (let i = 0; i < semester_elements.length; i++) {
        if (semester_elements[i].hasAttribute("value")) {
            semester_elements[i].value = SEMESTER;
        } else {
            semester_elements[i].innerText = SEMESTER;
        }
    }
    const clo_elements = document.getElementsByClassName("clo");
    for (let i = 0; i < clo_elements.length; i++) {
        if (clo_elements[i].hasAttribute("value")) {
            clo_elements[i].value = CLO;
        } else {
            clo_elements[i].innerText = CLO;
        }
    }
    const student_scores = document.getElementById("student-scores");
    student_scores.innerHTML += STUDENT_SCORE.replace(/\{x}/g, "1");

    const num_of_students = document.getElementById("num-of-students");
    num_of_students.addEventListener("change", () => {
        const n = parseInt(num_of_students.value);
        student_scores.innerHTML = "";
        for (let i = 1; i <= n; i++) {
            student_scores.innerHTML += STUDENT_SCORE.replace(/\{x}/g, i.toString());
        }
    });

    const print = document.getElementById("print");
    print.addEventListener("click", () => {
        const section = document.getElementById("section").value.toString().trim();
        const instructor = document.getElementById("instructor").value.toString().trim();
        if (section === "") { alert("[Error] Missing section number"); return; }
        if (instructor === "") { alert("[Error] Missing instructor name"); return; }
        const m = parseInt(document.getElementById("num-of-students").value.toString().trim());
        for (let i = 1; i <= m; i++) {
            const stu = document.getElementById("student-" + i.toString() + "-score");
            if (stu.value.toString().trim() === "") {
                alert("[Error] Missing student " + i.toString() + "'s score");
                return;
            }
            if (parseInt(stu.value.toString().trim()) < 0 || parseInt(stu.value.toString().trim()) > 10) {
                alert("[Incorrect Score of Student " + i.toString() + "] Score must be between 0 and 10.");
                return;
            }
        }
        const time = document.getElementById("time");
        time.innerHTML += now();
        let title = "CPT-105-" + section + " (";
        title += SEMESTER.substring(SEMESTER.length - 2) + '/' + SEMESTER.toUpperCase().substring(0, 2) + ')';
        title += " - Assessment - " + instructor + " - PDF";
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(title).then();
        }
        document.title = title.replace(/\//g, '-').replace(/\s/g, '_');
        window.print();
    });
});
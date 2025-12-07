const uploadBtn = document.getElementById("upload-btn");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("finalResult");

function rejectOrResolved(progressId, dotId) {
    return new Promise((resolve, reject) => {
        const bar = document.getElementById(progressId);
        const dot = document.getElementById(dotId);

        dot.classList.remove("active", "reject");
        let progress = 0;
        let interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            bar.style.width = progress + "%";
            if (progress >= 100) {
                clearInterval(interval);

                if (Math.random() < 0.5) {
                    resolve("resolved");
                    dot.classList.add("active");
                } else {
                    reject("rejected");
                    dot.classList.add("reject");
                }
            }
        }, 50);
    })
}

uploadBtn.addEventListener("click", () => {
    submitBtn.disabled = true;
    const promises = [
        rejectOrResolved("p1", "dot1"),
        rejectOrResolved("p2", "dot2"),
        rejectOrResolved("p3", "dot3")
    ];
    Promise.all(promises).then(() => {
        result.textContent = "All are uploaded";
        submitBtn.disabled = false;
    }).catch(() => {
        result.textContent = "Few of the documents Rejected";
        submitBtn.disabled = true;
    });
});

submitBtn.addEventListener("click", () => {
    result.textContent = "All the documents are Successfully uploaded";
});


const bookingResult = document.getElementById("booking-result");
const cabBookbtn = document.getElementById("book-cab");

function cabBooking(proId, txtId) {
    return new Promise((resolve, reject) => {
        const project = document.getElementById(proId);
        const text = document.getElementById(txtId);

        project.classList.remove("success", "reject");

        if (Math.random() < 0.5) {
            resolve(txtId + " accepted the offer");
            project.classList.add("success");
        } else {
            reject(txtId + " rejected the offer");
            project.classList.add("reject");
        }
    })
}

cabBookbtn.addEventListener("click", () => {
    const promises = [
        cabBooking("pro1", "Tom"),
        cabBooking("pro2", "Jerry"),
        cabBooking("pro3", "Leon")
    ];
    Promise.any(promises).then((res) => {
        bookingResult.textContent = res;
    }).catch((err) => {
        bookingResult.textContent = "All the driver are overwhelmed at work";
    });
});


const uploadDocsBtn = document.getElementById("uploadDocs-btn");

function rejectOrResolved(progressId, dotId, txt) {
    return new Promise((resolve, reject) => {
        const bar = document.getElementById(progressId);
        const dot = document.getElementById(dotId);

        dot.classList.remove("active", "reject");
        let progress = 0;
        let interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            bar.style.width = progress + "%";
            if (progress >= 100) {
                clearInterval(interval);

                if (Math.random() < 0.5) {
                    resolve(txt + " successfully Backup!");
                    dot.classList.add("active");
                } else {
                    reject(txt + " backup process failed!");
                    dot.classList.add("reject");
                }
            }
        }, 50);
    })
}

uploadDocsBtn.addEventListener("click", () => {
    const promises = [
        rejectOrResolved("p4", "dot4", "Photos"),
        rejectOrResolved("p5", "dot5", "Contacts"),
        rejectOrResolved("p6", "dot6", "Messages"),
        rejectOrResolved("p7", "dot7", "Notes")
    ];
    Promise.allSettled(promises).then((res) => {
        console.log(res)
        backupStatus.innerHTML = res.map(e=>{
            return (e.status =="fulfilled" ? `<p style="color: lightgreen">${e.value}</p>` : `<p style="color: lightcoral">${e.reason}</p>` )
        }).join("");
    }).catch((err) => {
        backupStatus.textContent = err;
    });
});
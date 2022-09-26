var doc = document;
var win = window;
var body = doc.querySelector("body");
var index;

/********************* Onload Function Promt *************************/
win.addEventListener("load", () => {
  let indexClass = 0;
  index = prompt("Enter the Number");
  let table = doc.createElement("table");
  for (let i = 0; i < index; i++) {
    let row = doc.createElement("tr");
    for (let j = 0; j < index; j++) {
      let column = doc.createElement("td");
      indexClass += 1;
      column.classList.add(`C${indexClass}`);
      column.style.width = 100 / index + "%";
      column.style.height = 1080 / index / 2 + "px";
      row.append(column);
    }
    table.append(row);
  }

  body.append(table);

  setTimeout(() => {
    doc.querySelector(".C1").classList.add("start");
    doc.querySelector(`.C${index * index}`).classList.add("end");
  }, 1000);
});

setTimeout(() => {
  /******************** Onclick Event and Block Function ******************/
  let tdata = doc.querySelectorAll("td");
  tdata.forEach((value, index) => {
    value.addEventListener("click", (e) => {
      try {
        let currentStateClass = e.target.classList;
        if (
          currentStateClass.contains("start") ||
          currentStateClass.contains("end") ||
          currentStateClass.contains("path") ||
          currentStateClass.contains("standing") ||
          currentStateClass.contains("blocked")
        ) {
          alert("Invalid Click Event");
          return false;
        }
        e.target.classList.add("blocked");
        let availabilityArray = availabilityCheckFn();
        console.log(availabilityArray);
        availabilityArray.forEach((classValue) => {
          let checkClassAvailableOrNot = doc.querySelector(
            ".C" + classValue.toString()
          );
          // If class present in the dom tree
          if (checkClassAvailableOrNot !== null) {
            if (checkClassAvailableOrNot.classList.contains("end")) {
              alert("Game Over");
              location.reload();
              throw new Response();
            }
            if (
              !checkClassAvailableOrNot.classList.contains("path") &&
              !checkClassAvailableOrNot.classList.contains("blocked") &&
              !checkClassAvailableOrNot.classList.contains("start")
            ) {
              let standingClass = doc.querySelector(".standing");
              if (standingClass !== null) {
                standingClass.classList.remove("standing");
                standingClass.classList.add("path");
              }
              checkClassAvailableOrNot.classList.add("standing");
              throw new Response();
            }
          }
        });
        alert("Blocked! Game Over");
        location.reload();
      } catch {}
    });
  });

  /******************** Availability Check Function ***********************/
  const availabilityCheckFn = () => {
    let start = doc.querySelector(".start");
    let standing = doc.querySelector(".standing");
    let classData = standing !== null ? standing : start;
    console.log(classData);
    let className = classData.classList[0];
    console.log("className" + className);
    let classNameReplaced = parseInt(className.replace("C", ""));

    let priorityBasedArray = [
      classNameReplaced + parseInt(index) + 1,
      classNameReplaced + parseInt(index),
      classNameReplaced - 1,
      classNameReplaced + 1,
      classNameReplaced - parseInt(index) + 1,
      classNameReplaced - 1,
      classNameReplaced - parseInt(index),
      classNameReplaced - parseInt(index) - 1,
    ];

    let checkDataArr = new Array();
    for (let i = 1; i <= index; i++) {
      checkDataArr.push(parseFloat(index) * i);
    }

    if (checkDataArr.includes(priorityBasedArray[1] - 1))
      return priorityBasedArray.slice(0, 2);
    return priorityBasedArray;
  };
}, 1000);

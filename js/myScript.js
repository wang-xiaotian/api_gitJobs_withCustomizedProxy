//alert("js is active");
const gitAPI =
  "http://127.0.0.1:3000/https://jobs.github.com/positions.json?description=";

document.getElementById("createButton").addEventListener("click", (e) => {
  e.preventDefault();
  let term = document.getElementById("search_term").value;
  console.log(term);
  this.createButtonElement(term);
});

function createButtonElement(term) {
  let div = document.createElement("div");
  div.setAttribute("class", "m-2");
  let button = document.createElement("button");
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("id", term);
  button.innerHTML = term;
  div.appendChild(button);
  document.getElementById("jobSeachButtons").appendChild(div);
}

function createJobCard(
  jobTitle,
  jobType,
  jobDescription,
  applyLink,
  companyLogo,
  companyName,
  location
) {
  let divCon = document.createElement("div");
  divCon.setAttribute("class", "col-sm-3 d-flex pb-3");
  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card container-fluid");
  let imgTop = document.createElement("img");
  if (companyLogo !== null) {
    imgTop.setAttribute("src", companyLogo);
  } else {
    imgTop.setAttribute("src", "img/GitHub_Logo.png");
  }
  imgTop.setAttribute("class", "card-img-top col-md-3");
  imgTop.setAttribute("alt", companyName + " company logo");
  // imgTop.setAttribute("width", 50);
  // imgTop.setAttribute("height", 50);
  imgTop.setAttribute("object-fit", "cover");
  let divBody = document.createElement("div");
  divBody.setAttribute("class", "card-body");
  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = jobTitle;
  let jobDescrip = document.createElement("p");
  jobDescrip.setAttribute("class", "card-text");
  jobDescrip.innerHTML = `Company: ${companyName} <br> Job Type: ${jobType} <br> Job Location: ${location}`;
  let applyBN = document.createElement("a");
  applyBN.setAttribute("href", applyLink);
  applyBN.setAttribute(
    "class",
    "btn btn-primary position-absolute bottom-0 end-0 m-2"
  );
  // applyBN.setAttribute("position", "absolute");
  // applyBN.setAttribute("left", 0);
  // applyBN.setAttribute("bottom", 0);

  applyBN.innerHTML = "Apply Job";

  divBody.appendChild(cardTitle);
  divBody.appendChild(jobDescrip);
  divBody.appendChild(applyBN);
  divCard.appendChild(imgTop);
  divCard.appendChild(divBody);
  divCon.appendChild(divCard);
  return divCon;
}

document.getElementById("jobSeachButtons").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let cardDisplay = document.getElementById("jobsDisplay");
    cardDisplay.innerHTML = "";
    let id = e.target.id;
    console.log(id);
    let api = gitAPI + id;

    getResponse(api).then((e) => {
      for (let i = 0; i < e.length; i++) {
        //console.log(e[i]);
        const {
          title,
          type,
          description,
          url,
          company_logo,
          company: companyName,
          location,
        } = e[i];
        cardDisplay.appendChild(
          createJobCard(
            title,
            type,
            description,
            url,
            company_logo,
            companyName,
            location
          )
        );
      }
    });
  }
});

async function getResponse(api) {
  try {
    const res = await fetch(api);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

// const xhr = new XMLHttpRequest();
// const url = "https://bar.other/resources/public-data/";

// xhr.open("GET", url);
// xhr.onreadystatechange = someHandler;
// xhr.send();

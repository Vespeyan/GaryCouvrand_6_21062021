let filtresArray = document.getElementsByClassName("tag");
let blocMedia = document.getElementsByClassName("bloc_media");

for (let k = 0; k < filtresArray.length; k++) {
    filtresArray[k].addEventListener("click", function() {
        let tagname = filtresArray[k].innerText.replace(/[^a-zA-Z]+/g, '');
        [...blocMedia].forEach((element) => {
            if(!element.dataset.tag.includes(tagname.toLowerCase())) {
                element.style.display = "none";
            }
            else if (element.dataset.tag.includes(tagname.toLowerCase())) {
                    element.style.display = "block";
                }
            })
        })
    }

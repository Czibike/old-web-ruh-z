document.querySelector("#gomb").addEventListener("click", newWindow);

function newWindow() {
    let text = document.querySelector("#szöveg").value;
    if (text == "admin") {
        window.open("admin.html"); 
    }
}
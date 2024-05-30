let state ={
    products: [
        {
            id: idGenerator(),
            name: "hajlakk",
            price: 2000,
            isInStock: true
        },
        {
            id: idGenerator(),
            name: "hajkrém",
            price: 2150,
            isInStock: false
        },
        {
            id: idGenerator(),
            name: "sampon",
            price: 1190,
            isInStock: true
        },
        {
            id: idGenerator(),
            name: "kenőcs",
            price: 1190,
            isInStock: true
        }
    ],
    changeProductId: ""
}

window.onload = renderProducts()

function idGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function renderEditProduct() {
    let foundproduct;
    for (const product of state.products) {
        if (product.id === state.changeProductId) {
            foundproduct = product;
            break;
        }
    };

    let change = `
    <form>
        <div class="container">
            <div class="input">
                <label for="name">Termék neve:</label>
                <input type="text" name="termék neve" id="name-changed" value="${foundproduct.name}">
            </div>
            <div class="input">
                <label for="price">Termék ára:</label>
                <input type="number" name="ár" id="price-changed" value="${foundproduct.price}">
            </div>
            <div class="center">
                <input type="checkbox" name="stock" id="isInStock-changed" ${foundproduct.isInStock ? "checked" : ""}>
                <label for="stock">Van készleten?</label>
            </div>
            <div class="center">
                <input type="button" value="Küldés" id="button" class="update-change">
            </div>
        </div>
    </form>
    `;
    document.querySelector(".js-change").innerHTML = change;

    document.querySelector(".update-change").addEventListener("click", updateProduct);
    function updateProduct(event) {
        event.preventDefault();
        
        let name = document.getElementById("name-changed").value;
        let price = document.getElementById("price-changed").value;
        let isInStock = document.getElementById("isInStock-changed").checked;
        let foundIndex;
        
        for (let index = 0; index < state.products.length; index++) {

            if (state.products[index].id === state.changeProductId) {
                foundIndex = index;
                break;
            }
        }

        state.products[foundIndex] = {
            id: state.changeProductId,
            name: name,
            price: price,
            isInStock: isInStock
        };
        renderProducts();
        setTimeout(() => {
            document.querySelector(".js-change").innerHTML = "";
        }, 500);
    };
}

function renderProducts() {
    let html = "";
    for (let product of state.products) {
        html += `
        <div class="card ${ product.isInStock ? "bg-default" : "bg-red" }">
            <p> ${ product.name } </p>
            <p>${ product.price }Ft</p>
            <button class="change-product bg-orange" data-productid="${product.id}">szerkesztés</button>
            <button class="delete-product" data-productid="${product.id}">Törlés</button>
        </div>
        `;
    }

    document.querySelector(".js-container").innerHTML = html;

    for (let changeBtn of document.querySelectorAll(".change-product")) {

        changeBtn.addEventListener("click", cBtnSelect);

        function cBtnSelect(event) {
            event.preventDefault();
            state.changeProductId = event.target.dataset.productid;
            renderEditProduct();
        }
    }

    for (let deleteBtn of document.querySelectorAll(".delete-product")) {

        deleteBtn.addEventListener("click", btnSelect);

        function btnSelect(event) {
            let id = event.target.dataset.productid;
            let foundIndex;

            for (let index = 0; index < state.products.length; index++) {

                if (state.products[index].id === id) {
                    foundIndex = index;
                    break;
                }
            }
            state.products.splice(foundIndex, 1);
            renderProducts()
        }
    }

}

document.getElementById("button").addEventListener("click", addNewProduct) 

function addNewProduct(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let isInStock = document.getElementById("isInStock").checked;

    state.products.push({
        id: idGenerator(),
        name: name,
        price: price,
        isInStock: isInStock
    });

    renderProducts();
}


const CATEGORY = [
    {
        id: 1,
        value: 'Điện thoại',
    },
    {
        id: 2,
        value: 'Laptop',
    },
    {
        id: 3,
        value: 'Tablet'
    }
];

const MANUFACTURER = [
    {
        id: 1,
        value: 'SamSung'
    },
    {
        id: 2,
        value: 'Apple'
    },
    {
        id: 3,
        value: 'OPPO'
    }
]

let PRODUCT = [];
let dataProduct = [];
fetchAPI();
function fetchAPI() {
    $.get('http://localhost:8888/product', function (data, status) {
        if (status === 'success') {
            if (data.status === 'success') {
                console.log('data: ', data.data);
                dataProduct = data.data;
                getListData();
                alert('GET DATA SUCCESS')
            }
        }
        if (status === 'error') {
            console.log('error: ' + data.error);
        }
    })   
}

function getListData() {
    const table = document.getElementById('table_product');
    table.innerHTML = `                <thead>
    <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Info</th>
        <th scope="col">Detail</th>
        <th scope="col">Star</th>
        <th scope="col">Image</th>
        <th scope="col">NSX</th>
        <th scope="col">Category</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
    </tr>
</thead>
<tbody></tbody>`

    for (let index = 0; index < dataProduct.length; index++) {
        const element = dataProduct[index];

        const row = table.insertRow(index + 1)

        // khoi tao cac cell
        const id = row.insertCell(0);
        const name = row.insertCell(1);
        const price = row.insertCell(2);
        const info = row.insertCell(3);
        const detail = row.insertCell(4);
        const star = row.insertCell(5);
        const image = row.insertCell(6);
        const nsx = row.insertCell(7);
        const category = row.insertCell(8);
        const editBtn = row.insertCell(9);
        const deleteBtn = row.insertCell(10);

        id.innerHTML = element.ProductId;
        name.innerHTML = element.ProductName;
        price.innerHTML = element.ProductPrice;
        info.innerHTML = element.ProductInfo;
        detail.innerHTML = element.ProductDetail;
        star.innerHTML = element.RatingStar;
        image.innerHTML = `<img src="${element.ProductImageName}" class="img-thumbnail" alt="image-${element.ProductId}">`;
        // nsx.innerHTML = MANUFACTURER.find(el => el.id == element.nsx).value;
        // category.innerHTML = CATEGORY.find(el => el.id == element.category).value;
        editBtn.innerHTML = `<button class="btn btn-danger" onclick={editProduct(${element.ProductId})}>Edit</button>`
        deleteBtn.innerHTML = `<button class="btn btn-warning">Delete</button>`
    }
}

function openFormProduct() {
    $('#modalProductLabel').text('Thêm sản phẩm');
    $('#modalProduct').modal('toggle');
}

function resetForm() {
    $('#form-product').trigger("reset");
};

$(document).ready(function () {
    $('#categoryProduct').append(`<option>Select blank</option>`);
    for (let index = 0; index < CATEGORY.length; index++) {
        const element = CATEGORY[index];
        $('#categoryProduct').append(`<option value=${element.id}>${element.value}</option>`);
    }
    $('#nsxProduct').append(`<option>Select blank</option>`);
    for (let index = 0; index < MANUFACTURER.length; index++) {
        const element = MANUFACTURER[index];
        $('#nsxProduct').append(`<option value=${element.id}>${element.value}</option>`);
    }

    $("#form-product").submit(function (event) {
        event.preventDefault();
        const id = $('#idProduct').val();
        const name = $('#nameProduct').val();
        const price = $('#priceProduct').val();
        const info = $('#infoProduct').val();
        const detail = $('#detailProduct').val();
        const star = $('#starProduct').val();
        const image = $('#imageProduct').val();
        const category = $('#categoryProduct').val();
        const nsx = $('#nsxProduct').val();
        const dataForm = {
            ProductId: id,
            ProductName: name,
            ProductPrice: price,
            ProductInfo: info,
            ProductDetail: detail,
            RatingStar: star,
            ProductImageName: image,
            ManufacturerId: category,
            CategoryId: nsx,
        }

        // const listProduct = JSON.parse(window.localStorage.getItem('listProduct')) || [];
        // listProduct.push(dataForm);
        // window.localStorage.setItem("listProduct", JSON.stringify(listProduct));
        $.post('http://localhost:8888/product', dataForm, function (data, status) {
            console.log('data: ', data);
            if (status === 'success') {
                alert('SUCCESS');
                fetchAPI();
            }
        });
    })
});

function editProduct(id) {
    $.get(`http://localhost:8888/product/${id}`, function (data, status) {
        if (status === 'success') {
            if (data.status === 'success') {
                const dataEdit = data.data;
                $('#modalProduct').modal('toggle');
                $('#modalProductLabel').text('Cập nhật sản phẩm');

                $('#idProduct').val(dataEdit.ProductId);
                $('#nameProduct').val(dataEdit.ProductName);
                $('#priceProduct').val(dataEdit.ProductPrice);
                $('#infoProduct').val(dataEdit.ProductInfo);
                $('#detailProduct').val(dataEdit.ProductDetail);
                $('#starProduct').val(dataEdit.RatingStar);
                $('#imageProduct').val(dataEdit.ProductImageName);
            }
        }
    })
}
// var email = localStorage.getItem('email');
// if (email === 'undefined' || email === null) {
//     window.location.href = 'login.html'
// }

function getListItem() {
    $("#list-items").empty();
    $.get('https://641c45701a68dc9e46050e0b.mockapi.io/product', function (listItemStorage, status) {
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            $("#list-items").append(`<tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.info}</td>
          <td>
            <button onclick="openEditModal(${item.id})" type="button" class="btn btn-info open-modal">Edit</button>
          </td>
          <td>
            <button onclick="removeItem(${item.id})" type="button" class="btn btn-info open-modal">Remove</button>
          </td>
        </tr>`);
        }
    })
};

function openEditModal(id) {
    $.get(`https://641c45701a68dc9e46050e0b.mockapi.io/product/${id}`, function (itemChoice, status) {
        $('#name').val(itemChoice.name);
        $('#price').val(itemChoice.price);
        $('#info').val(itemChoice.info);
        $('#modal').show();
        localStorage.setItem('idEditing', id);
    })

}

function removeItem(id) {
    $.ajax({url: `https://641c45701a68dc9e46050e0b.mockapi.io/product/${id}`, method: 'DELETE', success: function (res) {
        getListItem();
    }})
}

$(document).ready(function () {
    getListItem();
    function resetForm() {
        $('#name').val('');
        $('#price').val('');
        $('#info').val('');
    }

    $('#modal').hide();
    $(".open-modal").click(function () {
        $('#modal').show();
    })
    $('.close').click(function () {
        $('#modal').hide();
    });

    $('.add-new-button').click(function () {
        var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
        var name = $('#name').val();
        var price = $('#price').val();
        var info = $('#info').val();
        var itemData = {
            name,
            price,
            info: info,
            id: listItemStorage.length + 1
        }
        $('#modal').hide();
        listItemStorage.push(itemData);
        localStorage.setItem('listItem', JSON.stringify(listItemStorage));
        getListItem();
        resetForm();
    })

    $('.submit-button').click(function () {
        var idEditing = localStorage.getItem('idEditing');
        var name = $('#name').val();
        var price = $('#price').val();
        var info = $('#info').val();
        var itemData = {
            name,
            price,
            info,
        }
        if (idEditing) {
            // logic update
            $.ajax({
                url: `https://641c45701a68dc9e46050e0b.mockapi.io/product/${idEditing}`,
                method: 'PUT',
                data: itemData,
                success: function (res) {
                    getListItem();
                    localStorage.removeItem('idEditing');
                    console.log(res)
                }
            })
        } else {
            $.ajax({
                url : 'https://641c45701a68dc9e46050e0b.mockapi.io/product',
                method: 'POST',
                data: itemData,
                success: function (res) {
                    getListItem();
                    console.log(res)
                }
            })
        }
        $('#modal').hide();
        resetForm();
    })
})

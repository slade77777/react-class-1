// var email = localStorage.getItem('email');
// if (email === 'undefined' || email === null) {
//     window.location.href = 'login.html'
// }

function getListItem() {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    $("#list-items").empty();
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
};

function openEditModal(id) {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    var itemChoice = listItemStorage.find(item => item.id === id);
    $('#name').val(itemChoice.name);
    $('#price').val(itemChoice.price);
    $('#info').val(itemChoice.info);
    $('#modal').show();
    localStorage.setItem('idEditing', id);
}

function removeItem(id) {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    var itemChoiceIndex = listItemStorage.findIndex(item => item.id === id);
    listItemStorage.splice(itemChoiceIndex, 1);
    localStorage.setItem('listItem', JSON.stringify(listItemStorage));
    getListItem();
}

$(document).ready(function () {

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
        var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
        var idEditing = localStorage.getItem('idEditing');
        var name = $('#name').val();
        var price = $('#price').val();
        var info = $('#info').val();
        if (idEditing) {
            // logic update
            for (let i = 0; i < listItemStorage.length; i++) {
                var item = listItemStorage[i];
                if (item.id == idEditing) {
                    listItemStorage[i] = {
                        name,
                        price,
                        info,
                        id: idEditing
                    };
                }
            }
            localStorage.removeItem('idEditing');
            localStorage.setItem('listItem', JSON.stringify(listItemStorage));
        } else {
            var itemData = {
                name,
                price,
                info,
                id: listItemStorage.length + 1
            }
            listItemStorage.push(itemData);
            localStorage.setItem('listItem', JSON.stringify(listItemStorage));
        }
        $('#modal').hide();
        getListItem();
        resetForm();
    })
    getListItem();
})

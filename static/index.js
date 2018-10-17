var url = "http://localhost:8080";

$(document).ready(() => {
    $("#send-done").hide();

    $("#update-balance").click(() => {
        getBalance().then(json => {
            $("#balance").text(json);
        });
    });

    $("#create-address").click(() => {
        getNewAddress().then(json => {
            $("#new-address").text(json);
        });
    });

    $("#send-bitcoins").click(() => {
        let address = $("#send-bitcoins-address");
        let amount = $("#send-bitcoins-amount");
        sendBitcoins(address.val(), amount.val()).then(json => {
            $("#send-done").show().delay(3000).fadeOut();
            address.val("");
            amount.val("");
        });
    });

    $("#update-unspent-transactions").click(() => {
        let unspentTransactionsList = $("#unspent-transactions");
        unspentTransactionsList.empty();

        let unconfirmed = $("#unspent-transactions-unconfirmed").is(":checked");
        getUnspentTransactions(unconfirmed).then(json => {
            json.forEach(element => {
                unspentTransactionsList.append(
                    "<li class='list-group-item'>" +
                        "<pre>" + JSON.stringify(element, null, 2) + "</pre>" +
                    "</li>"
                );
            });
        });
    });
});

function getBalance() {
    return fetch(url + "/api/balance")
        .then(response => response.json())
        .catch(error => console.error(error));
}

function getNewAddress() {
    return fetch(url + "/api/newaddress")
        .then(response => response.json())
        .catch(error => console.error(error));
}

function sendBitcoins(address, amount) {
    console.log(url + "/api/send?address=" + address.toString() + "&amount=" + amount.toString())
    return fetch(url + "/api/send?address=" + address.toString() + "&amount=" + amount.toString(), {
            method: "POST"
        })
        .then(response => response.json())
        .catch(error => console.error(error));
}

function getUnspentTransactions(unconfirmed) {
    return fetch(url + "/api/unspenttransactions?unconfirmed=" + unconfirmed.toString())
        .then(response => response.json())
        .catch(error => console.error(error));
}
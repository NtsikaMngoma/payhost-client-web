function sendJSON() {
	let result = document.querySelector('.result');
	let password = document.querySelector('#password');
	let payGateId = document.querySelector('#payGateId');
	let cardExpiryDate = document.querySelector('#cardExpiryDate');
	let cardNumber = document.querySelector('#cardNumber');
	
	let email = document.querySelector('#email');
	let firstName = document.querySelector('#firstName');
	let idNumber = document.querySelector('#idNumber');
	let mobile = document.querySelector('#mobile');
	let lastName = document.querySelector('#lastName');

	let title = document.querySelector('#title');
	let cvv = document.querySelector('#cvv');

	let amount = document.querySelector('#amount');
	let transactionDate = document.querySelector('#transactionDate');

	// Creating a XHR object 
	let xhr = new XMLHttpRequest();
	let url = "http://localhost:8080/v1/transact/card-payment";

	// open a connection 
	xhr.open("POST", url, true);

	// Set the request header i.e. which type of content you are sending 
	xhr.setRequestHeader("Content-Type", "application/json");

	// Create a state change callback 
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			// Print received data from server 
			result.innerHTML = this.responseText;

		}
	};

	// Converting JSON data to string 
	var data = JSON.stringify({
		"cardPaymentRequest": {
			"account": {
				"password": password.value,
				"payGateId": payGateId.value
			},
			"cardExpiryDate": cardExpiryDate.value,
			"cardNumber": cardNumber.value,
			"customer": {
				"email": [
					email.value
				],
				"firstName": firstName.value,
				"idNumber": idNumber.value,
				"lastName": lastName.value,
				"mobile": [
					mobile.value
				],
				"title": title.value
			},
			"cvv": cvv.value,
			"redirect": {
				"notifyUrl": "http://localhost:8082/v1/payment/notify",
				"returnUrl": "http://localhost:8082/v1/payment/return"
			},
			"order": {
				"merchantOrderId": "string",
				"currency": "ZAR",
				"amount": amount.value,
				"transactionDate": transactionDate.value
			}
		}
	});

	// Sending data with the request 
	xhr.send(data);
}
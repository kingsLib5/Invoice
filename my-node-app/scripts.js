// // Fetch sales details on page load
// fetchSalesDetails();

// // Function to fetch and display sales details
// function fetchSalesDetails() {
//   fetch('/salesdetails')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       const tableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
//       tableBody.innerHTML = ''; // Clear existing rows
//       data.forEach(item => {
//         addRowToTable(item);
//       });
//     })
//     .catch(error => console.error('Error fetching sales details:', error));
// }

// // Function to handle add/edit action
// function handleActionButton() {
//   const actionButton = document.getElementById('actionButton');
//   const salesId = document.getElementById('salesId').value;
//   const productId = document.getElementById('productId').value;
//   const unitPrice = document.getElementById('unitPrice').value;
//   const quantity = document.getElementById('quantity').value;
//   const discount = document.getElementById('discount').value;

//   if (salesId) {
//     // If salesId is present, perform update
//     updateSalesDetail(salesId, productId, unitPrice, quantity, discount);
//   } else {
//     // Otherwise, perform add
//     addSalesDetail(productId, unitPrice, quantity, discount);
//   }
// }

// // Function to add a new sales detail
// function addSalesDetail(productId, unitPrice, quantity, discount) {
//   fetch('/addSalesDetail', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       productId: productId,
//       unitPrice: unitPrice,
//       quantity: quantity,
//       discount: discount,
//     }),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       fetchSalesDetails(); // Refresh table after add
//       resetForm(); // Clear form inputs
//     })
//     .catch(error => console.error('Error adding sales detail:', error));
// }

// // Function to update a sales detail
// function updateSalesDetail(salesId, productId, unitPrice, quantity, discount) {
//   fetch(`/updateSalesDetail/${salesId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       productId: productId,
//       unitPrice: unitPrice,
//       quantity: quantity,
//       discount: discount,
//     }),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       fetchSalesDetails(); // Refresh table after update
//       resetForm(); // Clear form inputs
//     })
//     .catch(error => console.error('Error updating sales detail:', error));
// }

// // Function to handle edit button click
// function handleEditButton(item, row) {
//   document.getElementById('salesId').value = item.SALESID;
//   document.getElementById('productId').value = item.PRODUCTID;
//   document.getElementById('unitPrice').value = item.UNITPRICE;
//   document.getElementById('quantity').value = item.QTY;
//   document.getElementById('discount').value = item.DISCOUNT;

//   const actionButton = document.getElementById('actionButton');
//   actionButton.textContent = 'Update'; // Change button text to Update
// }

// // Function to handle delete button click
// function handleDeleteButton(salesId) {
//   fetch('/deleteSalesDetail', {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       salesId: salesId,
//     }),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       fetchSalesDetails(); // Refresh table after delete
//     })
//     .catch(error => console.error('Error deleting sales detail:', error));
// }

// // Function to reset form inputs
// function resetForm() {
//   document.getElementById('salesForm').reset();
//   document.getElementById('salesId').value = ''; // Reset SalesID input

//   const actionButton = document.getElementById('actionButton');
//   actionButton.textContent = 'Add'; // Change button text back to Add
// }

// // Function to add a row to the sales details table
// function addRowToTable(item) {
//   const tableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
//   const row = tableBody.insertRow();

//   // Populate row cells with data
//   row.insertCell(0).textContent = item.SALESID;
//   row.insertCell(1).textContent = item.PRODUCTID;
//   row.insertCell(2).textContent = item.UNITPRICE;
//   row.insertCell(3).textContent = item.QTY;
//   row.insertCell(4).textContent = item.DISCOUNT;

//   // Add edit button to row
//   const editCell = row.insertCell(5);
//   const editButton = document.createElement('button');
//   editButton.textContent = 'Edit';
//   editButton.className = 'edit';
//   editButton.onclick = () => handleEditButton(item, row);
//   editCell.appendChild(editButton);

//   // Add delete button to row
//   const deleteCell = row.insertCell(6);
//   const deleteButton = document.createElement('button');
//   deleteButton.textContent = 'Delete';
//   deleteButton.className = 'delete';
//   deleteButton.onclick = () => handleDeleteButton(item.SALESID);
//   deleteCell.appendChild(deleteButton);
// }
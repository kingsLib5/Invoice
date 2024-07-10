document.addEventListener('DOMContentLoaded', () => {
  // Fetch existing sales details and populate the table
  fetch('/sales')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#salesTable tbody');
      data.forEach(item => {
        const row = document.createElement('tr');
        
        const salesIdCell = document.createElement('td');
        const productIdCell = document.createElement('td');
        const unitPriceCell = document.createElement('td');
        const qtyCell = document.createElement('td');
        const discountCell = document.createElement('td');
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        
        salesIdCell.textContent = item.SALESID;
        productIdCell.textContent = item.PRODUCTID;
        unitPriceCell.textContent = item.UNITPRICE;
        qtyCell.textContent = item.QTY;
        discountCell.textContent = item.DISCOUNT;
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-id', item.SALESID);
        deleteButton.addEventListener('click', handleDelete);
        
        deleteCell.appendChild(deleteButton);
        
        row.appendChild(salesIdCell);
        row.appendChild(productIdCell);
        row.appendChild(unitPriceCell);
        row.appendChild(qtyCell);
        row.appendChild(discountCell);
        row.appendChild(deleteCell);
        
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching sales details:', error);
    });

  // Handle form submission to add a new sale detail
  document.querySelector('#addSaleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const salesId = document.querySelector('#salesId').value;
    const productId = document.querySelector('#productId').value;
    const unitPrice = document.querySelector('#unitPrice').value;
    const qty = document.querySelector('#qty').value;
    const discount = document.querySelector('#discount').value;

    const newSaleDetail = {
      SALESID: salesId,
      PRODUCTID: productId,
      UNITPRICE: unitPrice,
      QTY: qty,
      DISCOUNT: discount
    };

    fetch('/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSaleDetail)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error adding sale detail:', data.message);
        return;
      }

      const row = document.createElement('tr');
      
      const salesIdCell = document.createElement('td');
      const productIdCell = document.createElement('td');
      const unitPriceCell = document.createElement('td');
      const qtyCell = document.createElement('td');
      const discountCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      
      salesIdCell.textContent = data.SALESID;
      productIdCell.textContent = data.PRODUCTID;
      unitPriceCell.textContent = data.UNITPRICE;
      qtyCell.textContent = data.QTY;
      discountCell.textContent = data.DISCOUNT;
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete-button');
      deleteButton.setAttribute('data-id', data.SALESID);
      deleteButton.addEventListener('click', handleDelete);
      
      deleteCell.appendChild(deleteButton);
      
      row.appendChild(salesIdCell);
      row.appendChild(productIdCell);
      row.appendChild(unitPriceCell);
      row.appendChild(qtyCell);
      row.appendChild(discountCell);
      row.appendChild(deleteCell);
      
      document.querySelector('#salesTable tbody').appendChild(row);
      
      document.querySelector('#addSaleForm').reset();
    })
    .catch(error => {
      console.error('Error adding sale detail:', error);
    });
  });

  // Handle delete button click
  function handleDelete(event) {
    const salesId = event.target.getAttribute('data-id');

    fetch(`/sales/${salesId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error deleting sale detail:', data.message);
        return;
      }

      event.target.closest('tr').remove();
    })
    .catch(error => {
      console.error('Error deleting sale detail:', error);
    });
  }
});
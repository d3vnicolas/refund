document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-refund');
  const amount = document.getElementById('amount');
  const category = document.getElementById('category');
  const expense = document.getElementById('expense');

  loadList();

  form.onsubmit = e => {
    e.preventDefault();
    renderItem(`./img/${category.value}.svg`, expense.value, amount.value);
    saveList();
  }

  amount.oninput = e => {
    let value = e.target.value.replace(/\D/g, '');
    value = Number(value / 100);
    
    e.target.value = formatCurrency(value);
  }
});

function formatCurrency(value, lang = 'pt-BR', currency = 'BRL') {
  return value.toLocaleString(lang, {
    style: "currency",
    currency: currency
  });
}

function removeItem(e) {
  e.parentNode.remove();
  saveList();
}

function renderItem(icon, title, value) {
  const node = document.createElement('li');
  const list = document.getElementById('list');
  node.classList.add('expense');

  let template = `
    <img class="expense-icon" src="${icon}" alt="Ícone de tipo da despesa" />
    <div class="expense-info">
      <strong class="expense-title">${title}</strong>
      <span>Alimentação</span>
    </div>
    <span class="expense-amount">${formatCurrency(value)}</span>
    <img onclick="removeItem(this)" src="./img/remove.svg" alt="remover" class="remove-icon" />
  `;
 
  node.innerHTML = template;
  list.appendChild(node);
}

function saveList() {
  const items = document.querySelectorAll('#list>li');
  const itemsObj = [];

  items.forEach(item => {
    itemsObj.push({
      title: item.querySelector('.expense-title').innerText,
      icon: item.querySelector('.expense-icon').getAttribute('src'),
      value: item.querySelector('.expense-amount').innerText
    });
  });

  localStorage.setItem('refund', JSON.stringify(itemsObj));
}

function loadList() {
  const localItems = localStorage.getItem('refund');
  const list = document.getElementById('list');
  
  list.innerHTML = '';
  JSON.parse(localItems).forEach(item => {
    renderItem(item.icon, item.title, item.value)
  });
}
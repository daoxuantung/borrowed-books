document.addEventListener('DOMContentLoaded', (event) => {
  var buttons = document.getElementsByClassName('addToCartBtn'); 

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {

      var localItems = JSON.parse(localStorage.getItem('cart'));

      var data = {
        imgUrl: e.target.parentElement.parentElement.children[0].getAttribute('src'),
        bookTitle:e.target.parentElement.children[0].textContent,
        amount: 1
      }

      var items = localItems || [];

      if (!items.length) {
        items.push(data);
        localStorage.setItem('cart', JSON.stringify(items));
        return;
      }

      var index = containsObject(data, items);

      if (index === false) {
        items.push(data);
      } else {
        items[index].amount += 1;
      }

      localStorage.setItem('cart', JSON.stringify(items));
    });
  }
});

function containsObject(obj, list) {
  for (var i = 0; i < list.length; i++) {
      if (list[i].bookTitle === obj.bookTitle) {
          return i;
      }
  }

  return false;
}

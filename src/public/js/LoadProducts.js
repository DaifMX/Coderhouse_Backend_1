export const getCard = (values) => {
  //Creamos un nuevo fragmento en nuestra pagina para ahi ir poniendo nuestros datos a ingresar
  const fragment = document.createElement("div");
  const title = document.createElement('p');
  const description = document.createElement('p');
  const code = document.createElement('p');
  const price = document.createElement('p');
  const status = document.createElement('p');
  const stock = document.createElement('p');
  const category = document.createElement('p');
  const spacing = document.createElement('br');
  //const image = document.createElement('img');

  title.innerHTML = values.title;
  description.innerHTML = values.description;
  code.innerHTML = values.code;
  price.innerHTML = values.price;
  status.innerHTML = values.status;
  stock.innerHTML = values.stock;
  category.innerHTML = values.category;
  //image.src = values.thumbnails[0].path;

  [title, description, code, price, status, stock, category, spacing].forEach((e) => {
    fragment.appendChild(e);

  });

  return fragment;
}


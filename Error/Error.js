class Error {
  render() {
    const html = `
        <div class="error__inner ">
            <p class="error__description">Кажется что-то пошло не так :(</p>
            <p class="error__description">Повторите попытку позже</p>
        </div>
        `;

    ROOT__ERROR.innerHTML = html;
  }
}

const error = new Error();

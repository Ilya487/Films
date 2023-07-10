class Preloader {
  render() {
    const html = `
        <div class="preloader__container">
            <img src="Preloader/img/Spinner-1s-300px.svg" alt="">
        </div>
        `;

    ROOT__PRELOADER.innerHTML = html;
  }

  clear() {
    ROOT__PRELOADER.innerHTML = "";
  }
}

const preloader = new Preloader();

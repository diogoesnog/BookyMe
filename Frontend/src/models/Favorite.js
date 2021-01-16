export default class Favorite {
  constructor(id) {
    // Com um ID do Mikado de forma estática para testar.
    this.favorite = id;
  }

  withObject(favorite) {
    this.favorite = favorite.favorite;
  }
}

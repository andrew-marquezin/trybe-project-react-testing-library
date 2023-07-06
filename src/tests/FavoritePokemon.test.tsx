import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente FavoritePokemon', () => {
  it('Teste se é exibida na tela a mensagem "no favorite pokemon found" caso a pessoa não tenha Pokémon favorito', () => {
    const screen = renderWithRouter(<FavoritePokemon />, { route: '/favorites' });

    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
  });

  it('Teste se ao favoritar um pokémon somente ele é mostrado na página de favoritos', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    await user.click(detailsLink);

    const favoriteChkBx = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    await user.click(favoriteChkBx);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await user.click(favoriteLink);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});

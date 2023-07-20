import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente Pokémon', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;
    const summaryText = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';

    await user.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(summaryText)).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;
    const { foundAt } = pokemonList[0];

    await user.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i })).toBeInTheDocument();

    const maps = screen.getAllByAltText(/Pikachu location/i);
    expect(maps[0]).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute('src', foundAt[0].map);

    const pokemonLocation = screen.getByText(foundAt[0].location);
    expect(pokemonLocation).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    await user.click(screen.getByRole('link', { name: /more details/i }));
    await user.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));

    const starImg = screen.getByAltText(/([a-z]*\s)*is marked as favorite/i);
    expect(starImg).toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    expect(starImg).not.toBeInTheDocument();
  });
});

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const screen = renderWithRouter(<App />, { route: '/' });

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Teste se ao clicar no link Home, a rota / é renderizada', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const homeLink = screen.getByRole('link', { name: 'Home' });
    await user.click(homeLink);

    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });

  it('Teste se ao clicar no link About, a rota /about é renderizada', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const aboutLink = screen.getByRole('link', { name: 'About' });
    await user.click(aboutLink);

    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('Teste se ao clicar no link Favorite Pokémon, a rota /favorites é renderizada', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await user.click(favoriteLink);

    expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();
  });

  it('Teste se ao entrar em uma rota inexistente, a rota not found é renderizada', () => {
    const screen = renderWithRouter(<App />, { route: '/inexistente' });

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

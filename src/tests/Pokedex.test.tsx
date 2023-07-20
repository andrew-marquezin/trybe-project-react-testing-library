import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    const screen = renderWithRouter(<App />, { route: '/' });

    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i }));
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;
    const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const pokeImg = screen.getByRole('img', { name: /([a-z]*\s)*sprite/i }).getAttribute('src');
    const index = pokemonList.findIndex((item) => item.image === pokeImg);

    await user.click(nextBtn);

    const nextImg = screen.getByRole('img', { name: /([a-z]*\s)*sprite/i });

    if (index + 1 === pokemonList.length) {
      expect(nextImg).toHaveAttribute('src', pokemonList[0].image);
    } else {
      expect(nextImg).toHaveAttribute('src', pokemonList[index + 1].image);
    }
  });
  it('Teste se os Pokémon são mostrados, somente um por vez', () => {
    const screen = renderWithRouter(<App />, { route: '/' });

    const pokeImg = screen.getAllByRole('img', { name: /([a-z]*\s)*sprite/i });

    expect(pokeImg).toHaveLength(1);
  });
  it('Teste se é mostrado o primeiro pokemon ao clicar no ultimo pokemon da lista', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;
    const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });

    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    await user.click(nextBtn);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    filterBtns.forEach((button, i) => {
      expect(button).toHaveTextContent(types[i]);
    });

    await user.click(filterBtns[6]);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    const allBtn = screen.getByRole('button', { name: /all/i });
    const filterBtns = screen.getAllByTestId('pokemon-type-button');

    await user.click(filterBtns[5]);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();

    await user.click(allBtn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});

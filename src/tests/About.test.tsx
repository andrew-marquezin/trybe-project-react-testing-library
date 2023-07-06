import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const screen = renderWithRouter(<About />, { route: '/about' });

    const firstParagraph = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const secondParagraph = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const screen = renderWithRouter(<About />, { route: '/about' });

    expect(screen.getByRole('heading', { name: /About Pokédex/i }));
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const screen = renderWithRouter(<About />, { route: '/about' });
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', imgSrc);
  });
});

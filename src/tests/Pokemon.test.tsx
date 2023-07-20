import { getByRole } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente Pokémon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const screen = renderWithRouter(<App />, { route: '/' });

    const screenName = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const sprite = screen.getByRole('img');

    const { averageWeight, name, image } = pokemonList[0];
    const { value, measurementUnit } = averageWeight;

    expect(screenName).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(sprite).toHaveAttribute('alt', `${name} sprite`);
    expect(sprite).toHaveAttribute('src', image);
  });

  it('Teste se o card do Pokémon contém um link de navegação para exibir detalhes desse Pokémon', () => {
    const screen = renderWithRouter(<App />, { route: '/' });

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const screen = renderWithRouter(<App />, { route: '/' });
    const { user } = screen;

    await user.click(screen.getByRole('link', { name: /more details/i }));
    await user.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));

    const starImg = screen.getByAltText(/([a-z]*\s)*is marked as favorite/i);
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});

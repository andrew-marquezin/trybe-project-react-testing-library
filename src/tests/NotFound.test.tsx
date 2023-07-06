import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const screen = renderWithRouter(<NotFound />, { route: '/inexistente' });

    const notFoundText = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    const screen = renderWithRouter(<NotFound />, { route: '/inexistente' });
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const notFoundImg = screen.getByRole('img');

    expect(notFoundImg).toHaveAttribute('src', imgSrc);
  });
});

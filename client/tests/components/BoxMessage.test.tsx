import { render, screen } from '@testing-library/react';
import { BoxMessage } from '../../src/components/boxMessage/BoxMessage';


describe("Pruebas en <BoxMessage />", () => {

    const message = 'Mensaje prueba';

    test("Debe hacer match con el snapshot", () => {
        const { container } = render(<BoxMessage message='Hola' />)
        expect(container).toMatchSnapshot();
    });
    test("Debe mostrar el mensaje enviado por props en una etiqueta <p>", () => {
        render(<BoxMessage message={ message } />)
        expect(screen.getByRole('paragraph').innerHTML).toContain(message);
    })
})
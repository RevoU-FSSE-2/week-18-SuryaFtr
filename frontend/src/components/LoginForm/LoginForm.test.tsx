import { waitFor, fireEvent, render, screen } from '@testing-library/react'
import LoginForm from '.';

describe('test login form', () => {
    const mockProps = jest.fn();

    test('Email form render correctly', async () => {
        render(<LoginForm onSubmit={mockProps} />)
        const title = screen.getByText('Email')
        const form = screen.getByPlaceholderText('Enter Your Email')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('Password form render correctly', async () => {
        render(<LoginForm onSubmit={mockProps} />)
        const title = screen.getByText('Password')
        const form = screen.getByPlaceholderText('Enter Your Password')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('Login button render correctly', async () => {
        render(<LoginForm onSubmit={mockProps} />)
        const title = screen.getByText('Login')
        expect(title).toBeDefined();
    })

    test('onSubmit works correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={mockProps} />);
        const emailInput = getByPlaceholderText('Enter Your Email') as HTMLInputElement;
        const passwordInput = getByPlaceholderText('Enter Your Password') as HTMLInputElement;
        const submitButton = getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'testemail123@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword123' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                email: 'testemail123@email.com',
                password: 'testpassword123',
            });
        });
    });
})
import { waitFor, fireEvent, render, screen } from '@testing-library/react'
import RegisterForm from '.';

describe('test register form', () => {
    const mockProps = jest.fn();

    test('Username form render correctly', async () => {
        render(<RegisterForm onSubmit={mockProps} />)
        const title = screen.getByText('Username')
        const form = screen.getByPlaceholderText('Enter Your Username')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('Email form render correctly', async () => {
        render(<RegisterForm onSubmit={mockProps} />)
        const title = screen.getByText('Email')
        const form = screen.getByPlaceholderText('Enter Your Email')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('Password form render correctly', async () => {
        render(<RegisterForm onSubmit={mockProps} />)
        const title = screen.getByText('Password')
        const form = screen.getByPlaceholderText('Enter Your Password')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('Submit button render correctly', async () => {
        render(<RegisterForm onSubmit={mockProps} />)
        const title = screen.getByText('Submit')
        expect(title).toBeDefined();
    })

    test('onSubmit works correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<RegisterForm onSubmit={mockProps} />);
        const usernameInput = getByPlaceholderText('Enter Your Username') as HTMLInputElement;
        const emailInput = getByPlaceholderText('Enter Your Email') as HTMLInputElement;
        const passwordInput = getByPlaceholderText('Enter Your Password') as HTMLInputElement;
        const submitButton = getByText('Submit');

        fireEvent.change(usernameInput, { target: { value: 'testname' } });
        fireEvent.change(emailInput, { target: { value: 'testemail123@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword123' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                username: 'testname',
                email: 'testemail123@email.com',
                password: 'testpassword123',
            });
        });
    });
})
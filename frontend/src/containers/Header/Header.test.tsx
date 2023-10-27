import { render, screen } from '@testing-library/react'
import Header from '.';

describe('test header container', () => {
    test('Header container render correctly', async () => {
        render(<Header />)
        const title = screen.getByText('To Do List App')
        expect(title).toBeDefined();
    })
})
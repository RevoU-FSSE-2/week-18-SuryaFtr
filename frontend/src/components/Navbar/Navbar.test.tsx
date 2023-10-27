import { waitFor, render, screen } from '@testing-library/react';
import Navbar from '.';
import { BrowserRouter } from 'react-router-dom';

describe('testing navbar', () => {
    test('Menu render correctly', async () => {
        render(<BrowserRouter><Navbar /></BrowserRouter>)
        const menus = ['Posting List', 'Logout'];

        await waitFor(() => {
            menus.map(async (menu) => {
                const title = screen.getByText(menu)
                expect(title).toBeDefined();

            })
        })
    })
})
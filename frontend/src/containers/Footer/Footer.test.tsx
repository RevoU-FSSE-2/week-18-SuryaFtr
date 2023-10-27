import { render, screen } from '@testing-library/react'
import Footer from '.';

describe('test footer container', () => {
    test('Footer container render correctly', async () => {
        render(<Footer />)
        const title = screen.getByText('Copyright © 2023, Developed By Surya Faturohman.')
        expect(title).toBeDefined();
    })
})
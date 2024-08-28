import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchFilter from './SearchFilter';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

describe('SearchFilter Component', () => {
    beforeEach(() => {
        jest.useFakeTimers(); 
    });

    afterEach(() => {
        jest.runOnlyPendingTimers(); 
        jest.useRealTimers();
    });

    test('renders correctly when data is fetched successfully', async () => {
        const mockData = ['Baisakh', 'Jestha', 'Ashad'];
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<SearchFilter />);

        expect(screen.getByPlaceholderText(/Search for a month.../i)).toBeInTheDocument();

        await waitFor(() => {
            mockData.forEach(item => {
                expect(screen.getByText(item)).toBeInTheDocument();
            });
        });
    });

    test('displays error message when the API call fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        render(<SearchFilter />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
        });
    });

    test('filters the list based on user input', async () => {
        const mockData = ['Baisakh', 'Jestha', 'Ashad'];
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<SearchFilter />);

        await waitFor(() => {
            mockData.forEach(item => {
                expect(screen.getByText(item)).toBeInTheDocument();
            });
        });

        userEvent.type(screen.getByPlaceholderText(/Search for a month.../i), 'Bai');
        jest.runAllTimers(); 

        await waitFor(() => {
            expect(screen.getByText('Baisakh')).toBeInTheDocument();
            expect(screen.queryByText('Jestha')).not.toBeInTheDocument();
            expect(screen.queryByText('Ashad')).not.toBeInTheDocument();
        });
    });
});

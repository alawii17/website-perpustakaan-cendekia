import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const FINEPAYMENTSTATUS = {
    PENDING: 'Tertunda',
    SUCCESS: 'Berhasil',
    FAILED: 'Gagal',
};

export function flashMessage(params) {
    return params.props.flash_message;
}

export const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatter.format(amount);
};

export const messages = {
    503: {
        title: 'Service Unavible',
        description: 'Sorry, we are doing maintenance. Please check back soon',
        status: '503',
    },
    500: {
        title: 'Server Error',
        description: 'Oops, Something went Wrong on our servers',
        status: '500',
    },
    404: {
        title: 'Not Found',
        description: 'Sorry, the page you are looking for could not be found',
        status: '404',
    },
    403: {
        title: 'Forbidden',
        description: 'Sorry, you are forbidden from accessing this page',
        status: '403',
    },
    401: {
        title: 'Unauthorized',
        description: 'Sorry, you are unauthorized to access this page',
        status: '401',
    },
    429: {
        title: 'To Many Request',
        description: 'Please try again in just a second',
        status: '429',
    },
};

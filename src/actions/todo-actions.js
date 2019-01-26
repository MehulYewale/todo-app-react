export const ADD = item => ({
    type: 'ADD',
    item: item
});

export const COMPLETE = (item) => {
    return {
        type: 'COMPLETE',
        item: item
    }
}

export const FILTER_ALL = () => ({
    type: 'ALL'
});

export const FILTER_ACTIVE = () => ({
    type: 'ACTIVE'
});

export const FILTER_COMPLETED = () => ({
    type: 'COMPLETED'
});
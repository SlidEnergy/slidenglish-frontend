import notify from 'devextreme/ui/notify';

const DISPLAY_TIME = 5000;

export function showError(message: string) {
    notify(message, 'error', DISPLAY_TIME);
}

export function showSuccess(message: string) {
    notify(message, 'success', DISPLAY_TIME);
}

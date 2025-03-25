// Fungsi untuk memformat tanggal
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fungsi generate unique ID
export function generateUniqueId() {
    return `notes-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Fungsi validasi input
export function validateNoteInput(title, body) {
    if (!title || title.trim() === '') {
        throw new Error('Judul catatan tidak boleh kosong');
    }

    if (!body || body.trim() === '') {
        throw new Error('Isi catatan tidak boleh kosong');
    }

    if (title.length > 50) {
        throw new Error('Judul catatan maksimal 50 karakter');
    }

    if (body.length > 500) {
        throw new Error('Isi catatan maksimal 500 karakter');
    }

    return true;
}
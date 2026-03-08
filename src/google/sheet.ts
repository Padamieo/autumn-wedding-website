'use server'

const sheet = process.env.GOOGLE_MUSIC_SHEET;

export type Submission = {
    name: string;
    artist: string;
    song: string;
};

export default async (submission: Submission ) => {
    let result = null;
    let error = null;

    if (!sheet) {
        return { result, error: 'No NEXT_PUBLIC_GOOGLE_MUSIC_SHEET setup' };
    }

    try {
        const res = await fetch(sheet, {
            method: "POST",
            body: JSON.stringify(submission),
        });
        const response = await res.json();

        if (response.status === "success") {
            return { result: response, error };
        } else {
            return { result, error: response };
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
};
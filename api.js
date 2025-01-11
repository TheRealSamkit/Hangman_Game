const apiKey = 'MsdGU/2fCdNC+r6rIExaHQ==NLsJaoXtMqa2dmXm';

// Function to fetch a random word
const fetchRandomWord = async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
            headers: { 'X-Api-Key': apiKey }
        });
        const { word: [randomWord] } = await response.json();
        return randomWord;
    } catch (error) {
        console.error('Error fetching random word:', error);
        throw error;
    }
};

// Function to fetch a hint from Wikipedia
const fetchWikipediaHint = async (word) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(word)}`);
        const data = await response.json();
        const hint = data.extract || "No hint found on Wikipedia for: " + word;
        return data.extract ? hint : null;
    } catch (error) {
        console.error('Error fetching Wikipedia hint:', error);
        throw error;
    }
};

// Main function to fetch the random word and hint
const fetchRandomWordAndHint = async () => {
    try {
        const randomWord = await fetchRandomWord();
        const hint = await fetchWikipediaHint(randomWord);
        return { randomWord, hint };
    } catch (error) {
        console.error('Error fetching random word and hint:', error);
        return null;
    }
};

// Exporting the functions
export { fetchRandomWord, fetchWikipediaHint, fetchRandomWordAndHint };

const apiKey = 'MsdGU/2fCdNC+r6rIExaHQ==NLsJaoXtMqa2dmXm';

// Function to fetch a random word
const fetchRandomWord = async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = await response.json();
        const randomWord = data.word[0];
        console.log("Random Word:", randomWord);
        return randomWord; // Return the random word
    } catch (error) {
        console.error('Error fetching random word:', error);
        throw error;
    }
};

// Function to fetch a hint from Wikipedia
const fetchWikipediaHint = async (word) => {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(word)}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.extract) {
            console.log("Hint:", data.extract);
            return data.extract; // Return the hint
        } else {
            console.log("No hint found on Wikipedia for:", word);
            return null; // Return null if no hint is found
        }
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

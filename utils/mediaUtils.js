async function fetchContent(path) {
    try {
        const response = await fetch(path, {
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'text/plain'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
}

const mediaUtils = {
    fetchContent
};

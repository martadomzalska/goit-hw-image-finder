//key for API
const key = '32145411-8f2f66f9688645c1a0ae56fcc';
//apiURL
const apiURL = `https://pixabay.com/api/?&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

export async function fetchImages(q, page) {
  try {
    const response = await fetch(apiURL + `&q=${q}&page=${page}`);
      const data = await response.json();
      return data
  } catch (error) {
    throw error;
  }
}

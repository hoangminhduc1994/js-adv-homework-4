let fetchDataWithRetry = async(url, maxRetries) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(`Request failed, retrying... (${retries + 1}/${maxRetries})`);
      retries++;
    }
  }
  throw new Error(`Failed to fetch data after ${maxRetries} retries.`);
}

// Sử dụng hàm fetchDataWithRetry
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const maxRetries = 3;

fetchDataWithRetry(apiUrl, maxRetries)
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  
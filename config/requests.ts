export interface PostRequest {
    url: string;
    body: object;
    headers?: object;
}

async function postRequest({ url, body, headers }: PostRequest) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}

export default postRequest;


export  function getRequest(url: string, headers?: object) {
    
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    }).then(response => response.json())
      .catch(error => {
          console.error('Error making GET request:', error);
          throw error;
      });
}
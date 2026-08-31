class PandaExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'panda',
      name: 'Panda',
      color1: '#ff6600', // Bright orange primary color
      color2: '#cc5200', // Darker shade for block borders
      blocks: [
        {
          opcode: 'fetchGet',
          blockType: Scratch.BlockType.REPORTER,
          text: 'GET URL [URL]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://ipify.org'
            }
          }
        },
        {
          opcode: 'fetchPost',
          blockType: Scratch.BlockType.REPORTER,
          text: 'POST URL [URL] with JSON data [DATA]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://httpbin.org'
            },
            DATA: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '{"key": "value"}'
            }
          }
        }
      ]
    };
  }

  fetchGet(args) {
    return fetch(args.URL)
      .then(response => {
        if (!response.ok) {
          return `Error: ${response.status}`;
        }
        return response.text();
      })
      .catch(error => {
        return `Connection Error: ${error.message}`;
      });
  }

  fetchPost(args) {
    let bodyData;
    try {
      // Validate and format if the input is a valid JSON string
      bodyData = JSON.stringify(JSON.parse(args.DATA));
    } catch (e) {
      // Fallback to raw string if it is not valid JSON
      bodyData = args.DATA;
    }

    return fetch(args.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyData
    })
      .then(response => {
        if (!response.ok) {
          return `Error: ${response.status}`;
        }
        return response.text();
      })
      .catch(error => {
        return `Connection Error: ${error.message}`;
      });
  }
}

Scratch.extensions.register(new PandaExtension());

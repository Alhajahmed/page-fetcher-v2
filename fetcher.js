const request = require("request");
const fs = require("fs");

const [url, path] = process.argv.slice(2);

// Check if file already exists at the specified path
if (fs.existsSync(path)) {
  console.log(
    `Error: File already exists at ${path}. Please provide a different path.`
  );
  return;
}

// Make a request to the specified URL
request(url, (error, response, body) => {
  // Handle request errors or unsuccessful status codes
  if (error || response.statusCode < 200 || response.statusCode > 299) {
    console.log(`Failed to fetch ${url}. Status code: ${response.statusCode}`);
    return;
  }

  // Write the response body to a file at the specified path
  fs.writeFile(path, body, (error) => {
    if (error) {
      console.log(`Error writing file to ${path}: ${error.message}`);
      return;
    }
    // Log the successful download and file size
    const fileSize = Buffer.byteLength(body);
    console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
  });
});

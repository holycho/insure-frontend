// import 'whatwg-fetch';
// import { server } from './src/mocks/server';
import * as $ from 'jquery'; // Use import * as $ for proper module import

// beforeAll(() => server.listen()); // Start the server before all tests
// afterEach(() => server.resetHandlers()); // Reset handlers after each test
// afterAll(() => server.close()); // Close the server after all tests

// Expose jQuery globally for Jest tests
declare let window: any;
declare let global: any;

window.$ = window.jQuery = $;
global.$ = global.jQuery = $;
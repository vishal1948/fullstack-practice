/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/






// import { input } from '@inquirer/prompts';

// const answer = await input({ message: 'Enter your website.' });

// console.log(answer);



// Works even if the package internally uses require/module.exports
// import QRCode from 'qr-image';

// var qr_png = qr.image('www.google.com', { type: 'png' });
// qr_png.pipe(require('fs').createWriteStream('www.google.com.png'));

// var png_string = qr.imageSync('www.google.com', { type: 'png' });

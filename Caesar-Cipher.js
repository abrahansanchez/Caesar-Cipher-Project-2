const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Helper function to shift a character by shiftValue
function shiftCharacter(char, shiftValue) {
  const isUpperCase = char === char.toUpperCase();
  const normalizedChar = char.toLowerCase();
  
  // Find the index of the character in the alphabet
  const index = alphabet.indexOf(normalizedChar);
  
  // If character is not in the alphabet, return it as is
  if (index === -1) return char;
  
  // Compute new index with shiftValue (use modulo to wrap around)
  const newIndex = (index + shiftValue) % alphabet.length;
  const shiftedChar = alphabet[newIndex < 0 ? newIndex + alphabet.length : newIndex];
  
  // Preserve original case
  return isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
}

function encrypt(message, shiftValue) {
  let encryptedMessage = "";
  let count = 0;

  for (let i = 0; i < message.length; i++) {
    const shiftedChar = shiftCharacter(message[i], shiftValue);
    encryptedMessage += shiftedChar;
    count++;

    // After every two characters, add a random character
    if (count % 2 === 0 && i < message.length - 1) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      encryptedMessage += randomChar;
    }
  }

  return encryptedMessage;
}

function decrypt(encryptedMessage, shiftValue) {
  let decryptedMessage = "";
  let count = 0;

  for (let i = 0; i < encryptedMessage.length; i++) {
    count++;
    
    // Skip every third character (the random one)
    if (count % 3 === 0) {
      continue;
    }

    // Shift character back to decode
    decryptedMessage += shiftCharacter(encryptedMessage[i], -shiftValue);
  }

  return decryptedMessage;
}

const encrypted = encrypt("Hello Brutus, meet me at the high gardens.", 42);
console.log("Encrypted Message:", encrypted);

// Decrypt the provided secret message
const decrypted = decrypt(
  "Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.",
  42
);


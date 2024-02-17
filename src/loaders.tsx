import { Contact } from './routes/root';

export async function rootLoader() {
  const response = await fetch(
    'https://yonivas0.editorx.io/kavimledmutam/_functions/getData'
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // If you expect JSON response, use response.json()
  // If you expect other response types, adjust accordingly
  const data = await response.json();
  return data.message;
}
export async function allFallenLoader() {
  const response = await fetch(
    'https://yonivas0.editorx.io/kavimledmutam/_functions/getData'
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // If you expect JSON response, use response.json()
  // If you expect other response types, adjust accordingly
  const data = await response.json();
  return data.message[0] || false;
}
//@ts-expect-error router issues
export async function fallenContactLoader({ params }) {
  const response = await fetch(
    'https://yonivas0.editorx.io/kavimledmutam/_functions/getData'
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // If you expect JSON response, use response.json()
  // If you expect other response types, adjust accordingly
  const data = await response.json();
  console.log(params.contactId);

  return (
    data.message[0].find((f: Contact) => f._id === params.contactId) || false
  );
}
export async function getCommentsByFallenId(fallenId: string) {
  try {
    const response = await fetch(
      `https://yonivas0.editorx.io/kavimledmutam/_functions/getComments/${fallenId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If you expect JSON response, use response.json()
    // If you expect other response types, adjust accordingly
    const data = await response.json();
    console.log(data.message);

    return data.message;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error; // Re-throw the error if needed
  }
}

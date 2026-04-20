import { defer } from 'react-router-dom';

export async function rootLoader() {
  const response = await fetch(
    'https://yonivas0.editorx.io/kavimledmutam/_functions/getLandingPageData'
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // If you expect JSON response, use response.json()
  // If you expect other response types, adjust accordingly
  const data = await response.json();
  console.log('loaderData', data);

  return defer({ wixData: data.message });
}
export async function allFallenLoader() {
  try {
    const response = await fetch(
      `https://yonivas0.editorx.io/kavimledmutam/_functions/getAllFallenData`
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
export async function ourActivityLoader() {
  try {
    const response = await fetch(
      `https://yonivas0.editorx.io/kavimledmutam/_functions/getOurActivityPageData`
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
//@ts-expect-error because
export async function fallenContactLoader({ params }) {
  try {
    const response = await fetch(
      `https://yonivas0.editorx.io/kavimledmutam/_functions/getFallenData/${params.contactId}`
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
export type Comment = {
  fName: string;
  lName: string;
  phone: string;
  _createdDate: string;
  comment: string;
  isPinned: boolean;
};

export async function getCommentsByFallenId(
  fallenId: string
): Promise<Comment[]> {
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

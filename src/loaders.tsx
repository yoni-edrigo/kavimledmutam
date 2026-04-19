import { defer, LoaderFunctionArgs } from 'react-router-dom';
import { API_BASE } from './config';
import { Contact, Comment, ActivitiesData, WixData } from './types';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
  const data = await res.json();
  return data.message as T;
}

export async function rootLoader() {
  const data = await apiFetch<WixData>('getLandingPageData');
  return defer({ wixData: data });
}

export async function allFallenLoader(): Promise<Contact[]> {
  return apiFetch<Contact[]>('getAllFallenData');
}

export async function ourActivityLoader(): Promise<ActivitiesData> {
  return apiFetch<ActivitiesData>('getOurActivityPageData');
}

export async function fallenContactLoader({
  params,
}: LoaderFunctionArgs): Promise<{ fallen: Contact; comments: Comment[] }> {
  const [fallen, comments] = await Promise.all([
    apiFetch<Contact>(`getFallenData/${params.contactId}`),
    apiFetch<Comment[]>(`getComments/${params.contactId}`).catch(() => [] as Comment[]),
  ]);
  return { fallen, comments };
}

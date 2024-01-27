import { useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { getMetaTags } from '../utils';

export default function FallenPage() {
  //@ts-expect-error wixdata isnt known
  const fallenData: Contact = useLoaderData();
  console.log(fallenData);

  return (
    <div>
      {fallenData && getMetaTags(fallenData)}
      {fallenData.name || 'not found'}
    </div>
  );
}

import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/landingPage');

    return null;
}
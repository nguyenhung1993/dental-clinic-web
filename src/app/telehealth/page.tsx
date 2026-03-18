import { redirect } from 'next/navigation';

export default function TelehealthPage() {
    // Redirect to appointments as a fallback
    redirect('/appointments');
}

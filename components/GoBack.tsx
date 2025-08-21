"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
    const router = useRouter();
    return (
        <button onClick={() => router.back()} className="text-neutral-text hover:text-text mb-4 inline-flex cursor-pointer items-center gap-2 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
        </button>
    );
};

export default GoBack;

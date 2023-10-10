'use client'
import DeletePopup from "@components/DeletePopup";
import { useSearchParams } from "next/navigation";

const DeletePrompt = () => { 
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

  return <DeletePopup promptId={promptId}/>;
};

export default DeletePrompt;

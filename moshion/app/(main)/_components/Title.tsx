"use client"
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api"

import { Doc } from "@/convex/_generated/dataModel";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface TitleProps {
    initialData: Doc<"documents">;
}

export const Title = ({
    initialData
}: TitleProps) => {


    const inputRef = useRef<HTMLInputElement>(null);
    const update = useMutation(api.documents.update);

    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditting, setisEditting] = useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
        setisEditting(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    }

    const disableInput = () => {
        setisEditting(false);
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) =>{
        setTitle(event.target.value);
        update({
            id: initialData._id,
            title: event.target.value || "Untitled"
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            disableInput();
        }
    }
    return(
        <div className="flex items=center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditting ? (
                <Input
                    className="h-7 px-2 focus-visible:ring-transparent"
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                />

            ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="font-normal h-auto p-1"
                        onClick={enableInput}
                    >
                        <span className="truncate">
                            {initialData?.title}
                        </span>
                    </Button>
            )}
        </div>
    )
}

Title.Skeleton = function TitleSkeletion() {
    return (
        <Skeleton className="h-9 w-1 rounded-md"/>
    )
}